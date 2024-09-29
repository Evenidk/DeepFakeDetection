# DeepGuard: AI in Media Analysis

## Project Overview
DeepGuard is an advanced media analysis platform built using machine learning algorithms to detect deepfake content, enhance media quality, and analyze text trends. It provides a range of tools to analyze media content, such as videos, images, and text, and offers a comprehensive dashboard for viewing analysis results.

## Key Features
1. **Deepfake Detection**:
   - Detect deepfake content in images, videos, and audio files.
   - Confidence scores for detection, highlighting suspicious regions and providing detailed reports.
   - Use pre-trained models (e.g., DeepFake Detection Challenge (DFDC) dataset) to analyze facial movements, texture inconsistencies, and other features.
   
2. **Image Enhancement**:
   - Upload images and adjust brightness, contrast, and saturation.
   - Preview the image before applying changes.
   - Save enhanced images to local storage.

3. **Text Trend Analysis**:
   - Upload text files and analyze trends, including topics like fake news detection.
   - Display trend prediction results on an interactive dashboard.

4. **Interactive Dashboard**:
   - Visualize detection trends for media across different months.
   - Display recent detections for video, audio, image, and text formats with authenticity or deepfake labels.
   - View detection accuracy and confidence scores.

5. **Security and Privacy**:
   - Secure handling of all uploaded media.
   - Privacy-centric, ensuring user data is processed with care.

## Installation & Setup

### Prerequisites
- Python 3.7 or higher
- Node.js and npm for the frontend (Angular)
- Flask for backend API
- TensorFlow or PyTorch (depending on your selected deepfake detection models)

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-repo/deepguard.git
    cd deepguard
    ```

2. **Backend Setup:**

    Install required Python packages:

    ```bash
    pip install -r requirements.txt
    ```

    Run the Flask server:

    ```bash
    python app.py
    ```

3. **Frontend Setup:**

    Navigate to the `frontend` directory:

    ```bash
    cd frontend
    npm install
    ```

    Run the Angular frontend:

    ```bash
    ng serve
    ```

4. **Access the Application:**
    Open your browser and navigate to:
    
    ```
    http://localhost:4200
    ```

## Usage

### Deepfake Detection
- Upload images or videos for analysis.
- The system will generate a confidence score and display any suspicious areas in the media.
- View the detection trends and results in the analysis dashboard.

### Image Enhancement
- Upload an image.
- Adjust brightness, contrast, and saturation using sliders.
- Preview and save the enhanced image.

### Text Analysis
- Upload text files for analysis.
- Detect fake news and predict trends within the text.

## Screenshots

### Image Enhancement Interface:
![Image Enhancement](https://github.com/user-attachments/assets/e4bafe23-3a04-40cd-9109-8b6f6dd4dae7)

### Deepfake Detection Trends:
![Deepfake Trends]![Screenshot 2024-09-29 131713](https://github.com/user-attachments/assets/32525b05-5f1d-4447-938b-8205e18f361f)


### Deepfake Detection Analysis:
![Deepfake Detection]![Screenshot 2024-09-29 131701](https://github.com/user-attachments/assets/b10069b9-8f7c-4302-910a-d441ef2c6949)



## Technologies Used
- **Frontend**: NextJs, ShadCN-UI, Bootstrap 5
- **Backend**: Flask, TensorFlow/PyTorch
- **Database**: SQLite/PostgreSQL (for user and media data)
- **Machine Learning**: Pre-trained deepfake detection models (DFDC dataset), NLP models for text analysis

## Contributing
Feel free to fork the project and submit pull requests. Contributions are welcome for improving accuracy and adding new features.


