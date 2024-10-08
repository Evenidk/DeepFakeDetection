"use client";
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { AlertCircle, Sun, Moon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Basic UI Components using Tailwind CSS
const Alert = ({ variant, children, className }) => (
  <div className={`border-l-4 p-4 ${variant === 'destructive' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'} ${className}`}>
    {children}
  </div>
);

const AlertTitle = ({ children }) => (
  <div className="font-semibold mb-1">{children}</div>
);

const AlertDescription = ({ children }) => (
  <div className="text-sm">{children}</div>
);

const Card = ({ children, className }) => (
  <div className={`shadow rounded-lg p-4 bg-white dark:bg-gray-700 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-2">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{children}</h2>
);

const CardContent = ({ children }) => (
  <div>
    {children}
  </div>
);

const Button = ({ variant, children, onClick, className }) => {
  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium focus:outline-none";
  const variantClasses = variant === 'primary'
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : variant === 'outline'
    ? "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
    : variant === 'secondary'
    ? "bg-gray-600 text-white hover:bg-gray-700"
    : "bg-green-600 text-white hover:bg-green-700";

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </button>
  );
};

const Switch = ({ checked, onCheckedChange, className }) => (
  <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onCheckedChange} />
    <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-600">
      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${checked ? 'transform translate-x-5' : ''}`}></div>
    </div>
  </label>
);

// Mock data generation functions
const generateInitialTimeSeriesData = () => ({
  groundTruth: Array.from({ length: 20 }, (_, i) => ({
    timestamp: new Date(Date.now() - (20 - i) * 60000).toISOString(),
    value: 0.5 // Fixed ground truth value for consistency
  })),
  inputData: Array.from({ length: 20 }, (_, i) => ({
    timestamp: new Date(Date.now() - (20 - i) * 60000).toISOString(),
    value: 0.5 // Initialize with ground truth to prevent mismatch
  }))
});

const generateComparisonData = () => (
  Array.from({ length: 5 }, (_, i) => ({
    category: `Category ${i + 1}`,
    current: 0.5, // Initialize with ground truth
    previous: 0.5,
    groundTruth: 0.5
  }))
);

const generatePerformanceMetrics = () => ({
  accuracy: "0.90", // Initialize with fixed value
  precision: "0.85",
  recall: "0.88",
  f1Score: "0.86"
});

// Simulated Recommendations
const getRecommendations = () => {
  return "Current trends are stable. Continue monitoring.";
};

const DeepfakeMonitorDashboard = () => {
  // Initialize state with consistent data
  const [timeSeriesData, setTimeSeriesData] = useState(generateInitialTimeSeriesData());
  const [modelDriftData, setModelDriftData] = useState(generateComparisonData());
  const [performanceMetrics, setPerformanceMetrics] = useState(generatePerformanceMetrics());
  const [alert, setAlert] = useState(false);
  const [retrainTime, setRetrainTime] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [hasMounted, setHasMounted] = useState(false); // To ensure client-side rendering

  useEffect(() => {
    setHasMounted(true); // Component has mounted on client

    const interval = setInterval(() => {
      // Update Time Series Data
      setTimeSeriesData(prevData => {
        const newInputValue = 0.5 + (Math.random() - 0.5) * 0.2;
        const newGroundTruth = {
          timestamp: new Date().toISOString(),
          value: 0.5
        };
        const newInputData = {
          timestamp: newGroundTruth.timestamp,
          value: newInputValue
        };
        return {
          groundTruth: [...prevData.groundTruth.slice(1), newGroundTruth],
          inputData: [...prevData.inputData.slice(1), newInputData]
        };
      });

      // Update Model Drift Data
      setModelDriftData(prevData => {
        const newData = prevData.map(item => ({
          ...item,
          previous: item.current,
          current: 0.5 + (Math.random() - 0.5) * 0.3
        }));
        return newData;
      });

      // Update Performance Metrics
      setPerformanceMetrics(generatePerformanceMetrics());

      // Check for significant drift
      const driftThreshold = 0.3;
      const significantDrift = modelDriftData.some(
        item => Math.abs(item.current - item.groundTruth) > driftThreshold
      );
      setAlert(significantDrift);

      // Set retrain time if drift is significant
      if (significantDrift && !retrainTime) {
        setRetrainTime(new Date(Date.now() + 600000)); // Set retrain time to 10 minutes later
      }

      // Clear retrain time if no significant drift
      if (!significantDrift && retrainTime) {
        setRetrainTime(null);
      }

    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [modelDriftData, retrainTime]);

  const handleAcknowledgeAlert = () => {
    setAlert(false);
    setRetrainTime(null);
  };

  const handleRetrainNow = () => {
    window.alert('Retraining Initiated');
    setRetrainTime(null);
    setAlert(false);
    // Implement actual retraining logic here
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim() === '') {
      window.alert('Please enter your feedback before submitting.');
      return;
    }
    window.alert(`Feedback submitted: ${feedback}`);
    setFeedback('');
    // Implement actual feedback handling logic here
  };

  // Prevent hydration mismatch by only rendering after mount
  if (!hasMounted) {
    return null;
  }

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="p-6 max-w-7xl mx-auto bg-gray-100 dark:bg-gray-800 min-h-screen transition-colors duration-300">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Deepfake Detection Model Monitoring</h1>
          <div className="flex items-center">
            <Sun className="h-6 w-6 text-yellow-500" />
            <Switch
              checked={darkMode}
              onCheckedChange={() => setDarkMode(!darkMode)}
              className="mx-2"
            />
            <Moon className="h-6 w-6 text-blue-500" />
          </div>
        </div>

        {alert && (
          <Alert variant="destructive" className="mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
              <div>
                <AlertTitle>Alert: Significant Model Drift Detected</AlertTitle>
                <AlertDescription>
                  The model has experienced significant drift. Consider retraining the model within {retrainTime ? `${Math.floor((retrainTime - new Date()) / 60000)} minutes` : 'soon'}.
                </AlertDescription>
              </div>
            </div>
            <div className="mt-4 flex space-x-4">
              <Button variant="outline" onClick={handleAcknowledgeAlert}>
                Acknowledge
              </Button>
              <Button variant="primary" onClick={handleRetrainNow}>
                Retrain Now
              </Button>
            </div>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Real-time Time Series Data */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Real-time Data Drift</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData.groundTruth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Ground Truth" />
                  <Line type="monotone" dataKey="value" data={timeSeriesData.inputData} stroke="#8884d8" name="Input Data" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Model Drift Chart */}
          <Card className="mb-8">
          <CardHeader>
            <CardTitle>Model Drift</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={modelDriftData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" label={{ value: 'Categories', position: 'insideBottom', offset: -5 }} />
                <YAxis domain={['auto', 'auto']} label={{ value: 'Drift', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0.5} stroke="green" label="Ground Truth" />
                <Line type="monotone" dataKey="current" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="previous" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Accuracy: {performanceMetrics.accuracy}</li>
                <li>Precision: {performanceMetrics.precision}</li>
                <li>Recall: {performanceMetrics.recall}</li>
                <li>F1 Score: {performanceMetrics.f1Score}</li>
              </ul>
            </CardContent>
          </Card>

          {/* Feedback Form */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Submit Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:text-gray-200"
                placeholder="Enter your feedback..."
              />
              <Button variant="primary" onClick={handleFeedbackSubmit} className="mt-4">
                Submit
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeepfakeMonitorDashboard;
