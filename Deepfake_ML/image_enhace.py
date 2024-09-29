from PIL import Image, ImageEnhance
from flask import Flask, request, jsonify


@app.route('/enhance_image', methods=['POST'])
def enhance_image():
    file = request.files['image']
    brightness = float(request.form['brightness'])
    contrast = float(request.form['contrast'])
    saturation = float(request.form['saturation'])

    image = Image.open(file)

    # Apply enhancements
    enhancer = ImageEnhance.Brightness(image)
    image = enhancer.enhance(brightness)

    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(contrast)

    enhancer = ImageEnhance.Color(image)
    image = enhancer.enhance(saturation)

    # Save and return the enhanced image
    output_path = 'enhanced_image.jpg'
    image.save(output_path)

    return jsonify({'status': 'Image enhanced successfully', 'path': output_path})
