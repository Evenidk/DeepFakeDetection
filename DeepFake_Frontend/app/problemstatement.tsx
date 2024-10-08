"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideAlertTriangle, LucideBarChart4, LucideShieldCheck, LucideDollarSign, AlertCircle } from 'lucide-react';
import RealTimeChart from '@/components/RealTimeChart';
import TrendChart from '@/components/TrendChart';

const ProblemStatementPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-5">
      
      {/* Hero Section */}
      <section className="mb-10 text-center">
        {/* <img src="/deepfake.png" alt="Deepfake Illustration" className="w-full h-auto rounded-lg shadow-lg mb-12" /> */}
        <h1 className="text-4xl font-extrabold text-black-400 mb-6">DeepGuard: Protecting Against Deepfake Fraud</h1>
        <p className="text-2xl text-black-400">Advanced security solutions for the digital age.</p>
      </section>

      {/* Problem Statement Section */}
      <section className="bg-gray-50 p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Problem Statement</h2>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
        Deepfake technology makes it difficult to distinguish between real and manipulated media, threatening the credibility of digital information. The proliferation of deepfakes can lead to misinformation, identity theft, and other malicious activities that undermine trust in digital content. As deepfakes become more sophisticated, there is an urgent need for effective tools to detect them in images and videos accurately.
        </p>
        {/* <Alert className="border-l-4 border-red-500 bg-red-50 text-red-900">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <AlertTitle className="text-2xl font-semibold">Security Threat</AlertTitle>
          <AlertDescription className="text-xl">
            Deepfake attacks can lead to massive financial losses and erode trust in security systems. Financial institutions must be equipped with state-of-the-art defenses.
          </AlertDescription>
        </Alert> */}
      </section>

      {/* About Deepfake Section
      <section className="bg-gray-100 p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">About Deepfake Technology</h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          Deepfake technology uses artificial intelligence to generate highly realistic media that can simulate people’s appearances, voices, and behaviors. 
          While this technology has positive uses in entertainment and content creation, it also poses significant risks, such as enabling fraud and deception in critical sectors like finance.
        </p>
      </section> */}

      {/* Real-Time Deepfake Trends */}
      <section className="space-y-16">
        <div className="bg-white p-10 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Deepfake Detection Trends</h1>
          <p className="text-xl text-gray-600 mb-8">Real-time trends from public APIs (NewsAPI and Shodan)</p>
          <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
            <RealTimeChart />
          </div>
        </div>

        {/* <div className="bg-white p-10 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">AI Trends Dashboard</h1>
          <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
            <TrendChart/>
          </div>
        </div> */}
      </section>



      {/* Solution Section */}
      <section className="bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Solution: DeepGuard</h2>
        <p className="text-xl text-gray-600 mb-10">
        Our solution uses advanced algorithms and pre-trained models to analyze facial movements and identify deepfake indicators in images and videos. It will provide a confidence score indicating the likelihood of content being a deepfake, tampering with timeline graphs. The user-friendly interface will allow users to upload files easily, view analysis results with visual aids, and ensure secure processing to protect user privacy.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <LucideShieldCheck className="mr-3 text-green-600" /> Multi-Channel Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-lg">
            DeepGuard safeguards Video KYC and Banking Telephony.          </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <LucideAlertTriangle className="mr-3 text-yellow-600" /> Real-Time Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-lg">
            The model predicts every frame in milliseconds, and alerts the administrator as soon as detection is completed.            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <LucideBarChart4 className="mr-3 text-blue-600" /> Advanced Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-lg">
            Advanced analytics provide in-depth insights into fake news detection, shap experience monitoring, and image enhancement enabling high accuracy with better performance.            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <LucideDollarSign className="mr-3 text-green-600" /> Multi-device Support
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-lg">
            Responsive and portable Solution, designed to support multiple devices like desktops, tablets and phones providing a better user experience.            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ProblemStatementPage;