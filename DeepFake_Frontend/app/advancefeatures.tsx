"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Image, FileText, TrendingUp, AlertTriangle, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import AIMediaAnalysis from './usecase';
// ... (Keep the ImageEnhancement and TextAnalysis components from the previous artifact)



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
  
  const TextAnalysis = () => {
    const [text, setText] = useState('');
    const [analysis, setAnalysis] = useState(null);
  
    const analyzeText = () => {
      // Simulated analysis
      setAnalysis({
        sentiment: 'Positive',
        keywords: ['AI', 'technology', 'innovation'],
        readability: 'College level'
      });
    };
  
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Text Analysis</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter text to analyze"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={analyzeText} className="w-full">Analyze Text</Button>
            {analysis && (
              <div className="bg-gray-100 p-4 rounded">
                <p><strong>Sentiment:</strong> {analysis.sentiment}</p>
                <p><strong>Keywords:</strong> {analysis.keywords.join(', ')}</p>
                <p><strong>Readability:</strong> {analysis.readability}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

const TrendPrediction = () => {
  const [topic, setTopic] = useState('');
  const [prediction, setPrediction] = useState(null);

  const predictTrend = () => {
    // Simulated prediction with graph data
    setPrediction({
      trend: 'Upward',
      confidence: '75%',
      timeframe: 'Next 3 months',
      data: [
        { month: 'Jan', interest: 4000 },
        { month: 'Feb', interest: 3000 },
        { month: 'Mar', interest: 5000 },
        { month: 'Apr', interest: 5780 },
        { month: 'May', interest: 6890 },
        { month: 'Jun', interest: 6390 },
      ]
    });
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Trend Prediction</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Enter a topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button onClick={predictTrend} className="w-full">Predict Trend</Button>
          {prediction && (
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded">
                <p><strong>Predicted Trend:</strong> {prediction.trend}</p>
                <p><strong>Confidence:</strong> {prediction.confidence}</p>
                <p><strong>Timeframe:</strong> {prediction.timeframe}</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={prediction.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="interest" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const FakeNewsDetection = () => {
  const [newsText, setNewsText] = useState('');
  const [result, setResult] = useState(null);

  const detectFakeNews = () => {
    // Simulated detection with graph data
    setResult({
      verdict: Math.random() > 0.5 ? 'Potentially False' : 'Likely True',
      confidence: `${Math.floor(Math.random() * 30) + 70}%`,
      factCheckSources: ['Fact Checker A', 'Fact Checker B'],
      analysisData: [
        { factor: 'Source Credibility', score: Math.random() * 100 },
        { factor: 'Content Consistency', score: Math.random() * 100 },
        { factor: 'Emotional Language', score: Math.random() * 100 },
        { factor: 'Fact Verification', score: Math.random() * 100 },
      ]
    });
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Fake News Detection</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <textarea
            className="w-full h-32 p-2 border rounded"
            placeholder="Enter news text to analyze"
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
          />
          <Button onClick={detectFakeNews} className="w-full">Analyze News</Button>
          {result && (
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded">
                <p><strong>Verdict:</strong> {result.verdict}</p>
                <p><strong>Confidence:</strong> {result.confidence}</p>
                <p><strong>Fact-Check Sources:</strong> {result.factCheckSources.join(', ')}</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={result.analysisData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="factor" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const NewTrendsRelated = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchTrends = () => {
      // Simulated API call to fetch trending topics
      const newTrends = [
        { topic: 'AI in Healthcare', popularity: Math.floor(Math.random() * 100) },
        { topic: 'Sustainable Energy', popularity: Math.floor(Math.random() * 100) },
        { topic: 'Space Exploration', popularity: Math.floor(Math.random() * 100) },
        { topic: 'Quantum Computing', popularity: Math.floor(Math.random() * 100) },
        { topic: 'Cybersecurity', popularity: Math.floor(Math.random() * 100) },
      ];
      setTrends(newTrends);
    };

    fetchTrends();
    const interval = setInterval(fetchTrends, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">New Trends Related</h3>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="topic" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="popularity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const AIMedia = () => {
  return (
 
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <h2 className="text-3xl font-bold text-center">AI in Media Analysis: Advanced Features</h2>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="image">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="image">Image Enhancement</TabsTrigger>
            <TabsTrigger value="text">Text Analysis</TabsTrigger>
            <TabsTrigger value="trend">Trend Prediction</TabsTrigger>
            <TabsTrigger value="fake">Fake News Detection</TabsTrigger>
            <TabsTrigger value="new-trends">New Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="image"><ImageEnhancement /></TabsContent>
          <TabsContent value="text"><TextAnalysis /></TabsContent>
          <TabsContent value="trend"><TrendPrediction /></TabsContent>
          <TabsContent value="fake"><FakeNewsDetection /></TabsContent>
          <TabsContent value="new-trends"><NewTrendsRelated /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
    
  );
};


export default function AIMediaAnalysisFeatures(){
  return (
    <>
    <AIMedia/>
    <AIMediaAnalysis/>
    </>

  );
}