"use client";
import React, { useState, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertCircle, Bell, Upload, ChevronDown, Users, Zap, Globe, Database, Code } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useDropzone } from 'react-dropzone';

const DeepGuardDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFile(acceptedFiles[0]);
    processFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const processFile = async (file) => {
    setIsProcessing(true);
    // Simulating file processing and analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock data for demonstration
    const mockResult = {
      overallScore: Math.random(),
      timelineData: Array.from({ length: 100 }, (_, i) => ({
        frame: i + 1,
        probability: Math.random()
      })),
      detectedFeatures: [
        { name: 'Facial Inconsistencies', score: Math.random() },
        { name: 'Audio Manipulation', score: Math.random() },
        { name: 'Background Anomalies', score: Math.random() }
      ],
      heatmapUrl: '/api/placeholder/640/360' // Replace with actual heatmap generation
    };

    setAnalysisResult(mockResult);
    setIsProcessing(false);
  };

  const renderFileUpload = () => (
    <div {...getRootProps()} className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here ...</p>
      ) : (
        <p>Drag 'n' drop a file here, or click to select a file</p>
      )}
    </div>
  );

  const renderAnalysisResult = () => {
    if (!analysisResult) return null;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Deepfake Probability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              {(analysisResult.overallScore * 100).toFixed(2)}%
            </div>
            <Progress value={analysisResult.overallScore * 100} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tampering Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analysisResult.timelineData}>
                <XAxis dataKey="frame" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="probability" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detected Features</CardTitle>
          </CardHeader>
          <CardContent>
            {analysisResult.detectedFeatures.map((feature, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{feature.name}</span>
                  <span>{(feature.score * 100).toFixed(2)}%</span>
                </div>
                <Progress value={feature.score * 100} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deepfake Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={analysisResult.heatmapUrl} alt="Deepfake Heatmap" className="w-full rounded-lg" />
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
     
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="results">Analysis Results</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Media for Analysis</CardTitle>
              <CardDescription>
                Upload an image or video file to detect potential deepfakes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isProcessing ? (
                <div className="text-center">
                  <Progress value={100} className="mb-2" />
                  <p>Processing your file...</p>
                </div>
              ) : (
                renderFileUpload()
              )}
            </CardContent>
            <CardFooter>
              {uploadedFile && !isProcessing && (
                <p>Uploaded: {uploadedFile.name}</p>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="results">
          {renderAnalysisResult()}
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>API Integration</CardTitle>
                <CardDescription>
                  Configure DeepGuard API for third-party platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">API Key:</span>
                    <code className="px-2 py-1 bg-muted rounded text-sm">
                      ••••••••••••••••
                    </code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Endpoint:</span>
                    <code className="px-2 py-1 bg-muted rounded text-sm">
                      https://api.deepguard.com/v1/detect
                    </code>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Regenerate API Key</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure alerts for suspicious media
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span className="text-sm font-medium">Email Alerts</span>
                    <Badge>Enabled</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm font-medium">Real-time Notifications</span>
                    <Badge variant="outline">Disabled</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Settings</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeepGuardDashboard;