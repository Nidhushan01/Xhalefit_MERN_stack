import React from "react";
import { useNavigate } from "react-router-dom";

const TrainerRejectedPage = () => {
  const navigate = useNavigate();

  const handleGoToSignup = () => {
    // Clear any existing auth tokens
    localStorage.removeItem("token");
    // Navigate to signup page
    navigate("/signup");
  };

  const handleContactSupport = () => {
    // This could open an email client or navigate to a contact form
    window.location.href = "mailto:support@xhalefit.com";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Top red banner */}
        <div className="w-full h-2 bg-red-500"></div>
        
        <div className="p-4 sm:p-6 md:p-8">
          <div className="text-center">
            {/* Red X Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <svg 
                className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </div>

            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">
              Application Rejected
            </h2>
            
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 px-1">
              We're sorry, but your trainer application has been rejected by our administration team.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 space-y-4">
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h3 className="text-sm sm:text-base font-medium text-gray-900">
                Possible reasons for rejection:
              </h3>
              <ul className="mt-2 text-xs sm:text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Incomplete or incorrect qualification information</li>
                <li>Unable to verify provided credentials</li>
                <li>Did not meet the required experience level</li>
                <li>Missing required certifications</li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                If you believe this is an error or would like to submit additional information, please contact our support team.
              </p>
            </div>

            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3">
              <button
                onClick={handleGoToSignup}
                className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Apply Again
              </button>
              <button
                onClick={handleContactSupport}
                className="w-full flex justify-center py-2 sm:py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} XhaleFit. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerRejectedPage;