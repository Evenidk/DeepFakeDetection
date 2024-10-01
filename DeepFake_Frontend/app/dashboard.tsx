"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileVideo, FileImage, FileAudio, FileText, AlertCircle } from 'lucide-react';
import { Switch } from "@/components/ui/switch";  // Importing switch for dark mode toggle

const fakeData = [
  { name: 'Jan', video: 400, audio: 240, image: 320, text: 180 },
  { name: 'Feb', video: 300, audio: 139, image: 220, text: 250 },
  { name: 'Mar', video: 200, audio: 980, image: 290, text: 190 },
  // ...
];

const DeepfakeDetectionDashboard = () => {
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const [activeTab, setActiveTab] = useState<string>('video');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [detectionResult, setDetectionResult] = useState<{
    isDeepfake: boolean;
    confidence: number;
    details: string;
  } | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      setAnalysisProgress(0);
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            setDetectionResult({
              isDeepfake: Math.random() > 0.5,
              confidence: Math.random() * 100,
              details: 'Analysis complete. Suspicious patterns detected in facial movements and audio synchronization.',
            });
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} p-4 max-w-6xl mx-auto min-h-screen`}>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-6">Deepfake Detection Dashboard</h1>
        {/* Dark Mode Toggle */}
        <div className="flex items-center">
          <span>Dark Mode</span>
          <Switch checked={darkMode} onCheckedChange={() => setDarkMode(!darkMode)} className="ml-2"/>
        </div>
      </div>
      
      <Tabs defaultValue="video" className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="video" onClick={() => setActiveTab('video')}>Video</TabsTrigger>
          <TabsTrigger value="audio" onClick={() => setActiveTab('audio')}>Audio</TabsTrigger>
          <TabsTrigger value="image" onClick={() => setActiveTab('image')}>Image</TabsTrigger>
          <TabsTrigger value="text" onClick={() => setActiveTab('text')}>Text</TabsTrigger>
        </TabsList>
        
        {['video', 'audio', 'image', 'text'].map((type) => (
          <TabsContent key={type} value={type}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{type.charAt(0).toUpperCase() + type.slice(1)} Deepfake Detection</CardTitle>
                <CardDescription>Upload a {type} file to analyze for potential deepfakes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center w-full mb-4">
                  <label htmlFor={`dropzone-file-${type}`} className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:bg-gray-100`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">Supported formats: {type === 'video' ? 'MP4, AVI' : type === 'audio' ? 'MP3, WAV' : type === 'image' ? 'JPG, PNG' : 'TXT, PDF'}</p>
                    </div>
                    <input id={`dropzone-file-${type}`} type="file" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
                {isAnalyzing && (
                  <div className="mb-4">
                    <Progress value={analysisProgress} className="w-full" />
                    <p className="text-center mt-2">Analyzing {type}... {analysisProgress}%</p>
                  </div>
                )}
                {detectionResult && (
                  <div className={`p-4 rounded-lg ${detectionResult.isDeepfake ? 'bg-red-100' : 'bg-green-100'}`}>
                    <h3 className="font-bold mb-2">{detectionResult.isDeepfake ? 'Potential Deepfake Detected' : 'No Deepfake Detected'}</h3>
                    <p>Confidence: {detectionResult.confidence.toFixed(2)}%</p>
                    <p>{detectionResult.details}</p>
                    {/* Download Report Button */}
                    <Button className="mt-2">Download Report</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Deepfake Detection Trends</CardTitle>
          <CardDescription>Monthly detection rates across different media types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fakeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="video" stroke="#8884d8" />
                <Line type="monotone" dataKey="audio" stroke="#82ca9d" />
                <Line type="monotone" dataKey="image" stroke="#ffc658" />
                <Line type="monotone" dataKey="text" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Detections</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[{ type: 'video', name: 'interview.mp4', result: 'Deepfake' }, { type: 'audio', name: 'speech.wav', result: 'Authentic' }, { type: 'image', name: 'portrait.jpg', result: 'Deepfake' }, { type: 'text', name: 'article.txt', result: 'Authentic' },].map((item, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="flex items-center">
                    {item.type === 'video' && <FileVideo className="mr-2" />}
                    {item.type === 'audio' && <FileAudio className="mr-2" />}
                    {item.type === 'image' && <FileImage className="mr-2" />}
                    {item.type === 'text' && <FileText className="mr-2" />}
                    {item.name}
                  </span>
                  <span className={item.result === 'Deepfake' ? 'text-red-500' : 'text-green-500'}>
                    {item.result}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Detection Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Video', 'Audio', 'Image', 'Text'].map((type) => (
                <div key={type}>
                  <div className="flex justify-between mb-1">
                    <span>{type}</span>
                    <span>{Math.floor(Math.random() * 20) + 80}%</span>
                  </div>
                  <Progress value={Math.floor(Math.random() * 20) + 80} className="w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeepfakeDetectionDashboard;
