// pages/api/detect.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Send a POST request to the Python backend
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body), // Send the request body to the backend
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data from the backend');
        }
  
        const data = await response.json();
        res.status(200).json(data); // Return backend data to frontend
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  