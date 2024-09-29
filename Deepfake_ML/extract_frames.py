import cv2
import os

# Directories for real and fake videos
real_video_dir = "dataset/train/real"
fake_video_dir = "dataset/train/fake"

# Output directories for the extracted frames
real_frame_dir = "dataset/frames/real"
fake_frame_dir = "dataset/frames/fake"

# Create directories if they don't exist
os.makedirs(real_frame_dir, exist_ok=True)
os.makedirs(fake_frame_dir, exist_ok=True)


# Function to extract frames from a video
def extract_frames(video_path, output_dir, interval=10):
    # Open the video
    cap = cv2.VideoCapture(video_path)
    count = 0
    frame_id = 0

    # Extract frames
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Save frames at the specified interval
        if count % interval == 0:
            video_name = os.path.splitext(os.path.basename(video_path))[0]
            frame_filename = os.path.join(output_dir, f"{video_name}_frame_{frame_id}.jpg")
            cv2.imwrite(frame_filename, frame)
            frame_id += 1

        count += 1

    cap.release()


# Extract frames from all real videos
for video_file in os.listdir(real_video_dir):
    video_path = os.path.join(real_video_dir, video_file)
    if video_file.endswith(('.mp4', '.avi', '.mov')):  # Filter for video files
        extract_frames(video_path, real_frame_dir)

# Extract frames from all fake videos
for video_file in os.listdir(fake_video_dir):
    video_path = os.path.join(fake_video_dir, video_file)
    if video_file.endswith(('.mp4', '.avi', '.mov')):  # Filter for video files
        extract_frames(video_path, fake_frame_dir)
