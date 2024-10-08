// LandingPage.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-300 to-white text-center p-4"
    >
      <motion.h1 initial={{ y: -50 }} animate={{ y: 0 }} className="text-5xl font-bold mb-4">
        Welcome to DeepGuard
      </motion.h1>
      <motion.p initial={{ y: 50 }} animate={{ y: 0 }} className="text-2xl mb-8">
        Protecting digital integrity with advanced deepfake detection
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
        onClick={onGetStarted}
      >
        Learn More
      </motion.button>
    </motion.div>
  );
};

export default LandingPage;