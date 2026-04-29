# Crop Health Detection System

A full-stack MERN application integrated with Azure Custom Vision to analyze and detect crop health and diseases.

## Project Overview

This system allows users to upload images of plants, which are then analyzed by a trained machine learning model (Azure Custom Vision) to classify the plant type and identify any potential diseases. The application features a real-time analytics dashboard and securely stores prediction history.

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Database:** Azure Cosmos DB (MongoDB API)
- **AI/ML:** Azure Custom Vision API
- **Storage:** Azure Blob Storage (for storing history images)
- **Hosting:** Azure Virtual Machines (VM)
- **Containerization:** Docker & Docker Compose

## Repository Structure

- `/frontend` - The React application
- `/backend` - The Node.js/Express server
- `/ready_to_upload` - Dataset directories for training
- `download_dataset.py`, `download_more.py` - Scripts to fetch plant disease datasets
- `test_model.py` - Script for testing the Custom Vision API locally
- `docker-compose.yml` - Docker compose configuration for running the full stack

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker and Docker Compose
- Azure Cosmos DB (MongoDB API) account / connection string
- Python 3.x (for running dataset/model testing scripts)
- Azure Custom Vision Account & API Keys
- Azure Blob Storage Account

### Environment Variables

Copy the `.env.example` to `.env` in the root and fill in the required values. You may also need to configure any specific `.env` files located inside `/frontend` and `/backend`.

### Running Locally (Without Docker)

1. **Install Dependencies for all workspaces:**
   From the root directory, run:
   ```bash
   npm run install:all
   ```

2. **Run both Backend and Frontend concurrently:**
   ```bash
   npm start
   ```
   Or use `npm run dev`.

### Running with Docker (Recommended)

To containerize and run the entire application using Docker Compose:

```bash
docker-compose up --build
```

This will spin up the frontend and backend containers automatically with their respective environments.

## Model Training & Testing

The Python scripts in the root directory can be used to manage datasets and test the Custom Vision model:
- `python download_dataset.py` - Downloads required datasets from sources (e.g., Hugging Face) for training.
- `python download_more.py` - Supplementary script to download additional image data.
- `python test_model.py` - Tests the Custom Vision model endpoints locally to verify accuracy and response before frontend integration.
