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

const generateTrendData = () => (
  Array.from({ length: 10 }, (_, i) => ({
    timestamp: `T-${10 - i}`,
    trendValue: 0.5 // Initialize with neutral trend
  }))
);

const generatePerformanceMetrics = () => ({
  accuracy: "0.90", // Initialize with fixed value
  precision: "0.85",
  recall: "0.88",
  f1Score: "0.86",
  confusionMatrix: {
    truePositive: 50,
    falsePositive: 10,
    trueNegative: 45,
    falseNegative: 5
  }
});

// Simulated Recommendations based on trends
const getRecommendations = (trendData) => {
  // Simple logic: if trendValue > 0.7 in more than 3 trends, recommend retraining
  const highTrends = trendData.filter(trend => trend.trendValue > 0.7);
  if (highTrends.length > 3) {
    return "High trend activity detected. It's recommended to consider retraining the model to maintain accuracy.";
  }
  return "Current trends are stable. Continue monitoring.";
};

// Simulated Anomaly Detection Data
const generateAnomalyData = () => (
  Array.from({ length: 20 }, (_, i) => ({
    timestamp: new Date(Date.now() - (20 - i) * 60000).toISOString(),
    value: 0 // Initialize without anomalies
  }))
);

const DeepfakeMonitorDashboard = () => {
  // Initialize state with consistent data
  const [timeSeriesData, setTimeSeriesData] = useState(generateInitialTimeSeriesData());
  const [modelDriftData, setModelDriftData] = useState(generateComparisonData());
  const [trendData, setTrendData] = useState(generateTrendData());
  const [performanceMetrics, setPerformanceMetrics] = useState(generatePerformanceMetrics());
  const [anomalyData, setAnomalyData] = useState(generateAnomalyData());
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

      // Update Trend Data
      setTrendData(prevData => {
        const updatedTrend = prevData.map((item, index) => ({
          timestamp: `T-${10 - index}`,
          trendValue: Math.random()
        }));
        return updatedTrend;
      });

      // Update Performance Metrics
      setPerformanceMetrics(generatePerformanceMetrics());

      // Update Anomaly Data
      setAnomalyData(prevData => {
        const newDataPoint = {
          timestamp: new Date().toISOString(),
          value: Math.random() > 0.95 ? 1 : 0 // 5% chance of anomaly
        };
        return [...prevData.slice(1), newDataPoint];
      });

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

  const recommendations = getRecommendations(trendData);

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Summary Card */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Model Health</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 dark:text-gray-300"><strong>Current Drift:</strong> {alert ? 'High' : 'Normal'}</p>
              <p className="text-lg text-gray-700 dark:text-gray-300"><strong>Retrain By:</strong> {retrainTime ? retrainTime.toLocaleTimeString() : 'N/A'}</p>
              {!alert && (
                <Button variant="outline" className="mt-4" onClick={handleAcknowledgeAlert}>
                  Acknowledge Alert
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Trend Prediction Chart */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Trend Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="trendValue" stroke="#ff7300" name="Trend Value" />
                </LineChart>
              </ResponsiveContainer>
              <p className="mt-4 text-gray-700 dark:text-gray-300">{recommendations}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Input Data vs Ground Truth */}
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Data Drift</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip />
                  <Legend />
                  <Line dataKey="value" type="monotone" data={timeSeriesData.groundTruth} stroke="#82ca9d" name="Ground Truth" />
                  <Line dataKey="value" type="monotone" data={timeSeriesData.inputData} stroke="#8884d8" name="Input Data" />
                  <ReferenceLine y={0.5} stroke="red" strokeDasharray="3 3" label="Threshold" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Model Drift Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Model Drift Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={modelDriftData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" fill="#8884d8" name="Current" />
                  <Bar dataKey="previous" fill="#82ca9d" name="Previous" />
                  <Bar dataKey="groundTruth" fill="#ffc658" name="Ground Truth" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 dark:text-gray-300"><strong>Accuracy:</strong> {performanceMetrics.accuracy}</p>
              <p className="text-lg text-gray-700 dark:text-gray-300"><strong>Precision:</strong> {performanceMetrics.precision}</p>
              <p className="text-lg text-gray-700 dark:text-gray-300"><strong>Recall:</strong> {performanceMetrics.recall}</p>
              <p className="text-lg text-gray-700 dark:text-gray-300"><strong>F1 Score:</strong> {performanceMetrics.f1Score}</p>
            </CardContent>
          </Card>

          {/* Confusion Matrix */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Confusion Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border"> </th>
                      <th className="py-2 px-4 border">Predicted Positive</th>
                      <th className="py-2 px-4 border">Predicted Negative</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border">Actual Positive</td>
                      <td className="py-2 px-4 border">{performanceMetrics.confusionMatrix.truePositive}</td>
                      <td className="py-2 px-4 border">{performanceMetrics.confusionMatrix.falseNegative}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border">Actual Negative</td>
                      <td className="py-2 px-4 border">{performanceMetrics.confusionMatrix.falsePositive}</td>
                      <td className="py-2 px-4 border">{performanceMetrics.confusionMatrix.trueNegative}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Model Explainability */}
          <Card>
            <CardHeader>
              <CardTitle>Model Explainability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 dark:text-gray-300">SHAP or LIME explanations would be visualized here.</p>
              {/* Placeholder for SHAP/LIME Chart */}
              <div className="h-64 bg-gray-200 dark:bg-gray-600 flex justify-center items-center mt-4 rounded">
                <p className="text-gray-500 dark:text-gray-400">Explainability Chart Placeholder</p>
              </div>
              <Button variant="primary" className="mt-4" onClick={() => window.alert('Explainability Feature Coming Soon!')}>
                Generate Explanation
              </Button>
            </CardContent>
          </Card>

          {/* Anomaly Detection */}
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={anomalyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#ff7300" name="Anomaly" />
                </LineChart>
              </ResponsiveContainer>
              <Button variant="primary" className="mt-4" onClick={() => window.alert('Anomaly Detection Feature Coming Soon!')}>
                Analyze Anomalies
              </Button>
            </CardContent>
          </Card>

          {/* Recent Trends & Recommendations */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Trends & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700 dark:text-gray-300">{recommendations}</p>
              <Button variant="primary" onClick={handleRetrainNow}>
                Retrain Model Now
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Feedback Section */}
          <Card>
            <CardHeader>
              <CardTitle>User Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 dark:text-gray-300">Provide feedback on model predictions:</p>
              <textarea
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500"
                rows="4"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your feedback here..."
              ></textarea>
              <Button variant="secondary" className="mt-4" onClick={handleFeedbackSubmit}>
                Submit Feedback
              </Button>
            </CardContent>
          </Card>

          {/* Anomaly Detection Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 dark:text-gray-300">Insights based on detected anomalies:</p>
              <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300">
                {anomalyData.some(data => data.value === 1) ? (
                  <>
                    <li>Anomaly detected at {anomalyData.find(data => data.value === 1).timestamp}.</li>
                    <li>Investigate potential issues related to the detected anomaly.</li>
                  </>
                ) : (
                  <>
                    <li>No significant anomalies detected in the last interval.</li>
                    <li>System running within normal parameters.</li>
                    <li>Continue monitoring for any unusual activities.</li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeepfakeMonitorDashboard;
