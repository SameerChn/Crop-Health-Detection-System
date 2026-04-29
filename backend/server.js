const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');
const { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } = require('@azure/storage-blob');
require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Load from root .env

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up Multer for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MongoDB / Cosmos DB for MongoDB Setup
// Using the endpoint from .env
const mongoURI = process.env.COSMOS_ENDPOINT || process.env.MONGO_URI;

let PredictionModel;

async function initDB() {
    if (mongoURI) {
        try {
            let finalURI = mongoURI;
            // Fix unescaped @ in password
            const match = finalURI.match(/^(mongodb(?:\+srv)?:\/\/[^:]+:)(.*)(@[^@/]+(?:\/.*)?)$/);
            if (match) {
                const password = match[2];
                if (password.includes('@')) {
                    finalURI = match[1] + encodeURIComponent(password) + match[3];
                    console.log("Auto-encoded special characters in MongoDB password.");
                }
            }

            await mongoose.connect(finalURI);
            console.log("MongoDB (Cosmos DB) initialized successfully.");
            
            const predictionSchema = new mongoose.Schema({
                timestamp: String,
                filename: String,
                topPrediction: String,
                probability: Number,
                plantType: String,
                allPredictions: Array,
                imageUrl: String
            });

            PredictionModel = mongoose.model('Prediction', predictionSchema);
        } catch (error) {
            console.error("Error initializing MongoDB:", error.message);
        }
    } else {
        console.log("MongoDB credentials not found. Set COSMOS_ENDPOINT in .env to enable database logging.");
    }
}

// Call init for DB
initDB();

// Blob Storage Helper
async function uploadToBlobStorage(buffer, originalName) {
    let blobConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!blobConnectionString && process.env.DefaultEndpointsProtocol) {
        const raw = process.env.DefaultEndpointsProtocol;
        blobConnectionString = raw.startsWith('DefaultEndpointsProtocol=')
            ? raw
            : `DefaultEndpointsProtocol=${raw}`;
    }

    if (!blobConnectionString) {
        throw new Error('Azure Blob Storage connection string missing.');
    }

    // Parse account name and key from connection string for SAS generation
    const accountNameMatch = blobConnectionString.match(/AccountName=([^;]+)/);
    const accountKeyMatch  = blobConnectionString.match(/AccountKey=([^;]+)/);
    if (!accountNameMatch || !accountKeyMatch) {
        throw new Error('Could not parse AccountName/AccountKey from connection string.');
    }
    const accountName = accountNameMatch[1];
    const accountKey  = accountKeyMatch[1];

    console.log('Connecting to Blob Storage...');
    const blobServiceClient = BlobServiceClient.fromConnectionString(blobConnectionString);
    const containerName = 'images';
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create container WITHOUT public access (respects storage account policy)
    await containerClient.createIfNotExists();

    const blobName = `${Date.now()}-${originalName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(buffer);

    // Generate a SAS URL valid for 1 year so images stay viewable
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
    const expiresOn = new Date();
    expiresOn.setFullYear(expiresOn.getFullYear() + 1);

    const sasToken = generateBlobSASQueryParameters({
        containerName,
        blobName,
        permissions: BlobSASPermissions.parse('r'), // read-only
        expiresOn,
    }, sharedKeyCredential).toString();

    const sasUrl = `${blockBlobClient.url}?${sasToken}`;
    console.log('Uploaded to Blob (SAS URL generated).');
    return sasUrl;
}

app.get('/', (req, res) => {
    res.send('Crop Health Detection Backend is running.');
});

// Endpoint to predict image from file upload
app.post('/api/predict', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image file provided. Make sure to send it as 'image' form-data." });
        }

        const predictionKey = process.env.PREDICTION_KEY;
        const imageEndpoint = process.env.IMAGE_ENDPOINT;

        if (!predictionKey || !imageEndpoint) {
            return res.status(500).json({ error: "Server configuration missing Azure Custom Vision keys." });
        }

        console.log("Sending image to Azure Custom Vision API...");

        // Send binary data (buffer) to Azure Custom Vision
        const response = await axios.post(imageEndpoint, req.file.buffer, {
            headers: {
                'Prediction-Key': predictionKey,
                'Content-Type': 'application/octet-stream'
            }
        });

        const predictions = response.data.predictions;

        // Upload to Blob Storage
        let uploadedImageUrl = null;
        try {
            console.log("Uploading to Blob Storage...");
            uploadedImageUrl = await uploadToBlobStorage(req.file.buffer, req.file.originalname);
            console.log("Uploaded to Blob:", uploadedImageUrl);
        } catch (blobErr) {
            console.error("Failed to upload to blob storage:", blobErr.message);
        }

        let savedDoc = null;
        // Optionally, save the prediction results to DB
        if (PredictionModel) {
            try {
                // Find top prediction
                const topPrediction = [...predictions].sort((a, b) => b.probability - a.probability)[0];
                
                const newPred = new PredictionModel({
                    timestamp: new Date().toISOString(),
                    filename: req.file.originalname,
                    topPrediction: topPrediction ? topPrediction.tagName : "Unknown",
                    probability: topPrediction ? topPrediction.probability : 0,
                    plantType: topPrediction ? topPrediction.tagName.split('_')[0] : "Unknown",
                    allPredictions: predictions,
                    imageUrl: uploadedImageUrl
                });
                savedDoc = await newPred.save();
                console.log("Prediction logged to MongoDB.");
            } catch (dbError) {
                console.error("Failed to log to MongoDB:", dbError.message);
            }
        }

        // Return the prediction plus the blob URL and the ID of the saved document
        res.json({
            ...response.data,
            imageUrl: uploadedImageUrl,
            dbId: savedDoc ? savedDoc._id : null
        });
    } catch (error) {
        console.error("Error communicating with Custom Vision:", error.message);
        res.status(500).json({ error: "An error occurred while making the prediction.", details: error.response?.data || error.message });
    }
});

// Endpoint to fetch history from MongoDB
app.get('/api/history', async (req, res) => {
    try {
        if (!PredictionModel) {
            return res.status(500).json({ error: "Database not initialized" });
        }
        const history = await PredictionModel.find().sort({ timestamp: -1 }).limit(50);
        res.json(history);
    } catch (error) {
        console.error("Error fetching history:", error.message);
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

// Endpoint to predict from an image URL
app.post('/api/predict-url', async (req, res) => {
    try {
        const { imageUrl } = req.body;
        
        if (!imageUrl) {
            return res.status(400).json({ error: "No imageUrl provided." });
        }

        const predictionKey = process.env.PREDICTION_KEY;
        const urlEndpoint = process.env.URL_ENDPOINT;

        if (!predictionKey || !urlEndpoint) {
            return res.status(500).json({ error: "Server configuration missing Azure Custom Vision keys." });
        }

        console.log("Sending URL request to Azure Custom Vision API...");

        const response = await axios.post(urlEndpoint, { Url: imageUrl }, {
            headers: {
                'Prediction-Key': predictionKey,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error communicating with Custom Vision:", error.message);
        res.status(500).json({ error: "An error occurred while making the prediction.", details: error.response?.data || error.message });
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
