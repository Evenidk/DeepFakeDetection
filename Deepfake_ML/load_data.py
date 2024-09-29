import os
import shutil
import cv2
import pandas as pd  # Import Pandas
# Load the dataset
csv_path = 'metadata.csv/metadata.csv'
df = pd.read_csv(csv_path)

# Directory where the videos are stored
video_directory = "sample_videos"

# Output directories for real and fake videos
real_dir = "dataset/train/real"
fake_dir = "dataset/train/fake"

# Create directories if they don't exist
os.makedirs(real_dir, exist_ok=True)
os.makedirs(fake_dir, exist_ok=True)


# Function to copy and categorize videos
def organize_videos(row):
    video_file = row['filename']
    label = row['label']

    # Define the path to the video
    video_path = os.path.join(video_directory, video_file)

    # Check if the video file exists
    if os.path.exists(video_path):
        if label == 'REAL':
            shutil.copy(video_path, real_dir)
        elif label == 'FAKE':
            shutil.copy(video_path, fake_dir)


# Apply the function to organize videos into real/fake directories
df.apply(organize_videos, axis=1)
