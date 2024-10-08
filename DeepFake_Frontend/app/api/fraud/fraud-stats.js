// pages/api/fraud-stats.js

export default function handler(req, res) {
  // Generate randomized data
  const preventedLosses = Math.floor(Math.random() * 10000000) + 5000000; // $5,000,000 - $15,000,000
  const detectionRate = Math.floor(Math.random() * 100); // 0% - 100%

  const fraudTypeBreakdown = [
    { name: 'Voice Deepfake', value: Math.floor(Math.random() * 40) + 10 }, // 10 - 50%
    { name: 'Video Impersonation', value: Math.floor(Math.random() * 30) + 10 }, // 10 - 40%
    { name: 'Synthetic ID', value: Math.floor(Math.random() * 20) + 5 }, // 5 - 25%
    { name: 'Other', value: Math.floor(Math.random() * 10) + 1 }, // 1 - 10%
  ];

  const weeklyAttempts = [
    { day: 'Mon', attempts: Math.floor(Math.random() * 100) },
    { day: 'Tue', attempts: Math.floor(Math.random() * 100) },
    { day: 'Wed', attempts: Math.floor(Math.random() * 100) },
    { day: 'Thu', attempts: Math.floor(Math.random() * 100) },
    { day: 'Fri', attempts: Math.floor(Math.random() * 100) },
    { day: 'Sat', attempts: Math.floor(Math.random() * 100) },
    { day: 'Sun', attempts: Math.floor(Math.random() * 100) },
  ];

  const channelVulnerability = [
    { channel: 'Online Banking', risk: Math.floor(Math.random() * 20) + 60 }, // 60 - 80
    { channel: 'Mobile App', risk: Math.floor(Math.random() * 20) + 40 }, // 40 - 60
    { channel: 'Phone Banking', risk: Math.floor(Math.random() * 20) + 70 }, // 70 - 90
    { channel: 'In-Person', risk: Math.floor(Math.random() * 20) + 20 }, // 20 - 40
  ];

  res.status(200).json({
    preventedLosses,
    detectionRate,
    fraudTypeBreakdown,
    weeklyAttempts,
    channelVulnerability,
  });
}
