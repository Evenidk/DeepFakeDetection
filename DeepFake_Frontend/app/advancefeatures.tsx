"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import AIMediaAnalysis from './usecase';
// ... (Keep the ImageEnhancement and TextAnalysis components from the previous artifact)
import { ProgressBar } from './ProgressBar';
import { Image, FileText, TrendingUp, AlertTriangle, Upload, Music, Video } from 'lucide-react';
import { Switch } from "@/components/ui/switch";  // Importing switch for dark mode toggle


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
            {/* Sliders for Brightness, Contrast, Saturation, etc. */}
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

interface Analysis {
  sentiment: { overall: string; score: number };
  keywords: string[];
  readability: string;
  entities: string[];
  topics: string[];
}
  
  // Define the initial state, which can be null or an Analysis object
 
  
  // Simulated analysis
  const TextAnalysis = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
  
    const analyzeText = () => {
      setLoading(true);
      setTimeout(() => {
        setAnalysis({
          sentiment: { overall: 'Positive', score: 85 },
          keywords: ['AI', 'innovation', 'future'],
          readability: 'College Level',
          entities: ['Artificial Intelligence', 'Technology'],
          topics: ['Innovation in AI', 'Future of AI'],
        });
        setLoading(false);
      }, 1500); // Simulate API call
    };
  
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Enhanced Text Analysis</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Enter text to analyze"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={analyzeText} className="w-full">
              {loading ? 'Analyzing...' : 'Analyze Text'}
            </Button>
  
            {loading && <p>Analyzing text, please wait...</p>}
  
            {analysis && !loading && (
              <div className="bg-gray-100 p-4 rounded">
                <p><strong>Sentiment:</strong> {analysis.sentiment.overall} ({analysis.sentiment.score}%)</p>
                <p><strong>Keywords:</strong> {analysis.keywords.join(', ')}</p>
                <p><strong>Readability:</strong> {analysis.readability}</p>
                <p><strong>Entities:</strong> {analysis.entities.join(', ')}</p>
                <p><strong>Topics:</strong> {analysis.topics.join(', ')}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  interface Trends {
    trend: string;
    confidence: string;
    timeframe: string;
    data: any;
  }
const TrendPrediction = () => {
  const [topic, setTopic] = useState('');
  const [prediction, setPrediction] = useState <Trends | null>(null);

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

interface AnalysisData {
  factor: string;
  score: number;
}

interface Result {
  verdict: string;
  confidence: string;
  factCheckSources: string[];
  analysisData: AnalysisData[];
}

const FakeNewsDetection = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzeText = () => {
    setLoading(true);
    setTimeout(() => {
      const fakeProbability = Math.random() * 100;
      const data = [
        { name: 'Sentiment', value: 75 },
        { name: 'Fact-check Score', value: 80 },
        { name: 'Source Reliability', value: 65 },
        { name: 'Relevance', value: 50 },
      ];

      setAnalysis({
        probability: fakeProbability,
        data,
      });
      setLoading(false);
    }, 2000); // Simulate API
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Enhanced Fake News Detection</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Enter text or news"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={analyzeText} className="w-full">
            {loading ? 'Detecting...' : 'Detect Fake News'}
          </Button>

          {loading && <p>Analyzing for fake news...</p>}

          {analysis && !loading && (
            <div className="bg-gray-100 p-4 rounded">
              <p><strong>Probability of being fake news:</strong> {analysis.probability.toFixed(2)}%</p>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analysis.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface Trend {
  topic: string;
  popularity: number;
}

const NewTrendsRelated = () => {
  const [trends, setTrends] = useState<Trend[]>([]); // Specify the state type as an array of Trend objects

  useEffect(() => {
    const fetchTrends = () => {
      // Simulated API call to fetch trending topics
      const newTrends: Trend[] = [
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

    return () => clearInterval(interval); // Clear the interval when the component unmounts
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
const AudioSentimentAnalysis = () => {
  const [audioUrl, setAudioUrl] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setAudioUrl(URL.createObjectURL(file));
      setLoading(true);

      // Simulating realistic audio processing delay
      setTimeout(() => {
        setSentiment(Math.random() > 0.5 ? 'Positive' : 'Negative');
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Audio Sentiment Analysis</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label htmlFor="audio-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Upload Audio
          </Label>
          <input
            id="audio-upload"
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            className="block w-full text-sm"
          />
          {audioUrl && (
            <div className="mt-4">
              <audio controls src={audioUrl} className="w-full" />
            </div>
          )}
          {loading && (
            <div className="mt-4">
              <ProgressBar progress={70} />
            </div>
          )}
          {sentiment && !loading && (
            <div className="mt-4 bg-gray-100 p-4 rounded">
              <p><strong>Sentiment:</strong> {sentiment}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced: Video Metadata Extraction with more details
const VideoMetadataExtraction = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [metadata, setMetadata] = useState<{
    duration: string;
    format: string;
    resolution: string;
    frameRate: string;
  } | null>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setVideoUrl(URL.createObjectURL(file));
      
      // Simulate detailed metadata extraction
      setTimeout(() => {
        setMetadata({
          duration: '5:34',
          format: 'MP4',
          resolution: '1920x1080',
          frameRate: '30fps',
        });
      }, 1000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Video Metadata Extraction</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Label htmlFor="video-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Upload Video
          </Label>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="block w-full text-sm"
          />
          {videoUrl && (
            <div className="mt-4">
              <video controls src={videoUrl} className="w-full" />
            </div>
          )}
          {metadata && (
            <div className="mt-4 bg-gray-100 p-4 rounded">
              <p><strong>Duration:</strong> {metadata.duration}</p>
              <p><strong>Format:</strong> {metadata.format}</p>
              <p><strong>Resolution:</strong> {metadata.resolution}</p>
              <p><strong>Frame Rate:</strong> {metadata.frameRate}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced: Social Media Trend Analyzer with more dynamic trend data
const SocialMediaTrendAnalyzer = () => {
  
  const [topic, setTopic] = useState('');
  const [trends, setTrends] = useState<{ platform: string; popularity: number }[]>([]);

  const analyzeTrends = () => {
    // Simulating social media trends with more variation
    const mockTrends = [
      { platform: 'Twitter', popularity: Math.floor(Math.random() * 100) },
      { platform: 'Instagram', popularity: Math.floor(Math.random() * 100) },
      { platform: 'YouTube', popularity: Math.floor(Math.random() * 100) },
      { platform: 'Facebook', popularity: Math.floor(Math.random() * 100) },
    ];

    setTrends(mockTrends);
  };

  return (
   
   
    <Card>
<TrendPrediction/>
      <NewTrendsRelated/>
      
      <CardHeader>
        <h3 className="text-lg font-semibold">Social Media Trend Analyzer</h3>
      </CardHeader>
    
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Enter topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button onClick={analyzeTrends} className="w-full">Analyze Trends</Button>
          {trends.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="popularity" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced: Content Recommendation Engine with more diverse recommendations
const ContentRecommendation = () => {
  const [inputContent, setInputContent] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const recommendContent = () => {
    // Simulate more realistic recommendations based on input
    const recommendationsPool = [
      { keyword: 'AI', content: ['AI in Healthcare', 'AI Trends in 2024', 'Top AI Applications'] },
      { keyword: 'Quantum', content: ['Quantum Computing Basics', 'The Future of Quantum Computing', 'Quantum Technologies'] },
      { keyword: 'Sustainability', content: ['Sustainable Energy', 'Climate Change Solutions', 'Green Technologies'] },
    ];

    const foundRecommendations = recommendationsPool.find(item => inputContent.toLowerCase().includes(item.keyword.toLowerCase()));

    setRecommendations(foundRecommendations ? foundRecommendations.content : ['No specific recommendations available']);
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Content Recommendation Engine</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Enter content for recommendation"
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
          />
          <Button onClick={recommendContent} className="w-full">Get Recommendations</Button>
          {recommendations.length > 0 && (
            <div className="mt-4 bg-gray-100 p-4 rounded">
              <p><strong>Recommendations:</strong></p>
              <ul>
                {recommendations.map((rec, index) => (
                  <li key={index} className="mt-1">{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Main component including the enhanced features
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
            <TabsTrigger value="video"><Video /> Media Analysis</TabsTrigger>
            <TabsTrigger value="trend"><TrendingUp /> Social Media Trends</TabsTrigger>
            <TabsTrigger value="recommend"><FileText /> Fake News Detection</TabsTrigger>
          </TabsList>

          <TabsContent value="audio">
           <ImageEnhancement/>
          </TabsContent>
          <TabsContent value="video">
            <TextAnalysis/>
            <AudioSentimentAnalysis/>
            <VideoMetadataExtraction />
          </TabsContent>
          <TabsContent value="trend">
            <SocialMediaTrendAnalyzer />
          </TabsContent>
          <TabsContent value="recommend">
            <FakeNewsDetection/>
            <ContentRecommendation />
          </TabsContent>
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