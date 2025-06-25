import { useEffect, useState } from "react";
import axios from "../auth/api/axios";
import { useNavigate } from "react-router-dom";

const TrainerDashboard = () => {
  const [surveys, setSurveys] = useState([]);
  const [trainerProfile, setTrainerProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [updatedTrainer, setUpdatedTrainer] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    emergency_no: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("auth/trainer-dashboard", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setTrainerProfile(response.data?.data?.trainerProfile);
        setSurveys(response.data?.data?.healthSurveyData || []);
        console.log(response.data?.data?.trainerProfile);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
    
    // Check if token exists before fetching data
    if (!localStorage.getItem("token")) {
      navigate("/login"); // Redirect to login page if no token
    } else {
      fetchDashboardData();
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditing(true);
    setShowProfilePopup(true);
    if (trainerProfile) {
      setUpdatedTrainer({
        name: trainerProfile.name || "",
        age: trainerProfile.age || "",
        gender: trainerProfile.gender || "",
        address: trainerProfile.address || "",
        emergency_no: trainerProfile.emergency_no || "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTrainer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await axios.put(
        "auth/update",
        updatedTrainer,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Update trainer profile with the response data
      setTrainerProfile({
        ...trainerProfile,
        ...response.data.user // Use response data if available
      }); 
      setIsEditing(false);
      setShowProfilePopup(false);
      console.log("Profile updated successfully", response);
    } catch (error) {
      console.error("Error updating profile", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowProfilePopup(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Trainer Dashboard
      </h2>

      {/* Trainer Profile Section */}
      {trainerProfile && (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Profile
          </h3>
          <p>
            <strong className="text-gray-700">Name:</strong>{" "}
            {trainerProfile.name || "Not set"}
          </p>
          <p>
            <strong className="text-gray-700">Email:</strong>{" "}
            {trainerProfile.email || "Not set"}
          </p>
          <p>
            <strong className="text-gray-700">Age:</strong>{" "}
            {trainerProfile.age || "Not set"}
          </p>
          <p>
            <strong className="text-gray-700">Gender:</strong>{" "}
            {trainerProfile.gender || "Not set"}
          </p>
          <p>
            <strong className="text-gray-700">Address:</strong>{" "}
            {trainerProfile.address || "Not set"}
          </p>
          <p>
            <strong className="text-gray-700">Emergency No:</strong>{" "}
            {trainerProfile.emergency_no || "Not set"}
          </p>

          {/* Update Button */}
          <button
            onClick={handleEditToggle}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* Profile Edit Popup */}
      {showProfilePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit User Profile</h3>

            <form onSubmit={handleUpdateProfile} className="mt-2">
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input 
                  type="text"
                  name="name"
                  value={updatedTrainer.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Age</label>
                <input
                  type="text"
                  name="age"
                  value={updatedTrainer.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Gender</label>
                <select 
                  name="gender"
                  value={updatedTrainer.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                <input 
                  type="text"
                  name="address"
                  value={updatedTrainer.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Emergency No</label>
                <input 
                  type="text"
                  name="emergency_no"
                  value={updatedTrainer.emergency_no}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              {/* Error message */}
              {error && (
                <div className="mt-2 text-red-500 text-sm">
                  {error}
                </div>
              )}
              
              <div className="flex gap-2 mt-4">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 px-4 py-2 ${isLoading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-lg`}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button 
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        User Survey Requests
      </h2>

      {surveys.length === 0 ? (
        <p className="text-gray-600 text-lg">No survey requests available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveys.map((survey) => (
            <div
              key={survey._id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-800">
                Survey Details
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {survey.createdAt.split("T")[0]}
              </p>

              {/* Survey Fields */}
              <div className="space-y-2">
                <p>
                  <strong className="text-gray-700">User:</strong>{" "}
                  {survey.user_id?.email || "Unknown"}
                </p>
                <p>
                  <strong className="text-gray-700">Name:</strong>{" "}
                  {survey.survey_data?.name || "N/A"}
                </p>
                <p>
                  <strong className="text-gray-700">Date of Birth:</strong>{" "}
                  {survey.survey_data?.dateOfBirth || "N/A"}
                </p>
                <p>
                  <strong className="text-gray-700">Gender:</strong>{" "}
                  {survey.survey_data?.gender || "N/A"}
                </p>
                <p>
                  <strong className="text-gray-700">Contact:</strong>{" "}
                  {survey.survey_data?.contact || "N/A"}
                </p>
                <p>
                  <strong className="text-gray-700">Emergency Contact:</strong>{" "}
                  {survey.survey_data?.emergencyContact || "N/A"}
                </p>
                <p>
                  <strong className="text-gray-700">Address:</strong>{" "}
                  {survey.survey_data?.address || "N/A"}
                </p>
                <p>
                  <strong className="text-gray-700">Occupation:</strong>{" "}
                  {survey.survey_data?.occupation || "N/A"}
                </p>
                <p>
                  <strong className="text-gray-700">Height:</strong>{" "}
                  {survey.survey_data?.height || "N/A"}
                </p>
                <p>
                  <strong className="text-gray-700">Weight:</strong>{" "}
                  {survey.survey_data?.weight || "N/A"}
                </p>
                <p>
                  <strong className="text-gray-700">Injuries:</strong>{" "}
                  {survey.survey_data?.injuries || "None"}
                </p>
                <p>
                  <strong className="text-gray-700">Medical Reports:</strong>{" "}
                  {survey.survey_data?.medicalReports ? "Available" : "None"}
                </p>
                <p>
                  <strong className="text-gray-700">Previous Treatment:</strong>{" "}
                  {survey.survey_data?.previousTreatment || "None"}
                </p>
                <p>
                  <strong className="text-gray-700">Difficulty:</strong>{" "}
                  {survey.survey_data?.difficulty || "N/A"}
                </p>
                <p>
                  <strong className="text-gray-700">Reason:</strong>{" "}
                  {survey.survey_data?.reason || "N/A"}
                </p>
                <p>
                  <strong className="text-gray-700">Preferred Days:</strong>{" "}
                  {survey.survey_data?.preferredDays || "N/A"}
                </p>
              </div>

              <div className="mt-4 flex justify-between">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    survey.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {survey.status}
                </span>
                {/* <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => navigate(`/assign-workout/${survey._id}`)}
                >
                  Assign Workout
                </button> */}
                <button
                  className={`px-4 py-2 rounded-lg transition ${
                    survey.status === "accepted"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                  onClick={() => {
                    if (survey.status === "accepted") {
                      navigate(`/already-assigned/${survey._id}`);
                    } else {
                      navigate(`/assign-workout/${survey._id}`);
                    }
                  }}
                >
                  {survey.status === "assigned" ? "Workout Assigned" : "Assign Workout"}
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;