'use client';  // This must be the first line in the component

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// TypeScript interface for the trend data
interface Trend {
  name: string;
  value: number;
}

const AiTrendsGraph: React.FC = () => {
  const [trendData, setTrendData] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch AI trends from the Google Trends API via RapidAPI
  const fetchTrends = async () => {
    try {
      const response = await axios.get(
        'https://google-trends8.p.rapidapi.com/trendings?region_code=US&hl=en-US',
        {
          headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',  // Fetch from environment variable
            'X-RapidAPI-Host': 'google-trends8.p.rapidapi.com',
          },
        }
      );

      console.log('API Response:', response.data);  // Log the response for debugging

      // Assuming the response structure contains a trendingSearches array
      const trends = response.data.trendingSearches;

      // Filter trends related to AI and map them to { name, value } format
      const aiTrends = trends
        .filter((trend: any) => trend.title.toLowerCase().includes('ai'))  // Adjust based on actual API response structure
        .map((trend: any) => ({
          name: trend.title,
          value: Math.floor(Math.random() * 100),  // Random popularity as an example
        }));

      setTrendData(aiTrends);
      setLoading(false);
    } catch (err: any) {
      // Log the full error details for better debugging
      console.error('Full Error:', err);
      console.error('Error Data:', err.response?.data);
      console.error('Error Status:', err.response?.status);
      console.error('Error Headers:', err.response?.headers);
      
      setError(err.message || 'Unknown error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">AI Trends in Google Search</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AiTrendsGraph;
