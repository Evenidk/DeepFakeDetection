"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LucideAlertTriangle, LucideBarChart4, LucideShieldCheck, LucideDollarSign, AlertCircle } from 'lucide-react';
import RealTimeChart from '@/components/RealTimeChart';
import TrendChart from '@/components/TrendChart';

const ProblemStatementPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-20">
      
      {/* Hero Section */}
      <section className="mb-20 text-center">
        {/* <img src="/deepfake.png" alt="Deepfake Illustration" className="w-full h-auto rounded-lg shadow-lg mb-12" /> */}
        <h1 className="text-6xl font-extrabold text-gray-800 mb-6">DeepGuard: Protecting Against Deepfake Fraud</h1>
        <p className="text-2xl text-gray-600">Advanced security solutions for the digital age.</p>
      </section>

      {/* About Deepfake Section */}
      <section className="bg-gray-100 p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">About Deepfake Technology</h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          Deepfake technology uses artificial intelligence to generate highly realistic media that can simulate people’s appearances, voices, and behaviors. 
          While this technology has positive uses in entertainment and content creation, it also poses significant risks, such as enabling fraud and deception in critical sectors like finance.
        </p>
      </section>

      {/* Real-Time Deepfake Trends */}
      <section className="space-y-16">
        <div className="bg-white p-10 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Deepfake Detection Trends</h1>
          <p className="text-xl text-gray-600 mb-8">Real-time trends from public APIs (NewsAPI and Shodan)</p>
          <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
            <RealTimeChart />
          </div>
        </div>

        <div className="bg-white p-10 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">AI Trends Dashboard</h1>
          <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
            <TrendChart />
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="bg-gray-50 p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Problem Statement</h2>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Deepfakes present a growing threat in industries that rely on trust and authenticity, such as finance, media, and cybersecurity. 
          By manipulating voices, faces, and even entire videos, malicious actors can use deepfakes to steal identities, commit fraud, or deceive individuals and organizations on an unprecedented scale.
        </p>
        <Alert className="border-l-4 border-red-500 bg-red-50 text-red-900">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <AlertTitle className="text-2xl font-semibold">Security Threat</AlertTitle>
          <AlertDescription className="text-xl">
            Deepfake attacks can lead to massive financial losses and erode trust in security systems. Financial institutions must be equipped with state-of-the-art defenses.
          </AlertDescription>
        </Alert>
      </section>

      {/* Solution Section */}
      <section className="bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Solution: DeepGuard</h2>
        <p className="text-xl text-gray-600 mb-10">
          DeepGuard is a comprehensive defense solution against deepfake fraud. 
          By leveraging cutting-edge AI technologies and integrating them into real-time authentication processes, DeepGuard offers multi-channel protection across all digital platforms.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <LucideShieldCheck className="mr-3 text-green-600" /> Multi-Channel Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-lg">
              DeepGuard safeguards online banking, mobile apps, phone banking, and in-person transactions from deepfake attacks.
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <LucideAlertTriangle className="mr-3 text-yellow-600" /> Real-Time Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-lg">
              Immediate alerts for suspicious activity enable rapid response to potential threats, minimizing the damage caused by deepfake attacks.
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <LucideBarChart4 className="mr-3 text-blue-600" /> Advanced Fraud Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-lg">
              Real-time analytics provide in-depth insights into fraud trends, enabling better strategies and defense mechanisms.
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <LucideDollarSign className="mr-3 text-green-600" /> Financial Loss Prevention
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 text-lg">
              DeepGuard helps financial institutions prevent significant financial losses by detecting and stopping deepfake attacks in real time.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ProblemStatementPage;
