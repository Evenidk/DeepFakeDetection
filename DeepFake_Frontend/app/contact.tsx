"use-client";
import { useState } from "react";
import Head from "next/head";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Something went wrong!");
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
      setStatus("error");
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - Your Company</title>
      </Head>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Contact Us
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              We'd love to hear from you! Please fill out the form below.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm transition-shadow duration-300 shadow-sm hover:shadow-md"
                  placeholder="Your Name"
                />
              </div>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm transition-shadow duration-300 shadow-sm hover:shadow-md"
                  placeholder="Email Address"
                />
              </div>
              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="sr-only">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm transition-shadow duration-300 shadow-sm hover:shadow-md"
                  placeholder="Subject"
                />
              </div>
              {/* Message Field */}
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm transition-shadow duration-300 shadow-sm hover:shadow-md"
                  placeholder="Your Message"
                ></textarea>
              </div>
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <div className="text-green-500 text-center">Your message has been sent successfully!</div>
            )}
            {status === "error" && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={status === "sending"}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-all duration-300 ease-in-out ${
                  status === "sending"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg hover:shadow-2xl"
                }`}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
