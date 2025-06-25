import React from "react";
import XhaleFitProfile from "../XhaleFitProfile/XhaleFitProfile";

const Step1 = ({ formData, handleChange, nextStep }) => {
  return (
    <div className="flex justify-center items-center min-h-screen p-5">
      <div className="bg-white rounded-2xl w-full max-w-[1150px] h-auto shadow-lg border-2 border-blue-200 flex flex-col md:flex-row relative">
        {/* Left Section - Logo & Info (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center p-5">
          <XhaleFitProfile profileText="Health Survey Form" height={600} />
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-5 md:p-10 flex flex-col">
          <h2 className="text-2xl font-semibold text-[#573C35] mb-4">Personal Details</h2>
          
          {/* Full Name */}
          <label className="block text-sm font-medium text-gray-700">Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded-md mt-1"
            required
          />
          
          {/* Date of Birth */}
          <label className="block text-sm font-medium text-gray-700 mt-3">Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="border p-2 w-full rounded-md mt-1"
            required
          />
          
          {/* Gender */}
          <label className="block text-sm font-medium text-gray-700 mt-3">Gender:</label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="F"
                checked={formData.gender === "F"}
                onChange={handleChange}
                className="accent-[#573C35]"
              />
              <span>F</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="M"
                checked={formData.gender === "M"}
                onChange={handleChange}
                className="accent-[#573C35]"
              />
              <span>M</span>
            </label>
          </div>
          
          {/* Contact Number */}
          <label className="block text-sm font-medium text-gray-700 mt-3">Contact No:</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="border p-2 w-full rounded-md mt-1"
            required
          />
          
          {/* Emergency Contact */}
          <label className="block text-sm font-medium text-gray-700 mt-3">Emergency Contact No:</label>
          <input
            type="tel"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            className="border p-2 w-full rounded-md mt-1"
            required
          />
          
          {/* Address */}
          <label className="block text-sm font-medium text-gray-700 mt-3">Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 w-full rounded-md mt-1"
            rows="2"
            required
          />
          
          {/* Occupation */}
          <label className="block text-sm font-medium text-gray-700 mt-3">Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="border p-2 w-full rounded-md mt-1"
            required
          />
          
          {/* Next Button */}
          <button
            onClick={nextStep}
            className="mt-6 bg-black text-white py-2 px-4 rounded-md self-end hover:bg-gray-800 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1;
