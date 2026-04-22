import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- Configuration ---
# Keys are now loaded from the .env file
PREDICTION_KEY = os.getenv("PREDICTION_KEY")

# The endpoints for testing
IMAGE_ENDPOINT = os.getenv("IMAGE_ENDPOINT")
URL_ENDPOINT = os.getenv("URL_ENDPOINT")

# We'll test with an image we downloaded earlier
TEST_IMAGE_PATH = r"c:\Users\SAM\OneDrive\Documents\Study\Projects\Crop Health Detection System\ready_to_upload\Potato\Potato_Healthy\Potato_Healthy_01.jpg"

def test_with_local_file(image_path):
    print(f"Testing model with local image: {image_path}")
    
    if not PREDICTION_KEY:
        print("\n[STOP]: You need to set the PREDICTION_KEY in the .env file!")
        print("Go to the Custom Vision portal -> Performance tab -> Prediction URL to find your Prediction-Key.\n")
        return

    if not IMAGE_ENDPOINT:
        print("\n[STOP]: You need to set the IMAGE_ENDPOINT in the .env file!")
        return

    if not os.path.exists(image_path):
        print(f"\n[Error]: The file {image_path} doesn't exist.")
        return

    # Headers for an image file request
    headers = {
        'Prediction-Key': PREDICTION_KEY,
        'Content-Type': 'application/octet-stream'
    }

    try:
        # Read the image file as binary data
        with open(image_path, 'rb') as image_data:
            print("Sending request to Azure Custom Vision API...")
            response = requests.post(IMAGE_ENDPOINT, headers=headers, data=image_data)
            
            # Print any errors if they occurred
            if not response.ok:
                print(f"\n[API Error] ({response.status_code}):\n{response.text}")
                return
                
            results = response.json()
            predictions = results.get("predictions", [])

            print("\n----- Prediction Results -----")
            # Sort the predictions so the most confident ones are at the top
            predictions.sort(key=lambda x: x['probability'], reverse=True)
            
            for pred in predictions:
                tag = pred['tagName']
                prob = pred['probability'] * 100
                print(f"{tag:<15} : {prob:>6.2f}%")
            print("--------------------------------\n")

    except Exception as e:
        print(f"\n[Error] An error occurred: {e}")


def test_with_url(image_url):
    print(f"Testing model with image URL: {image_url}")
    
    if not PREDICTION_KEY:
        print("\n[STOP]: You need to set the PREDICTION_KEY in the .env file!")
        return

    if not URL_ENDPOINT:
        print("\n[STOP]: You need to set the URL_ENDPOINT in the .env file!")
        return

    # Headers for a URL request
    headers = {
        'Prediction-Key': PREDICTION_KEY,
        'Content-Type': 'application/json'
    }
    
    body = {
        "Url": image_url
    }

    try:
        print("Sending request to Azure Custom Vision API...")
        response = requests.post(URL_ENDPOINT, headers=headers, json=body)
        
        if not response.ok:
            print(f"\n[API Error] ({response.status_code}):\n{response.text}")
            return
            
        results = response.json()
        predictions = results.get("predictions", [])

        print("\n----- Prediction Results -----")
        predictions.sort(key=lambda x: x['probability'], reverse=True)
        
        for pred in predictions:
            tag = pred['tagName']
            prob = pred['probability'] * 100
            print(f"{tag:<15} : {prob:>6.2f}%")
        print("--------------------------------\n")

    except Exception as e:
        print(f"\n[Error] An error occurred: {e}")


if __name__ == "__main__":
    # Test 1: Using a local file
    test_with_local_file(TEST_IMAGE_PATH)
    
    # Test 2: Using an image URL (Uncomment to test)
    # test_url = "https://example.com/some_plant_image.jpg"
    # test_with_url(test_url)
