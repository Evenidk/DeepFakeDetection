"use client";
import React from 'react';

interface ProgressBarProps {
  progress: number; // expects a percentage value between 0 and 100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-300 rounded-full h-4">
      <div
        className="bg-blue-600 h-4 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
