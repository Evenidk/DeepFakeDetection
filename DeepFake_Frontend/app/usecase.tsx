"use client";
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Image, FileText, TrendingUp, AlertTriangle } from 'lucide-react';

const featureData = [
  { name: 'Image Enhancement', value: 80, icon: Image },
  { name: 'Text Analysis', value: 65, icon: FileText },
  { name: 'Trend Prediction', value: 50, icon: TrendingUp },
  { name: 'Fake News Detection', value: 70, icon: AlertTriangle },
];

const FeatureCard = ({ title, description, icon: Icon }) => (
  <Card className="w-full mb-4">
    <CardContent className="flex items-center p-4">
      <Icon className="h-8 w-8 mr-4 text-blue-500" />
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-m text-black-600">{description}</p>
      </div>
    </CardContent>
  </Card>
);

const FeatureChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={featureData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#3b82f6" />
    </BarChart>
  </ResponsiveContainer>
);

const AIMediaAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Card className="w-full max-w-5xl mx-auto ">
      <CardHeader>
        <h2 className="text-3xl font-bold text-center">AI in Media Analysis: Broader Use Cases</h2>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="mb-4">
              While our core focus is on deepfake detection, AI technologies have broader applications in media analysis. 
              These out-of-scope features represent potential future expansions or related areas of interest.
            </p>
            <Button onClick={() => setActiveTab('features')}>Explore Features</Button>
          </TabsContent>
          <TabsContent value="features">
            {featureData.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.name}
                description="This feature showcases the potential of AI in various aspects of media analysis."
                icon={feature.icon}
              />
            ))}
          </TabsContent>
          <TabsContent value="stats">
            <h3 className="text-lg font-semibold mb-2">Feature Development Progress</h3>
            <FeatureChart />
            <p className="mt-4 text-sm text-gray-600">
              This chart represents the current development progress of various AI media analysis features. 
              While these are out of our current scope, they illustrate the potential future directions of the technology.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIMediaAnalysis;