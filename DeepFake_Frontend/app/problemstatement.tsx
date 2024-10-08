"use client";
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LucideShieldCheck, LucideAlertTriangle, LucideBarChart4, LucideDollarSign , AlertCircle} from 'lucide-react'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ProblemStatementPage = () => {
  const [fraudStats, setFraudStats] = useState(null);
  const [detectionRate, setDetectionRate] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      // Simulating real-time data fetching
      const newStats = {
        preventedLosses: Math.floor(Math.random() * 10000000),
        fraudTypeBreakdown: [
          { name: 'Voice Deepfake', value: Math.random() * 40 },
          { name: 'Video Impersonation', value: Math.random() * 30 },
          { name: 'Synthetic ID', value: Math.random() * 20 },
          { name: 'Other', value: Math.random() * 10 }
        ],
        weeklyAttempts: Array.from({ length: 7 }, (_, i) => ({
          day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
          attempts: Math.floor(Math.random() * 100)
        })),
        channelVulnerability: [
          { channel: 'Online Banking', risk: Math.random() * 20 + 60 },
          { channel: 'Mobile App', risk: Math.random() * 20 + 40 },
          { channel: 'Phone Banking', risk: Math.random() * 20 + 70 },
          { channel: 'In-Person', risk: Math.random() * 20 + 20 }
        ]
      };
      setFraudStats(newStats);
      setDetectionRate(prev => (prev + Math.random() * 5) % 100);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (!fraudStats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">DeepGuard: Protecting Financial Institutions from Deepfake Fraud</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">The Deepfake Threat in Banking</h2>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Real-Time Fraud Prevention Meter</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={detectionRate} className="w-full h-4 mb-2" />
            <p className="text-center">Current Deepfake Detection Rate: {detectionRate.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <p className="mb-4">
          Deepfakes pose a significant threat to the banking sector, enabling sophisticated fraud attempts 
          that can bypass traditional security measures. These AI-generated synthetic media can be used for 
          identity theft, account takeover, and social engineering attacks, putting both financial institutions 
          and their customers at risk.
        </p>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Critical Security Alert</AlertTitle>
          <AlertDescription>
            Deepfake-enabled fraud attempts are on the rise. Protect your institution with DeepGuard.
          </AlertDescription>
        </Alert>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">DeepGuard: Your Financial Firewall</h2>
        <p className="mb-4">
          DeepGuard is a cutting-edge solution designed to protect financial institutions from deepfake-enabled fraud. 
          By leveraging advanced AI and multi-factor authentication, we provide robust, real-time detection across all digital channels.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LucideShieldCheck className="mr-2" /> Multi-Channel Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Secures online banking, mobile apps, phone banking, and in-person transactions against deepfake attempts.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LucideAlertTriangle className="mr-2" /> Real-Time Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Instant notifications for suspicious activities, allowing immediate response to potential threats.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LucideBarChart4 className="mr-2" /> Fraud Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Comprehensive dashboards and reports for tracking fraud patterns and improving security measures.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LucideDollarSign className="mr-2" /> Loss Prevention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Significantly reduce financial losses due to deepfake-enabled fraud attempts.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Fraud Prevention Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card>
            <CardHeader>
              <CardTitle>Prevented Losses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center mb-2">${fraudStats.preventedLosses.toLocaleString()}</div>
              <p className="text-center text-sm text-muted-foreground">Potential losses prevented in the last 24 hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fraud Type Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fraudStats.fraudTypeBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {fraudStats.fraudTypeBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Fraud Attempts</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fraudStats.weeklyAttempts}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="attempts" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Channel Vulnerability Assessment</h2>
        <Card>
          <CardHeader>
            <CardTitle>Deepfake Risk by Banking Channel</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fraudStats.channelVulnerability}>
                <XAxis dataKey="channel" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="risk" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why Choose DeepGuard for Your Financial Institution</h2>
        <p className="mb-4">
          DeepGuard is tailored to meet the unique security challenges faced by banks and financial services. 
          Our solution integrates seamlessly with existing security infrastructure, providing an additional 
          layer of protection against the most sophisticated deepfake fraud attempts.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge>AI-Powered Detection</Badge>
          <Badge>Regulatory Compliance</Badge>
          <Badge>Customer Trust</Badge>
          <Badge>Fraud Prevention</Badge>
          <Badge>Multi-Factor Authentication</Badge>
        </div>
      </section>
    </div>
  );
};

export default ProblemStatementPage;