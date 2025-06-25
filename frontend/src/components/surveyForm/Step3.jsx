import React from "react";
import XhaleFitProfile from "../XhaleFitProfile/XhaleFitProfile";

const Step3 = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="flex justify-center items-center min-h-screen p-5">
      <div className="bg-white rounded-2xl w-full max-w-[1150px] shadow-lg border-2 border-blue-200 flex flex-col md:flex-row">
        
        {/* Left Section - XhaleFit Profile (Hidden on small screens) */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center p-5">
          <XhaleFitProfile profileText="Health Survey Form" height={650} />
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-5 md:p-10 overflow-y-auto">
          <h2 className="text-2xl font-semibold text-[#573C35] mb-4">Medical History</h2>

          {/* Difficulties Checkbox List */}
          <label className="block text-sm font-medium text-gray-700">
            What type of difficulties currently you have?
          </label>
          {[
            "Back Pain",
            "Joint Stiffness & Arthritis",
            "Muscle Weakness",
            "Post-Surgery Recovery",
            "Obesity & Weight Management Issues",
            "Neck & Shoulder Tension",
            "Respiratory Issues",
            "Mental Stress & Fatigue",
            "Aging",
            "Other",
          ].map((item) => (
            <div key={item} className="flex items-center mt-2">
              <input
                type="radio"
                name="difficulty"
                value={item}
                checked={formData.difficulty === item}
                onChange={handleChange}
                className="mr-2"
              />
              <label>{item}</label>
            </div>
          ))}

          {/* Why choose XhaleFit */}
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Why you choose XhaleFit?
          </label>
          {[
            "Pain relief",
            "Mental wellness",
            "Resume Sports/Physical Activities",
            "Be Active",
            "Posture Correction",
            "Muscle Recovery",
          ].map((item) => (
            <div key={item} className="flex items-center mt-2">
              <input
                type="radio"
                name="reason"
                value={item}
                checked={formData.reason === item}
                onChange={handleChange}
                className="mr-2"
              />
              <label>{item}</label>
            </div>
          ))}

          {/* Preferred Service Days */}
          <label className="block text-sm font-medium text-gray-700 mt-4">
            What are days will you prefer for the service?
          </label>
          <input
            type="text"
            name="preferredDays"
            placeholder="Ex: Monday, Tuesday"
            value={formData.preferredDays}
            onChange={handleChange}
            className="border p-2 w-full rounded-md mt-1"
          />

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
