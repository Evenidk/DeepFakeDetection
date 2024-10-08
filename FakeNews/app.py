from flask import Flask, request, jsonify
import re

app = Flask(__name__)

# Function to clean the input text
def clean_text(text):
    text = re.sub(r'\[.*?\]', '', text)  # Remove text inside brackets
    text = re.sub(r'https?://\S+|www\.\S+', '', text)  # Remove URLs
    text = re.sub(r'\w*\d\w*', '', text)  # Remove words containing digits
    return text

# Root route to handle the base URL
@app.route('/')
def home():
    return "Welcome to the Fake News Detection API!"

# Route to handle fake news prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Extract the JSON data sent in the POST request
    text = data.get('text', '')  # Get the 'text' field from the JSON

    # Clean the text
    cleaned_text = clean_text(text)

    # In a real application, you would use a model to predict here
    # For demonstration, I'm returning a mock prediction
    # Replace 'some_condition' with your actual prediction logic
    prediction = "fake" if len(cleaned_text) % 2 == 0 else "real"

    # Return the prediction as a JSON response
    return jsonify({"prediction": prediction, "cleaned_text": cleaned_text})

if __name__ == '__main__':
    app.run(debug=True)
