import os
import requests
import sys
import io

# Fix Windows console encoding for emojis
if sys.stdout.encoding != "utf-8":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

def download_more_plants():
    print("🚀 Downloading additional plant images...")
    
    # GitHub repo details
    repo_owner = "spMohanty"
    repo_name = "PlantVillage-Dataset"
    base_path = "raw/color"
    
    plants = {
        "Potato_Healthy": "Potato___healthy",
        "Potato_EarlyBlight": "Potato___Early_blight",
        "Potato_LateBlight": "Potato___Late_blight",
        "Pepper_Healthy": "Pepper,_bell___healthy",
        "Pepper_BacterialSpot": "Pepper,_bell___Bacterial_spot"
    }
    
    session = requests.Session()
    
    for tag, folder in plants.items():
        print(f"\n📥 Downloading {tag}...")
        
        # Determine main category folder
        plant_type = tag.split('_')[0] # 'Potato' or 'Pepper'
        
        dir_path = f"ready_to_upload/{plant_type}/{tag}"
        os.makedirs(dir_path, exist_ok=True)
        
        # Check if already downloaded
        existing = len([f for f in os.listdir(dir_path) if f.lower().endswith('.jpg')])
        target_count = 20
        if existing >= target_count:
            print(f"  ✅ Already have {existing} images for {tag}, skipping...")
            continue
            
        downloaded = existing
        api_url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/contents/{base_path}/{folder}"
        
        try:
            response = session.get(api_url, timeout=15)
            if response.status_code == 200:
                files = response.json()
                image_files = [f for f in files if f['name'].upper().endswith('.JPG')]
                
                for file_info in image_files:
                    if downloaded >= target_count:
                        break
                        
                    img_url = file_info['download_url']
                    img_response = session.get(img_url, timeout=15)
                    
                    if img_response.status_code == 200:
                        downloaded += 1
                        filename = f"{dir_path}/{tag}_{downloaded:02d}.jpg"
                        with open(filename, "wb") as f:
                            f.write(img_response.content)
                        print(f"  ✅ Downloaded {downloaded}/{target_count} for {tag}", end="\r")
            elif response.status_code == 403:
                print(f"  ⚠️  GitHub API rate limit hit. Try again later.")
                return False
        except Exception as e:
            print(f"  ⚠️  Error fetching from {folder}: {e}")
            
        print()
        if downloaded < target_count:
            print(f"  ⚠️  Could only find {downloaded} images for {tag}")

    print("\n" + "="*50)
    print("🎉 ADDITIONAL IMAGES SUCCESSFULLY DOWNLOADED!")
    print("="*50)
    return True

if __name__ == "__main__":
    download_more_plants()
