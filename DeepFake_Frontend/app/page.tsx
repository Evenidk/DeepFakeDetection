import Image from "next/image";
import DeepfakeDetectionWebsite from "./detect";
import React from "react";
import ReactDOM from "react-dom";
import { Switch } from "@/components/ui/switch";
import DeepGuardDashboard from "./dashui";
import DeepfakeMonitorDashboard from "./monitor";
export default function Home() {
  return (
    <>
    
      <DeepfakeDetectionWebsite />
      <DeepGuardDashboard/>
     
     
  
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 DeepGuard. All rights reserved.</p>
      </footer>
    </>
  );
}
