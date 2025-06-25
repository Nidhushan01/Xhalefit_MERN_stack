import XhaleFitProfile from "../XhaleFitProfile/XhaleFitProfile";

const Step2 = ({ formData, handleChange, prevStep, nextStep }) => {
  return (
    <div className="flex justify-center items-center min-h-screen p-5">
      <div className="bg-white rounded-2xl w-full max-w-[1150px] shadow-lg border-2 border-blue-200 flex flex-col md:flex-row relative">
        {/* Left Section - XhaleFit Profile (Hidden on small screens) */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center p-5">
          <XhaleFitProfile profileText="Health Survey Form" height={600} />
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-5 md:p-10 flex flex-col overflow-y-auto">
          <h2 className="text-2xl font-semibold text-[#573C35] mb-4">Medical History</h2>

          {/* Height */}
          <label className="block text-sm font-medium text-gray-700">Height:</label>
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="border p-2 w-full rounded-md mt-1"
            required
          />

          {/* Weight */}
          <label className="block text-sm font-medium text-gray-700 mt-3">Weight:</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="border p-2 w-full rounded-md mt-1"
            required
          />

          {/* Injuries / Surgeries */}
          <label className="block text-sm font-medium text-gray-700 mt-3">
            Do you have or did you have any injuries or done any surgeries?
          </label>
          <input
            type="text"
            name="injuries"
            value={formData.injuries}
            onChange={handleChange}
            className="border p-2 w-full rounded-md mt-1"
            required
          />

          {/* Injury Description */}
          <label className="block text-sm font-medium text-gray-700 mt-3">
            If yes, please describe briefly:
          </label>
          <textarea
            name="injuryDescription"
            value={formData.injuryDescription}
            onChange={handleChange}
            className="border p-2 w-full rounded-md mt-1"
            rows="2"
            required
          />

          {/* File Upload for Medical Reports */}
          <label className="block text-sm font-medium text-gray-700 mt-3">
            If there are any relevant medical reports attach here:
          </label>
          <input
            type="file"
            name="medicalReport"
            onChange={handleChange}
            className="border p-2 w-full rounded-md mt-1"
          />

          {/* Previous Treatments */}
          <label className="block text-sm font-medium text-gray-700 mt-3">
            What treatment have you done for this injury previously?
          </label>
          <input
            type="text"
            name="previousTreatment"
            value={formData.previousTreatment}
            onChange={handleChange}
            className="border p-2 w-full rounded-md mt-1"
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
