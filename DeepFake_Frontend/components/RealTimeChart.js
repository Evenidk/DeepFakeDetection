import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

// NewsAPI and ShodanAPI chart component
const RealTimeChart = () => {
  const [newsData, setNewsData] = useState([]);
  const [cyberData, setCyberData] = useState([]);

  // Fetch real-time data from NewsAPI
  const fetchNewsData = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=deepfake&sortBy=publishedAt&apiKey=46108e403db24735a81d5a7654b31c3f`
      );
      const articles = response.data.articles.map((article, index) => ({
        name: article.title, // Display article title on X-axis
        mentions: Math.floor(Math.random() * 100) + 1, // Simulate mentions count
      }));
      setNewsData(articles);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  // Fetch real-time data from Shodan API (cybersecurity trends)
  const fetchCyberData = async () => {
    try {
      const response = await axios.get(
        `https://api.shodan.io/shodan/host/search?key=nYeXB3VIIn1oAIehcGJhCXjTE2B9qk9a&query=deepfake`
      );
      const results = response.data.matches.map((match, index) => ({
        name: `Match ${index + 1}`,
        threats: Math.floor(Math.random() * 100) + 1, // Simulate threat score
      }));
      setCyberData(results);
    } catch (error) {
      console.error('Error fetching cyber data:', error);
    }
  };

  useEffect(() => {
    fetchNewsData(); // Fetch NewsAPI data on component mount
    fetchCyberData(); // Fetch ShodanAPI data on component mount
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Real-Time Data Trends (NewsAPI & Shodan)</h2>
     
      {/* Displaying the NewsAPI Data */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={newsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="mentions" stroke="#8884d8" name="News Mentions" />
        </LineChart>
      </ResponsiveContainer>
      <p>The graph displays trends in the number of mentions of "deepfake" in news articles fetched in real-time.
The X-axis labels show the headlines (or publication dates) of the articles, while the Y-axis reflects the number of mentions (simulated).
This makes it easy to see how "deepfake" is trending in the news over time or across different articles.</p>

      {/* <h3 className="text-xl font-bold mt-6">Cybersecurity Threats (Shodan API)</h3> */}

      {/* Displaying the ShodanAPI Data */}
      {/* 
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={cyberData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="threats" stroke="#82ca9d" name="Threat Level" />
        </LineChart>
      </ResponsiveContainer> */}
    </div>
  );
};

export default RealTimeChart;




// The graph displays trends in the number of mentions of "deepfake" in news articles fetched in real-time.
// The X-axis labels show the headlines (or publication dates) of the articles, while the Y-axis reflects the number of mentions (simulated).
// This makes it easy to see how "deepfake" is trending in the news over time or across different articles.