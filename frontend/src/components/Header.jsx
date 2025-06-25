import React, { useState } from 'react';
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/images/Logo.jpg";
import { useNavigate } from "react-router-dom";

const Header = ({ onProfileClick }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            {/* Header Section */}
            <header className="flex items-center py-4 md:py-6 w-full">
                {/* Logo */}
                <div className="flex items-center">
                    <img src={Logo} alt="XhaleFit Logo" className="w-32 md:w-40 lg:w-48" />
                </div>
                
                {/* Desktop Navigation - Centered */}
                <nav className="hidden md:flex flex-grow items-center justify-center gap-6 text-lg bg-white">
      <button 
        onClick={() => navigate('/dashboard')} 
        className="text-gray-600 hover:text-black bg-transparent border-none cursor-pointer"
      >
        Home
      </button>
      <button 
        onClick={() => navigate('/features')} 
        className="text-gray-600 hover:text-black bg-transparent border-none cursor-pointer"
      >
        Features
      </button>
      <button 
        onClick={() => navigate('/services')} 
        className="text-gray-600 hover:text-black bg-transparent border-none cursor-pointer"
      >
        Services
      </button>
      <button 
        onClick={() => navigate('/contact')} 
        className="text-gray-600 hover:text-black bg-transparent border-none cursor-pointer"
      >
        Contact
      </button>
      <button 
        onClick={() => navigate('/about')} 
        className="text-gray-600 hover:text-black bg-transparent border-none cursor-pointer"
      >
        About Us
      </button>
    </nav>
                
                {/* Right side icons */}
                <div className="flex items-center gap-4 md:gap-6 ml-auto">
                    {/* Bell Icon - Visible on all screens */}
                    <div className="relative">
                        <FaBell className="text-gray-600 text-xl md:text-2xl cursor-pointer hover:text-black" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            3
                        </span>
                    </div>
                    
                    {/* Profile Icon - Visible on all screens */}
                    <div 
                        onClick={onProfileClick} 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center">
                        <span className="text-sm md:text-lg text-white">P</span>
                    </div>
                    
                    {/* Mobile menu toggle - Only visible on mobile */}
                    <button onClick={toggleMobileMenu} className="md:hidden text-xl text-gray-600 ml-2">
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </header>
            
            {/* Mobile Navigation Menu - Only visible when toggled */}
            {mobileMenuOpen && (
                <nav className="md:hidden bg-white shadow-md py-2 rounded-lg mt-2 z-20">
                    <a href="#" className="block text-gray-600 hover:text-black p-3 border-b border-gray-100">Home</a>
                    <a href="#" className="block text-gray-600 hover:text-black p-3 border-b border-gray-100">Features</a>
                    <a href="#" className="block text-gray-600 hover:text-black p-3 border-b border-gray-100">Services</a>
                    <a href="#" className="block text-gray-600 hover:text-black p-3 border-b border-gray-100">Contact</a>
                    <a href="#" className="block text-gray-600 hover:text-black p-3">About Us</a>
                </nav>
            )}
        </>
    );
};

export default Header;