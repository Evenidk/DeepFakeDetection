from flask import Flask, request, render_template, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from keras.preprocessing.image import img_to_array
import numpy as np
import os
import cv2
from flask_cors import CORS  # Import CORS to enable communication between frontend and backend

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS to allow cross-origin requests from the frontend
CORS(app)

# Load the trained deepfake detection model
model = load_model('deepfake_detection_model.h5')

# Define the route for the homepage
@app.route('/')
def home():
    return render_template('index.html')  # Load the HTML file


# Route for handling image uploads and predictions
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded!'}), 400

    file = request.files['file']

    # Save the uploaded image
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    # Preprocess the image for prediction
    img = image.load_img(file_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array /= 255.0  # Normalize

    # Make prediction
    prediction = model.predict(img_array)
    result = 'FAKE' if prediction[0][0] > 0.5 else 'REAL'
    confidence = prediction[0][0] if prediction[0][0] > 0.5 else 1 - prediction[0][0]

    # Clean up the uploaded file
    os.remove(file_path)

    return jsonify({
        'result': result,
        'confidence': f'{confidence * 100:.2f}%'
    })


# Function to extract frames from video at a given frame rate
def extract_frames(video_path, frame_rate=1):
    video = cv2.VideoCapture(video_path)
    frames = []
    success, frame = video.read()
    count = 0
    while success:
        if count % frame_rate == 0:  # Extract frames based on the frame rate
            frames.append(frame)
        success, frame = video.read()
        count += 1
    video.release()
    return frames


# Function to predict whether a frame is real or fake
def predict_frame(frame):
    resized_frame = cv2.resize(frame, (224, 224))  # Resize to model input size
    frame_array = img_to_array(resized_frame)
    frame_array = np.expand_dims(frame_array, axis=0)
    frame_array = frame_array / 255.0  # Normalize
    prediction = model.predict(frame_array)[0][0]  # Binary classification (0: fake, 1: real)
    return prediction


# Route for handling video uploads and predictions
@app.route('/predict_video', methods=['POST'])
def predict_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video uploaded!'}), 400

    video = request.files['video']
    video_path = os.path.join('uploads', video.filename)
    video.save(video_path)

    # Extract frames from the video
    frames = extract_frames(video_path, frame_rate=5)  # Adjust frame rate as needed

    predictions = []
    for frame in frames:
        prediction = predict_frame(frame)
        predictions.append(prediction)

    # Aggregate the results
    avg_prediction = np.mean(predictions)
    result = "Real Video" if avg_prediction > 0.3 else "Fake Video"

    # Clean up the video file after processing
    os.remove(video_path)

    return jsonify({'result': result, 'confidence': float(avg_prediction)})


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
