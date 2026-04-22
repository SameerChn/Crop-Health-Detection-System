# download_dataset.py

import os
import requests
import sys
import io

# Fix Windows console encoding for emojis
if sys.stdout.encoding != "utf-8":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

REQUIRED_TAGS = ["Healthy", "Early_Blight", "Late_Blight", "Powdery_Mildew", "Rust"]

def download_real_images():
    """Fetch REAL high-quality images from the PlantVillage dataset on GitHub"""
    
    print("🚀 Downloading high-quality real plant images...")
    
    # GitHub repo details
    repo_owner = "spMohanty"
    repo_name = "PlantVillage-Dataset"
    base_path = "raw/color"
    
    # Mapped exactly to the actual folder names in the repository
    categories = {
        "Healthy": ["Tomato___healthy", "Potato___healthy"],
        "Early_Blight": ["Tomato___Early_blight"],
        "Late_Blight": ["Tomato___Late_blight"],
        "Powdery_Mildew": ["Cherry_(including_sour)___Powdery_mildew", "Squash___Powdery_mildew"],
        "Rust": ["Apple___Cedar_apple_rust", "Corn_(maize)___Common_rust_"]
    }
    
    session = requests.Session()
    
    for tag in REQUIRED_TAGS:
        folders = categories[tag]
        print(f"\n📥 Downloading {tag}...")
        os.makedirs(f"ready_to_upload/{tag}", exist_ok=True)
        
        # Check if already downloaded
        existing = len([f for f in os.listdir(f"ready_to_upload/{tag}") if f.endswith('.jpg')])
        if existing >= 20:
            print(f"  ✅ Already have {existing} images for {tag}, skipping...")
            continue
            
        downloaded = existing
        
        for folder in folders:
            if downloaded >= 20:
                break
                
            api_url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/contents/{base_path}/{folder}"
            
            try:
                # Use GitHub API to list files in the directory
                response = session.get(api_url, timeout=15)
                
                if response.status_code == 200:
                    files = response.json()
                    
                    # Filter only JPG files
                    image_files = [f for f in files if f['name'].upper().endswith('.JPG')]
                    
                    for file_info in image_files:
                        if downloaded >= 20:
                            break
                            
                        # Download raw file (does not consume API rate limit)
                        img_url = file_info['download_url']
                        img_response = session.get(img_url, timeout=15)
                        
                        if img_response.status_code == 200:
                            downloaded += 1
                            filename = f"ready_to_upload/{tag}/{tag}_{downloaded:02d}.jpg"
                            with open(filename, "wb") as f:
                                f.write(img_response.content)
                            print(f"  ✅ Downloaded {downloaded}/20 for {tag}", end="\r")
                            
                elif response.status_code == 403:
                    print(f"  ⚠️  GitHub API rate limit hit. Try again later.")
                    return False
                        
            except Exception as e:
                print(f"  ⚠️  Error fetching from {folder}: {e}")
                
        print() 
        if downloaded < 20:
            print(f"  ⚠️  Could only find {downloaded} images for {tag}")

    print("\n" + "="*50)
    print("🎉 REAL IMAGES SUCCESSFULLY DOWNLOADED!")
    print("="*50)
    return True

if __name__ == "__main__":
    download_real_images()