import React, { useState } from 'react';
import { Star, Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from "../assets/logo.png";
import first from "../assets/landingpage/first.png";
import second from "../assets/landingpage/second.png";
import leftone from "../assets/landingpage/l1.png";
import lefttwo from "../assets/landingpage/l2.png";
import rightone from "../assets/landingpage/r1.png";
import righttwo from "../assets/landingpage/r2.png";
import { FaInstagram, FaGithub, FaFacebook } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-full bg-[#E1D2F9]">
      {/* Header Section */}
      <header className="relative bg-gradient-to-r from-pink-100 to-purple-100">
        {/* Top Section: Logo and Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-6">
            {/* Logo */}
            <img 
            src={Logo}
            alt="XhaleFit Logo" 
            className="h-20 w-auto"
            />
            {/* Join Button */}
            <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
            >
                Join Now!
            </button>
        </div>

        {/* Bottom Section: Full-width Image */}
        <div className="w-full">
            <img 
            src={first}
            alt="Wellness Treatment" 
            className="w-full h-auto object-cover"
            />
        </div>
      </header>


      {/* About Section */}
        <section className="py-0 m-0 bg-[#E1D2F9]">
        <div className="w-full flex flex-col md:flex-row m-0 p-0">
            {/* Left Content: Text & Button */}
            <div className="md:w-1/2 m-0 p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 ml-14">About XhaleFit</h1>
            <p className="text-gray-600 mb-8 ml-14">
                XhaleFit is a fitness tracking system designed to offer personalized fitness experiences. 
                It allows users and trainers to sign up, create customizable rehabilitation plans, 
                and organize workouts with monthly and weekly planners. The system includes a training diary, 
                session feedback, and ratings, along with reminder notifications to keep users on track with their goals.
                Breathe. Move. Thrive. That's XhaleFit.
            </p>
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 ml-14">Vision of XhaleFit</h1>
            <p className="text-gray-600 mb-8 ml-14">
                To empower individuals in achieving optimal health and wellness through personalized fitness journeys, 
                seamless trainer collaboration, and innovative tracking tools, fostering a supportive community that 
                encourages continuous growth and well-being.
            </p>
            {/* Join Button */}
            <div className="flex justify-center md:justify-end mt-8">
                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
                >
                    Join Now!
                </button>
            </div>

            </div>
            
            {/* Right Content: Image */}
            <div className="md:w-1/2 m-0 p-0">
            <img 
                src={second}
                alt="Wellness" 
                className="w-full h-130 object-cover"
            />
            </div>
        </div>
        </section>

        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mt-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">XhaleFit Benefits</h1>
        <p className="text-gray-600 mb-8">
            XhaleFit offers a personalized and comprehensive approach to fitness, combining customized plans, 
            expert support, and seamless tracking tools. Designed to keep users motivated and on track, 
            XhaleFit empowers individuals to achieve their wellness goals with ease and efficiency.
        </p>
        </div>

        {/* Benefits Section */}
        <section className="w-full mt-15 px-4">
        {/* First Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 lg:flex-nowrap">
            <div className="w-full sm:w-1/2 lg:w-1/4">
            <img
                src={leftone}
                alt="Wellness Treatment"
                className="w-full h-60 sm:h-80 object-cover"
            />
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 text-center lg:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Personalized Planning & Tracking
            </h3>
            <p className="text-gray-600">
                Customizable rehabilitation plans, monthly and weekly planners,
                and a training diary help users stay organized and track progress.
            </p>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 text-center lg:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Session Insights & Engagement
            </h3>
            <p className="text-gray-600">
                Feedback, ratings, and session reviews provide users with insights for continuous improvement.
            </p>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4">
            <img
                src={rightone}
                alt="Wellness Treatment"
                className="w-full h-60 sm:h-80 object-cover"
            />
            </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-14 lg:flex-nowrap">
            <div className="w-full sm:w-1/2 lg:w-1/4">
            <img
                src={lefttwo}
                alt="Wellness Treatment"
                className="w-full h-60 sm:h-80 object-cover"
            />
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 text-center lg:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Easy Access & Onboarding
            </h3>
            <p className="text-gray-600">
                Smooth signup process for both users and trainers, ensuring a hassle-free start.
            </p>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 text-center lg:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Reminders & Notifications
            </h3>
            <p className="text-gray-600">
                Automated alerts keep users motivated and consistent with their fitness routines.
            </p>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/4">
            <img
                src={righttwo}
                alt="Wellness Treatment"
                className="w-full h-60 sm:h-80 object-cover"
            />
            </div>
        </div>
        </section>






      {/* Testimonials Section */}
      <section className="py-16 ">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        What our customers think about us
      </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#D2C8C7] p-4 rounded-2xl">
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((testimonial) => (
              <div 
                key={testimonial} 
                className="bg-gray-50 p-6 rounded-lg text-center"
              >
                <div className="flex justify-center text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  Great service and amazing results! Highly recommend.
                </p>
                <div className="flex justify-center space-x-4">
                  <Facebook className="text-gray-600 hover:text-blue-600" />
                  <Instagram className="text-gray-600 hover:text-pink-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative w-full px-0 sm:px-2 lg:px-4 py-4">
        <div className="bg-[#D9D9D9] rounded-3xl w-full max-w-screen-xl mx-auto p-3 md:p-0 lg:p-8">
            {/* Left side */}
            <div className="flex items-center space-x-4">
            <div className="relative w-full">
                <input
                type="text"
                placeholder="Drop your comment"
                className="w-full md:w-96 px-4 py-2 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                Send
                </button>
            </div>
            </div>
        </div>
      </div>


      <section className="bg-[#ffc9c9] py-16">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          CONTACT US
        </h2>
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-3 mt-3">
          <a href="#" className="text-gray-600 hover:text-pink-500 text-3xl">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500 text-3xl">
            <FaFacebook />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 text-3xl">
            <FaGithub />
          </a>
        </div>
        <p className="text-lg text-center text-gray-600 mb-6 mt-6">
          Please submit your enquiry below.
        </p>

        {/* Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 font-medium">Your Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-medium">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium">Your Message</label>
            <textarea 
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 h-40"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300">
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2025 XhaleFit. All Rights Reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-300">About</a>
            <a href="#" className="hover:text-blue-300">Services</a>
            <a href="#" className="hover:text-blue-300">Privacy Policy</a>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Facebook className="hover:text-blue-500 cursor-pointer" />
            <Instagram className="hover:text-pink-500 cursor-pointer" />
            <Twitter className="hover:text-blue-400 cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;