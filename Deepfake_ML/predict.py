from tensorflow.keras.models import load_model
import numpy as np
from tensorflow.keras.preprocessing import image

# Load the saved model
model = load_model('deepfake_detection_model.h5')

# Function to load and preprocess a new image for prediction
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array /= 255.0  # Normalize pixel values between 0 and 1
    return img_array

# Make prediction on a new frame/image
img_path = './dataset/frames/fake/aagfhgtpmv_frame_7.jpg'
img = preprocess_image(img_path)
prediction = model.predict(img)

# Output the result
if prediction[0][0] > 0.5:
    print(f'The model predicts this image is FAKE with a probability of {prediction[0][0]:.2f}')
else:
    print(f'The model predicts this image is REAL with a probability of {1 - prediction[0][0]:.2f}')
