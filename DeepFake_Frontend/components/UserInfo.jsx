"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Key, Shield, Bitcoin, Camera } from 'lucide-react';

export default function UserInfo() {
  const { data: session } = useSession();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [formData, setFormData] = useState({
    firstName: session?.user?.name || "Xeno",
    lastName: session?.user?.lastName || "",
    email: session?.user?.email || "peter@email.com",
    gender: session?.user?.gender || "Male",
    profileImage: session?.user?.profileImage || "/default-profile.png",
    apiKey: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    walletAddress: "0x1234567890123456789012345678901234567890",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setFormData({ ...formData, profileImage: upload.target?.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    // Save logic here (update user info in database)
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to initial values
    setFormData({
      ...formData,
      firstName: session?.user?.name || "Xeno",
      lastName: session?.user?.lastName || "",
      email: session?.user?.email || "peter@email.com",
      gender: session?.user?.gender || "Male",
      profileImage: session?.user?.profileImage || "/default-profile.png",
    });
  };

  const regenerateApiKey = () => {
    // In a real application, this would make a call to your backend
    const newApiKey = 'new-' + Math.random().toString(36).substr(2, 32);
    setFormData({ ...formData, apiKey: newApiKey });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">User Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Image */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative w-48 h-48 mx-auto mb-4">
              <img
                src={formData.profileImage}
                alt="Profile Image"
                className="w-full h-full object-cover rounded-full"
              />
              {isEditing && (
                <label htmlFor="imageUpload" className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer shadow-lg">
                  <Camera className="h-6 w-6 text-gray-600" />
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <h2 className="text-xl font-semibold text-center">{formData.firstName} {formData.lastName}</h2>
            <p className="text-gray-500 text-center">{formData.email}</p>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!isEditing ? (
                // Display User Info
                <>
                  <InfoItem icon={<User className="h-5 w-5" />} label="First Name" value={formData.firstName} />
                  <InfoItem icon={<User className="h-5 w-5" />} label="Last Name" value={formData.lastName} />
                  <InfoItem icon={<Shield className="h-5 w-5" />} label="Email" value={formData.email} />
                  <InfoItem icon={<User className="h-5 w-5" />} label="Gender" value={formData.gender} />
                </>
              ) : (
                // Edit User Info
                <>
                  <EditItem name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} />
                  <EditItem name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} />
                  <EditItem name="email" label="Email" value={formData.email} onChange={handleChange} type="email" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                      <option value="">--Select Gender--</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* API Key */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>API Key</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <Input
                type={showApiKey ? 'text' : 'password'}
                value={formData.apiKey}
                readOnly
                className="flex-grow"
              />
              <Button onClick={() => setShowApiKey(!showApiKey)}>
                {showApiKey ? 'Hide' : 'Show'}
              </Button>
              <Button onClick={regenerateApiKey}>Regenerate</Button>
            </div>
          </CardContent>
        </Card>

        {/* Blockchain Integration */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Blockchain Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Bitcoin className="h-5 w-5" />
              <Input value={formData.walletAddress} readOnly className="flex-grow" />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              This is your connected Ethereum wallet address. Use this for blockchain-related operations within our system.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-between">
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="space-x-4">
            <Button onClick={handleSave} variant="default">Save</Button>
            <Button onClick={handleCancel} variant="outline">Cancel</Button>
          </div>
        )}
        <Button onClick={() => signOut()} variant="destructive">Logout</Button>
      </div>
    </div>
  );
}

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span className="text-sm font-medium text-gray-500">{label}:</span>
    <span className="text-sm text-gray-900">{value}</span>
  </div>
);

const EditItem = ({ name, label, value, onChange, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <Input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full"
    />
  </div>
);
