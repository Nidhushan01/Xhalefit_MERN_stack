import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TrainerToApprove = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <div className="text-yellow-500 text-6xl animate-pulse">
          <FaClock />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Approval Pending
        </h2>
        <p className="text-gray-600 mt-2">
          Your registration is under review. Please wait for admin approval.
          You will be notified once your account is activated.
        </p>
        <div className="mt-6">
          <span className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Waiting for Approval
          </span>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );
};

export default TrainerToApprove;
