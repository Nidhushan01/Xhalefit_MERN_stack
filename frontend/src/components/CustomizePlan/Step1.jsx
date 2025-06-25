import React, { useState } from "react";
import Logo from "../../assets/images/Logo.jpg";

const Step1 = ({ onNext }) => {
  const [formData, setFormData] = useState({
    trainer: "",
    issue: "",
    note: "",
    goal: "",
    duration: "",
    frequency: "",
    intensity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (!formData.duration || !formData.frequency || !formData.intensity) {
      alert("Please select all required options.");
      return;
    }
    onNext(formData);
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center p-4">
      <div className="relative w-full max-w-5xl bg-white bg-opacity-70 shadow-lg rounded-2xl p-6 md:p-12">
        <div className="flex flex-col md:flex-row items-center space-x-4">
          <img src={Logo} alt="XhaleFit Logo" className="w-20 h-20 md:w-80 md:h-32" />
          <h1 className="text-[#401717] text-4xl md:text-5xl font-bold text-center md:text-left">
            Customize Rehabilitation Plans
          </h1>
        </div>

        {/* Input Fields */}
        <div className="mt-6 bg-[#CDAFAF] p-4 rounded-lg flex flex-col">
          {[
            { label: "Assigned Trainer", name: "trainer" },
            { label: "Major Issue", name: "issue" },
            { label: "Trainer’s Note", name: "note" },
            { label: "Recovery Goal", name: "goal" },
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col mt-4">
              <label className="text-lg font-semibold">{label}</label>
              <input
                type="text"
                name={name}
                className="bg-white w-full p-2 border rounded-md mt-2"
                value={formData[name]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        {/* Select Plan */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Select Plan</h2>
          <div className="mt-2 flex flex-col gap-2">
            {["4 Week", "6 Week"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="duration"
                  value={option}
                  checked={formData.duration === option}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Break Down Exercise By */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Break Down Exercise By</h2>
          <div className="mt-2 flex flex-col gap-2">
            {["Weekly", "Daily"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="frequency"
                  value={option}
                  checked={formData.frequency === option}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Intensity Level */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Intensity Level</h2>
          <div className="mt-2 flex flex-col gap-2">
            {["Beginner", "Intermediate", "Advance"].map((level) => (
              <label key={level} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="intensity"
                  value={level}
                  checked={formData.intensity === level}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-8">
          <button className="bg-black text-white px-6 py-2 rounded-lg text-lg" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1;
