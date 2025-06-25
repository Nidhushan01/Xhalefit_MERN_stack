import React from 'react';
import { FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/images/Logo.jpg";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth tokens or session here if needed
    localStorage.removeItem('token'); // Example
    navigate('/login');
  };

  return (
    <footer className="relative w-full bg-white py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* First Column */}
          <div className="mb-10 md:mb-0">
            <img src={Logo} alt="logo" className="h-20 w-auto mb-6" />
            <div>
              <p className="font-['Poppins',_sans-serif] text-2xl mb-2">info@XhaleFit.com</p>
              <p className="font-['Poppins',_sans-serif] text-2xl mb-6">Privacy Policy</p>
              <div className="flex space-x-4 mt-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaInstagram className="w-6 h-6" />
                </div>
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaGithub className="w-6 h-6" />
                </div>
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaFacebook className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div className="mb-8 md:mb-0">
            <ul className="space-y-6">
              <li className="font-['Instrument_Sans',_sans-serif] font-semibold text-2xl">About</li>
              <li className="font-['Instrument_Sans',_sans-serif] font-semibold text-2xl">Services</li>
              <li className="font-['Instrument_Sans',_sans-serif] font-semibold text-2xl">Premium</li>
              <li className="font-['Instrument_Sans',_sans-serif] font-semibold text-2xl">Facilities</li>
            </ul>
          </div>

          {/* Third Column */}
          <div>
            <ul className="space-y-6">
              <li className="font-['Instrument_Sans',_sans-serif] font-semibold text-2xl">Staffs</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="font-['Instrument_Sans',_sans-serif] font-semibold text-2xl text-left hover:text-red-500"
                >
                  Logout
                </button>
              </li>
              <li className="font-['Instrument_Sans',_sans-serif] font-semibold text-2xl">FAQ</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-600">Copyright © 2025 XhaleFit. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
