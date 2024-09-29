import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

const ImageEnhancement = () => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [imageUrl, setImageUrl] = useState("/api/placeholder/400/300");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const imageStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
    maxWidth: '100%',
    height: 'auto',
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">Image Enhancement</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </Label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="brightness" className="block text-sm font-medium text-gray-700 mb-2">
                Brightness: {brightness}%
              </Label>
              <Slider
                id="brightness"
                min={0}
                max={200}
                step={1}
                value={[brightness]}
                onValueChange={(value) => setBrightness(value[0])}
              />
            </div>
            <div>
              <Label htmlFor="contrast" className="block text-sm font-medium text-gray-700 mb-2">
                Contrast: {contrast}%
              </Label>
              <Slider
                id="contrast"
                min={0}
                max={200}
                step={1}
                value={[contrast]}
                onValueChange={(value) => setContrast(value[0])}
              />
            </div>
            <div>
              <Label htmlFor="saturation" className="block text-sm font-medium text-gray-700 mb-2">
                Saturation: {saturation}%
              </Label>
              <Slider
                id="saturation"
                min={0}
                max={200}
                step={1}
                value={[saturation]}
                onValueChange={(value) => setSaturation(value[0])}
              />
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
            <div className="border rounded-lg overflow-hidden">
              <img src={imageUrl} alt="Preview" style={imageStyle} />
            </div>
          </div>
          
          <Button className="w-full">
            <Upload className="mr-2 h-4 w-4" /> Save Enhanced Image
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageEnhancement;