import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import Xception
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

# Parameters
img_size = (299, 299)  # Xception requires 299x299 input images
batch_size = 32
epochs = 10

# Data Augmentation and Preprocessing
train_datagen = ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    validation_split=0.2  # 20% of data for validation
)

train_generator = train_datagen.flow_from_directory(
    'output_frames',
    target_size=img_size,
    batch_size=batch_size,
    class_mode='binary',
    subset='training'  # Use for training
)

val_generator = train_datagen.flow_from_directory(
    'output_frames',
    target_size=img_size,
    batch_size=batch_size,
    class_mode='binary',
    subset='validation'  # Use for validation
)

# Load Xception with pre-trained weights
base_model = Xception(weights='imagenet', include_top=False, input_shape=(299, 299, 3))

# Adding custom layers on top of Xception
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation='relu')(x)
predictions = Dense(1, activation='sigmoid')(x)

# Full model
model = Model(inputs=base_model.input, outputs=predictions)

# Freeze the base Xception layers for fine-tuning
for layer in base_model.layers:
    layer.trainable = False

# Compile the model
model.compile(optimizer=Adam(learning_rate=0.0001), loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // batch_size,
    validation_data=val_generator,
    validation_steps=val_generator.samples // batch_size,
    epochs=epochs
)

# Save the trained model
model.save('xception_deepfake_detector.h5')
