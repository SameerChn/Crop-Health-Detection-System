const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const { CosmosClient } = require('@azure/cosmos');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Load from root .env

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up Multer for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Azure Cosmos DB Setup Placeholder
// You can grab these values once you finish logging in to Azure CosmosDB
const cosmosEndpoint = process.env.COSMOS_ENDPOINT;
const cosmosKey = process.env.COSMOS_KEY;

let cosmosContainer;

async function initCosmos() {
    if (cosmosEndpoint && cosmosKey) {
        try {
            const client = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
            
            // Create Database if not exists
            const { database } = await client.databases.createIfNotExists({ id: "CropHealthDB" });
            
            // Create Container if not exists
            const { container } = await database.containers.createIfNotExists({ 
                id: "Predictions",
                partitionKey: { paths: ["/plantType"] }
            });
            
            cosmosContainer = container;
            console.log("Cosmos DB initialized successfully.");
        } catch (error) {
            console.error("Error initializing Cosmos DB:", error.message);
        }
    } else {
        console.log("Cosmos DB credentials not found. Set COSMOS_ENDPOINT and COSMOS_KEY in .env to enable database logging.");
    }
}

// Call init for Cosmos DB
initCosmos();

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

        // Optionally, save the prediction results to Cosmos DB
        if (cosmosContainer) {
            try {
                // Find top prediction
                const topPrediction = [...predictions].sort((a, b) => b.probability - a.probability)[0];
                
                await cosmosContainer.items.create({
                    timestamp: new Date().toISOString(),
                    filename: req.file.originalname,
                    topPrediction: topPrediction ? topPrediction.tagName : "Unknown",
                    probability: topPrediction ? topPrediction.probability : 0,
                    plantType: topPrediction ? topPrediction.tagName.split('_')[0] : "Unknown",
                    allPredictions: predictions
                });
                console.log("Prediction logged to Cosmos DB.");
            } catch (dbError) {
                console.error("Failed to log to Cosmos DB:", dbError.message);
            }
        }

        res.json(response.data);
    } catch (error) {
        console.error("Error communicating with Custom Vision:", error.message);
        res.status(500).json({ error: "An error occurred while making the prediction.", details: error.response?.data || error.message });
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
