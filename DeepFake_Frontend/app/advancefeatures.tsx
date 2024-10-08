"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import AIMediaAnalysis from './usecase';
import { ProgressBar } from './ProgressBar';
import { Image, FileText, TrendingUp, Upload } from 'lucide-react';
import { Switch } from "@/components/ui/switch";  // Importing switch for dark mode toggle

// Import the NewsReliabilityChecker component
import NewsReliabilityChecker from '@/components/NewsReliabilityChecker';

const ImageEnhancement = () => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [imageUrl, setImageUrl] = useState("/api/placeholder/400/300");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setImageUrl(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const applyPreset = (preset: string) => {
    if (preset === 'bright') {
      setBrightness(150);
      setContrast(100);
      setSaturation(120);
    } else if (preset === 'vintage') {
      setBrightness(90);
      setContrast(80);
      setSaturation(70);
      setSepia(40);
    } else if (preset === 'high-contrast') {
      setBrightness(100);
      setContrast(150);
      setSaturation(110);
    }
  };

  const imageStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px) sepia(${sepia}%) grayscale(${grayscale}%)`,
    maxWidth: '100%',
    height: 'auto',
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'enhanced-image.png';
    link.click();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-lg font-semibold">Enhanced Image Editing</h3>
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
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="space-y-4">
            {['Brightness', 'Contrast', 'Saturation', 'Blur', 'Sepia', 'Grayscale'].map((filter, idx) => {
              const stateHandlers = {
                'Brightness': [brightness, setBrightness],
                'Contrast': [contrast, setContrast],
                'Saturation': [saturation, setSaturation],
                'Blur': [blur, setBlur],
                'Sepia': [sepia, setSepia],
                'Grayscale': [grayscale, setGrayscale],
              };
              const [value, setValue] = stateHandlers[filter];

              return (
                <div key={idx}>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    {filter}: {value}%
                  </Label>
                  <Slider
                    min={filter === 'Blur' ? 0 : 0}
                    max={filter === 'Blur' ? 10 : 200}
                    step={1}
                    value={[value]}
                    onValueChange={(val) => setValue(val[0])}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Preset Enhancements</h4>
            <div className="space-x-4">
              <Button onClick={() => applyPreset('bright')}>Bright</Button>
              <Button onClick={() => applyPreset('vintage')}>Vintage</Button>
              <Button onClick={() => applyPreset('high-contrast')}>High Contrast</Button>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
            <div className="border rounded-lg overflow-hidden">
              <img src={imageUrl} alt="Preview" style={imageStyle} />
            </div>
          </div>

          <Button className="w-full" onClick={downloadImage}>
            <Upload className="mr-2 h-4 w-4" /> Download Enhanced Image
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const AIMedia = () => {
  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <h2 className="text-3xl font-bold">AI Media Toolbox</h2>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="audio">
          <TabsList className="flex justify-center space-x-4">
            <TabsTrigger value="audio"><Image /> Image Enhancement</TabsTrigger>
            <TabsTrigger value="recommend"><FileText /> Fake News Detection</TabsTrigger>
          </TabsList>

          <TabsContent value="audio">
            <ImageEnhancement />
          </TabsContent>

          <TabsContent value="recommend">
            {/* Use the NewsReliabilityChecker component here */}
            <NewsReliabilityChecker />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default function AIMediaAnalysisFeatures() {
  return (
    <>
      <AIMedia />
      <AIMediaAnalysis />
    </>
  );
}
