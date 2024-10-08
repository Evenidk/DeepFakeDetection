// UploadAndAnalysis.tsx

import React, { useState, useEffect } from "react";
import { Upload, CheckCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

type AnalysisData = {
  confidence: number;
  type: string;
  timeSeriesData: { time: number; authenticity: number }[];
  impactData: { name: string; value: number }[];
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const UploadAndAnalysis: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [detectionResult, setDetectionResult] = useState<"authentic" | "deepfake" | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    if (detectionResult) {
      setTimeout(() => {
        setAnalysisData({
          confidence: Math.random() * 100,
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
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setUploadedFile(file);
      setTimeout(() => {
        setDetectionResult(Math.random() > 0.5 ? "authentic" : "deepfake");
      }, 2000);
    }
  };

  const renderUpload = () => (
    <div className="bg-gray-50 p-6 mb-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload Media for Analysis</h2>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" id="fileInput" />
        <label
          htmlFor="fileInput"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors"
        >
          <Upload size={36} className="text-gray-400 mb-2" />
          <span className="text-base font-medium text-gray-700">Click to upload or drag and drop</span>
          <span className="text-sm text-gray-500">Supported formats: JPG, PNG, MP4</span>
        </label>
        <AnimatePresence>
          {uploadedFile && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mt-4">
              <p className="text-sm font-semibold text-gray-700">File uploaded: {uploadedFile.name}</p>
              {detectionResult === null ? (
                <p className="text-sm text-gray-500">Analyzing...</p>
              ) : (
                <Alert className={`mt-2 ${detectionResult === "authentic" ? "bg-green-50" : "bg-red-50"}`}>
                  <AlertTitle className="flex items-center text-sm">
                    {detectionResult === "authentic" ? (
                      <CheckCircle className="mr-2 text-green-500" size={16} />
                    ) : (
                      <AlertTriangle className="mr-2 text-red-500" size={16} />
                    )}
                    {detectionResult === "authentic" ? "Authentic Content" : "Deepfake Detected"}
                  </AlertTitle>
                  <AlertDescription className="text-xs">
                    {detectionResult === "authentic"
                      ? "The uploaded content appears to be authentic."
                      : "The uploaded content may be a deepfake. Please verify its source."}
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
    <div className="min-h-screen bg-gray-100 py-8">
      {renderUpload()}
      {renderAnalysis()}
    </div>
  );
};

export default UploadAndAnalysis;
