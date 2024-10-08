"use client";
import React, { useState, useEffect } from "react";
import {
  LogIn,
  LogOut,
  Shield,
  Upload,
  CheckCircle,
  AlertTriangle,
  Moon,
  Sun,
  Star,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AIMediaAnalysis from "./usecase";
import DeepfakeDetectionDashboard from "./dashboard";
import AIMediaAnalysisFeatures from "./advancefeatures";
import ContactForm from "./ContactForm";
import DeepfakeMonitorDashboard from "./monitor";
import LoginForm from "@/components/LoginForm";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import RegisterForm from "@/components/RegisterForm";
import useTheme from "./hooks/useTheme"; // Import the custom theme hook
import ProblemStatementPage from "./problemstatement";
import UploadAndAnalysis from "./UploadAndAnalysis";

const DeepfakeDetectionWebsite = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [detectionResult, setDetectionResult] = useState<"authentic" | "deepfake" | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data: session } = useSession(); // Get session data (NextAuth.js)
  const { theme, toggleTheme } = useTheme(); // Use the custom theme hook

  type AnalysisData = {
    confidence: number;
    type: string;
    timeSeriesData: { time: number; authenticity: number }[];
    impactData: { name: string; value: number }[];
  };

  useEffect(() => {
    if (detectionResult) {
      setTimeout(() => {
        setAnalysisData({
          confidence: Math.random() * 100,
          type: ["Face Swap", "Voice Cloning", "Full Body Manipulation"][Math.floor(Math.random() * 3)],
          timeSeriesData: Array.from({ length: 10 }, (_, i) => ({
            time: i,
            authenticity: Math.random() * 100,
          })),
          impactData: [
            { name: "Media", value: Math.random() * 100 },
            { name: "Politics", value: Math.random() * 100 },
            { name: "Finance", value: Math.random() * 100 },
            { name: "Education", value: Math.random() * 100 },
          ],
        });
      }, 1500);
    }
  }, [detectionResult]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setUploadedFile(file);
      setTimeout(() => {
        setDetectionResult(Math.random() > 0.5 ? "authentic" : "deepfake");
      }, 2000);
    }
  };

  const handleGoogleLogin = () => {
    setTimeout(() => {
      setIsLoggedIn(true);
      setActiveSection("home");
    }, 1000);
  };

  const renderHome = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-300 to-white text-center p-4"
    >
      <motion.h1 initial={{ y: -50 }} animate={{ y: 0 }} className="text-5xl font-bold mb-4">
        Deepfake Detection for Digital Integrity
      </motion.h1>
      <motion.p initial={{ y: 50 }} animate={{ y: 0 }} className="text-2xl mb-8">
        Protect your digital content with our state-of-the-art deepfake detection technology
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
        onClick={() => setActiveSection("upload")}
      >
        Start Detection
      </motion.button>
    </motion.div>
  );

  const Navbar = () => (
    <motion.nav initial={{ y: -50 }} animate={{ y: 0 }} className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">DeepGuard</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {["home", "Problem Statement", "upload", "Dashboard", "Media Analysis", "Model Monitoring"].map(
                (section) => (
                  <motion.button
                    key={section}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSection(section)}
                    className={`${
                      activeSection === section
                        ? "border-blue-500 text-gray-900 dark:text-white"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium capitalize`}
                  >
                    {section}
                  </motion.button>
                )
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="text-gray-800 dark:text-white"
            >
              {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
            </motion.button>
            {session || isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signOut()}
                className="flex items-center text-sm font-medium text-gray-700 dark:text-white"
              >
                <LogOut className="mr-1" size={18} />
                Logout
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection("login")}
                className="flex items-center text-sm font-medium text-gray-700 dark:text-white"
              >
                <LogIn className="mr-1" size={18} />
                Login / Register
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-grow"
        >
          {activeSection === "home" && renderHome()}
          {activeSection === "Problem Statement" && <ProblemStatementPage />}
          {/* {activeSection === "upload" && (() => {
            window.location.href = "http://localhost:5000/index.html";
            return null;
          })()} */}
          {activeSection === "upload" && <UploadAndAnalysis />}
          {activeSection === "Dashboard" && <DeepfakeDetectionDashboard />}
          {activeSection === "Media Analysis" && <AIMediaAnalysisFeatures />}
          {activeSection === "Model Monitoring" && <DeepfakeMonitorDashboard />}
          {activeSection === "login" && <LoginForm />}
          {activeSection === "register" && <RegisterForm />}
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default DeepfakeDetectionWebsite;
