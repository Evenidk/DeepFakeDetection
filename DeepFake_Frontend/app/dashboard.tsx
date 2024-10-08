"use client";
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileVideo, FileImage, FileAudio, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import DeepGuardDashboard from './dashui';
import RealTimeChart from "../components/RealTimeChart";

type AnalysisData = {
  confidence: number;
  type: string;
  timeSeriesData: { time: number; authenticity: number }[];
  impactData: { name: string; value: number }[];
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const DeepfakeDetectionDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('video');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [detectionResult, setDetectionResult] = useState<{
    isDeepfake: boolean;
    confidence: number;
    details: string;
  } | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    if (detectionResult) {
      setTimeout(() => {
        setAnalysisData({
          confidence: detectionResult.confidence,
          type: ["Face Swap", "Voice Cloning", "Full Body Manipulation"][Math.floor(Math.random() * 3)],
          timeSeriesData: Array.from({ length: 10 }, (_, i) => ({
            time: i,
            authenticity: Math.random() * 100,
          })),
          impactData: [
            { name: "Media", value: Math.random() * 100 },
            { name: "Politics", value: Math.random() * 100 },
            { name: "Finance", value: Math.random() * 100 },
            { name: "Education", value: Math.random() * 100 },
          ],
        });
      }, 1500);
    }
  }, [detectionResult]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsAnalyzing(true);
      setAnalysisProgress(0);
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            const isDeepfake = Math.random() > 0.5;
            setDetectionResult({
              isDeepfake: isDeepfake,
              confidence: Math.random() * 100,
              details: isDeepfake
                ? 'Analysis complete. Suspicious patterns detected in facial movements and audio synchronization.'
                : 'Analysis complete. No suspicious patterns detected.',
            });
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    }
  };

  const renderUploadAndAnalysis = (type: string) => (
    <div className="bg-gray-50 p-6 mb-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload {type} for Analysis</h2>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <input type="file" accept={type === 'video' ? 'video/*' : type === 'audio' ? 'audio/*' : type === 'image' ? 'image/*' : 'text/*'} onChange={handleFileUpload} className="hidden" id={`fileInput-${type}`} />
        <label
          htmlFor={`fileInput-${type}`}
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors"
        >
          <Upload size={36} className="text-gray-400 mb-2" />
          <span className="text-base font-medium text-gray-700">Click to upload or drag and drop</span>
          <span className="text-sm text-gray-500">Supported formats: {type === 'video' ? 'MP4, AVI' : type === 'audio' ? 'MP3, WAV' : type === 'image' ? 'JPG, PNG' : 'TXT, PDF'}</span>
        </label>
        <AnimatePresence>
          {uploadedFile && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mt-4">
              <p className="text-sm font-semibold text-gray-700">File uploaded: {uploadedFile.name}</p>
              {isAnalyzing ? (
                <div className="mt-2">
                  <Progress value={analysisProgress} className="w-full" />
                  <p className="text-sm text-gray-500 mt-1">Analyzing... {analysisProgress}%</p>
                </div>
              ) : detectionResult && (
                <Alert className={`mt-2 ${detectionResult.isDeepfake ? "bg-red-50" : "bg-green-50"}`}>
                  <AlertTitle className="flex items-center text-sm">
                    {detectionResult.isDeepfake ? (
                      <AlertTriangle className="mr-2 text-red-500" size={16} />
                    ) : (
                      <CheckCircle className="mr-2 text-green-500" size={16} />
                    )}
                    {detectionResult.isDeepfake ? "Potential Deepfake Detected" : "No Deepfake Detected"}
                  </AlertTitle>
                  <AlertDescription className="text-xs">
                    Confidence: {detectionResult.confidence.toFixed(2)}%<br />
                    {detectionResult.details}
                  </AlertDescription>
                </Alert>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="bg-gray-50 p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Deepfake Detection Analysis</h2>
      {analysisData ? (
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Detection Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-center text-gray-800">
                {analysisData.confidence.toFixed(2)}%
              </div>
              <div className="text-center mt-1 text-sm text-gray-600">Detected Type: {analysisData.type}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Authenticity Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analysisData.timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="authenticity" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={analysisData.impactData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {analysisData.impactData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p className="text-center text-gray-600">No analysis data available. Please upload a file for detection.</p>
      )}
    </div>
  );

  return (
    <div className="bg-gray-100 text-black p-4 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-6">Deepfake Detection Dashboard</h1>
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
            {renderUploadAndAnalysis(type)}
            {renderAnalysis()}
          </TabsContent>
        ))}
      </Tabs>

      {/* <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Deepfake Detection Trends</CardTitle>
          <CardDescription>Real-time trends from public APIs (NewsAPI and Shodan)</CardDescription>
        </CardHeader>
        <CardContent>
          <RealTimeChart />
        </CardContent>
      </Card> */}

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
      {/* <DeepGuardDashboard /> */}
    </div>
  );
};

export default DeepfakeDetectionDashboard;