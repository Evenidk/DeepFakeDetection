from tensorflow.keras.applications import ResNet50
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.optimizers import Adam
from preprocessing import train_generator, validation_generator, BATCH_SIZE
# Load the pre-trained ResNet50 model (without the top fully connected layers)
base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# Create a sequential model and add layers
model = Sequential()
model.add(base_model)  # Add the ResNet50 base model
model.add(Flatten())  # Flatten the output of the ResNet model
model.add(Dense(1, activation='sigmoid'))  # Output layer for binary classification (real vs fake)

# Compile the model
model.compile(optimizer=Adam(learning_rate=0.0001), loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // BATCH_SIZE,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // BATCH_SIZE,
    epochs=10  # You can increase the number of epochs if needed
)
