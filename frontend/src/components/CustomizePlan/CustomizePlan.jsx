import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import final from "../../assets/images/CustomizePlan/Final.png";
import Logo from "../../assets/images/Logo.jpg";

const CustomizePlan = () => {
  const [step, setStep] = useState(1);
  const [planDetails, setPlanDetails] = useState({
    trainer: "",
    issue: "",
    note: "",
    goal: "",
    duration: "",
    frequency: "",
    intensity: "",
    therapies: [],
  });

  const handleStep1Submit = (data) => {
    setPlanDetails((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleStep2Submit = (selectedTherapies) => {
    setPlanDetails((prev) => ({ ...prev, therapies: selectedTherapies }));
    setStep(3);
  };

  return (
    <div>
      {step === 1 && <Step1 onNext={handleStep1Submit} />}
      {step === 2 && <Step2 onDone={handleStep2Submit} />}
      {step === 3 && (
        <div className="relative w-full min-h-screen flex justify-center items-center p-4">
          {/* Main Content */}
          <div className="relative w-full max-w-5xl bg-white bg-opacity-70 shadow-lg rounded-2xl p-6 md:p-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center md:space-x-4">
              <img
                src={Logo}
                alt="XhaleFit Logo"
                className="w-20 h-20 md:w-40 md:h-24"
              />
              <h1 className="text-[#401717] text-4xl md:text-5xl font-bold text-center md:text-left mt-4 md:mt-0">
                Your Customized Plan is Ready!
              </h1>
            </div>

            {/* Plan Summary Section */}
            <div className="flex flex-col md:flex-row mt-8 space-y-6 md:space-y-0 md:space-x-8">
              {/* Left Side - Plan Details */}
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Plan Summary
                </h2>
                <div className="space-y-3 text-lg text-gray-700">
                  <p>
                    <strong>Duration:</strong> {planDetails.duration}
                  </p>
                  <p>
                    <strong>Frequency:</strong> {planDetails.frequency}
                  </p>
                  <p>
                    <strong>Intensity Level:</strong> {planDetails.intensity}
                  </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6">
                  Selected Therapies & Treatments:
                </h2>
                <ul className="list-disc list-inside text-lg text-gray-700 mt-2">
                  {planDetails.therapies.length > 0 ? (
                    planDetails.therapies.map((therapy, index) => (
                      <li key={index}>{therapy}</li>
                    ))
                  ) : (
                    <p className="text-gray-500">No therapies selected.</p>
                  )}
                </ul>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-red-600 text-white font-semibold text-lg py-2 px-6 rounded-lg hover:bg-red-700 transition"
                  >
                    Change
                  </button>
                  <button
                    className="bg-green-600 text-white font-semibold text-lg py-2 px-6 rounded-lg hover:bg-green-700 transition"
                  >
                    Confirm
                  </button>
                </div>
              </div>

              {/* Right Side - Image Section */}
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={final}
                  alt="Customized Plan"
                  className="w-full max-w-md md:max-w-lg h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizePlan;
