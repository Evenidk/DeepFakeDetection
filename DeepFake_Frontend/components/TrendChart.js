"use client";  // Mark this as a client component

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrendChart = ({ title }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Top 5 AI Topics',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  // AI Topics to query from NewsAPI
  const topics = [
    'AI in Healthcare',
    'Generative AI',
    'Deep Learning',
    'Natural Language Processing',
    'Machine Learning',
    'Agentic AI',
    'AI in Construction',
    'Computer Vision',
    'Ethical AI',
  ];

  // Fetch news count for each topic
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY; // Get API key from .env.local

        // Fetch the news count for each topic
        const trendCounts = await Promise.all(
          topics.map(async (topic) => {
            const response = await axios.get(
              `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&apiKey=${apiKey}`
            );
            return { topic, count: response.data.totalResults };
          })
        );

        // Sort topics by number of results and limit to top 5
        const top5Trends = trendCounts
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        // Set the labels and data for the chart
        setChartData({
          labels: top5Trends.map(item => item.topic),
          datasets: [
            {
              label: 'Top 5 AI Topics',
              data: top5Trends.map(item => item.count),
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching trend data:', error);
      }
    };

    fetchData();
  }, [title]);

  return (
    <div>
      {/* <h2>{title || 'Top 5 Trending Topics in AI'}</h2> */}
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false, // Hide default legend
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const topic = tooltipItem.label;
                  const count = tooltipItem.raw;
                  return `${count} articles on ${topic}`;
                },
              },
            },
            title: {
              display: true,
              text: 'Top 5 AI Topics by Number of Articles',
            },
          },
        }}
      />
    </div>
  );
};

export default TrendChart;
