import { useState } from 'react';
import axios from 'axios';

const NewsReliabilityChecker = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const API_URL = 'https://api.newscatcherapi.com/v2/search';
    const headers = {
      'x-api-key': '932f3960f7aa42abba7658d9282912f0', // Replace with your NewsCatcher API key
    };

    try {
      const response = await axios.get(API_URL, {
        params: {
          q: inputText,
          lang: 'en',
        },
        headers
      });

      const articles = response.data.articles || [];
      if (articles.length > 0) {
        const reliability = articles[0].rank.reliability; // Assuming rank includes reliability
        setResult(reliability > 0.5 ? 'Reliable Source' : 'Unreliable Source');
      } else {
        setResult("No credible sources found.");
      }
    } catch (error) {
      console.error("Error analyzing the text:", error);
      setResult("Error analyzing the text. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold text-center mb-6">News Credibility Checker</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter news headline or article text..."
          rows="6"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 bg-blue-500 text-white font-semibold rounded-lg ${loading ? 'bg-blue-300' : 'hover:bg-blue-600'} transition-colors duration-300`}
        >
          {loading ? "Analyzing..." : "Check News"}
        </button>
      </form>
      {result && (
        <div className={`mt-6 p-4 rounded-lg text-center font-semibold ${result === 'Unreliable Source' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
          {result}
        </div>
      )}
    </div>
  );
};

export default NewsReliabilityChecker;
