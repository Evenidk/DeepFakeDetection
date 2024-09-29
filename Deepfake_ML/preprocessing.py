import os
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Define image size and batch size for training
IMAGE_SIZE = (224, 224)  # Resizing images to 224x224 (can be adjusted)
BATCH_SIZE = 32  # Number of images to process in each batch during training

# Define directories for real and fake frames
train_dir = 'dataset/frames'
validation_split = 0.2  # Use 20% of the data for validation

# Create an ImageDataGenerator for preprocessing
datagen = ImageDataGenerator(
    rescale=1./255,  # Normalize pixel values between 0 and 1
    validation_split=validation_split  # Split the data into training and validation sets
)

# Load training data (for both real and fake)
train_generator = datagen.flow_from_directory(
    train_dir,
    target_size=IMAGE_SIZE,  # Resize images
    batch_size=BATCH_SIZE,
    class_mode='binary',  # Binary classification (real vs fake)
    subset='training'  # This is for training data
)

# Load validation data
validation_generator = datagen.flow_from_directory(
    train_dir,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='binary',  # Binary classification
    subset='validation'  # This is for validation data
)
