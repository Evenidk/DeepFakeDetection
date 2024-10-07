"use client";
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { AlertCircle } from 'lucide-react';
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
  <div className={`shadow rounded-lg p-4 bg-white ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-2">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold text-gray-800">{children}</h2>
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
    ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
    : variant === 'secondary'
    ? "bg-gray-600 text-white hover:bg-gray-700"
    : "bg-green-600 text-white hover:bg-green-700";

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </button>
  );
};

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
    <div>
      <div className="p-6 max-w-7xl mx-auto bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Deepfake Detection Model Monitoring</h1>
        </div>

        {alert && (
          <Alert variant="destructive" className="mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
              <div>
                <AlertTitle>Alert: Significant Model Drift Detected</AlertTitle>
                <AlertDescription>
                  The model is showing significant drift compared to ground truth values.
                  {retrainTime && (
                    <div className="text-sm mt-1">
                      Scheduled retrain at: {new Date(retrainTime).toLocaleTimeString()}.
                    </div>
                  )}
                </AlertDescription>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" onClick={handleAcknowledgeAlert} className="mr-2">Acknowledge</Button>
              <Button variant="primary" onClick={handleRetrainNow}>Retrain Now</Button>
            </div>
          </Alert>
        )}

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{performanceMetrics.accuracy}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Precision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{performanceMetrics.precision}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recall</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{performanceMetrics.recall}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>F1 Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{performanceMetrics.f1Score}</p>
            </CardContent>
          </Card>
        </div>

        {/* Confusion Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Confusion Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th></th>
                    <th>Predicted Positive</th>
                    <th>Predicted Negative</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Actual Positive</td>
                    <td>{performanceMetrics.confusionMatrix.truePositive}</td>
                    <td>{performanceMetrics.confusionMatrix.falseNegative}</td>
                  </tr>
                  <tr>
                    <td>Actual Negative</td>
                    <td>{performanceMetrics.confusionMatrix.falsePositive}</td>
                    <td>{performanceMetrics.confusionMatrix.trueNegative}</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Anomaly Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={anomalyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" tick={false} />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#FF0000" dot={false} />
                  <ReferenceLine y={1} label="Anomaly Threshold" stroke="red" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Model Drift Comparison */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Model Drift Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={modelDriftData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" fill="#8884d8" />
                  <Bar dataKey="previous" fill="#82ca9d" />
                  <Bar dataKey="groundTruth" fill="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Model Performance Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Model Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="trendValue" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{recommendations}</p>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        <Card>
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full border-gray-300 rounded-md mb-2 p-2"
              rows={4}
              placeholder="Enter your feedback"
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
            />
            <Button variant="primary" onClick={handleFeedbackSubmit}>Submit Feedback</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeepfakeMonitorDashboard;
