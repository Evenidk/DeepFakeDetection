import Image from "next/image";
import DeepfakeDetectionWebsite from "./detect";
import React from "react";
import ReactDOM from "react-dom";
import { Switch } from "@/components/ui/switch";
import DeepGuardDashboard from "./dashui";
import DeepfakeMonitorDashboard from "./monitor";
import AiTrendsGraph from "@/components/AiTrendsGraph";
import TrendChart from "@/components/TrendChart";
import ProblemStatementPage from "./problemstatement";
export default function Home() {
  return (
    <>
    
      <DeepfakeDetectionWebsite />
      {/* <DeepGuardDashboard/> */}
      {/* <AiTrendsGraph /> */}
      {/* <div className="max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6">AI Trends Dashboard</h1>
      <TrendChart />
    </div> */}
    {/* <ProblemStatementPage /> */}
    
     
  
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 DeepGuard. All rights reserved.</p>
      </footer>
    </>
  );
}
