import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../auth/api/axios";
import { AuthContext } from "../auth/context/AuthProvider";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SessionTracking from "../../components/serviceTracking/SessionTracking";

// images
import first from "../../assets/images/Dashboard/first.png"
import diary from "../../assets/images/Dashboard/diary.png"
import masseur from "../../assets/images/Dashboard/masseur_details.png"
import progress from "../../assets/images/Dashboard/progress.png"

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Combined state for all data
    const [dashboardData, setDashboardData] = useState(null);
    
    // State for profile data
    const [profileData, setProfileData] = useState({
        name: "",
        age: "",
        gender: "",
        address: "",
        emergency_no: "",
        occupation: "",
    });
    
    // State for UI controls
    const [showProfile, setShowProfile] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // State for form inputs while editing
    const [formData, setFormData] = useState({...profileData});

    // Single API call to fetch all user data
    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Authentication token not found. Please login again.");
                }
                
                const response = await axios.get("/auth/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                if (response.data && response.data.data) {
                    const { userProfile } = response.data.data;
                    setProfileData(userProfile);
                    setFormData(userProfile);
                    const dashboardData = response.data.data;
                    setDashboardData(dashboardData);
                    console.log("user profile data loaded:", response.data);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                setError("Failed to fetch user data.");
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchDashboardData();
    }, []); // Empty dependency array to run only once on mount

    const handleProfileClick = () => {
        setShowProfile(!showProfile);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    
    // Handle the edit button click
    const handleEditClick = () => {
        setIsEditing(true);
        // Initialize form data with current profile data
        setFormData({...profileData});
    };
    
    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset error state
        setError(null);
        setIsLoading(true);
        
        try {
            // Get the token from localStorage
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error("Authentication token not found. Please login again.");
            }
            
            // Make the API call with the authorization header
            const response = await axios.put(
                'auth/update', 
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            // Update the profile data with the response from the API
            if (response.data && response.data.user) {
                setProfileData(formData);
                setIsEditing(false);
            }
            
        } catch (error) {
            console.error("Error updating profile:", error);
            
            // Set error message based on error response
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Failed to update profile. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    // Handle cancel button click
    const handleCancel = () => {
        setIsEditing(false);
        setError(null);
    };

    // Check if workout data exists and if suggestedWorkout is not null
    const hasWorkoutPlan = dashboardData && dashboardData.suggestedWorkout;

    return (
        <div className="relative w-full max-w-7xl mx-auto bg-white px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden">
            {/* Header Component */}
            <Header onProfileClick={handleProfileClick} />
            
            {/* Profile Popup */}
            {showProfile && (
                <div className="absolute right-4 sm:right-6 md:right-8 lg:right-16 top-16 md:top-20 z-10 bg-white p-4 md:p-6 rounded-lg shadow-lg w-64">
                    <h3 className="text-xl font-bold">User Profile</h3>

                    {isEditing ? (
                        // Edit mode - Show form
                        <form onSubmit={handleSubmit} className="mt-2">
                            <div className="mb-3">
                                <label className="block text-sm text-gray-600 mb-1">Name</label>
                                <input 
                                    type="text"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block text-sm text-gray-600 mb-1">Age</label>
                                <input
                                    type="text"
                                    name="age"
                                    value={formData.age || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="block text-sm text-gray-600 mb-1">Gender</label>
                                <select 
                                    name="gender"
                                    value={formData.gender || ""}
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
                                    value={formData.address || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="block text-sm text-gray-600 mb-1">Emergency No</label>
                                <input 
                                    type="text"
                                    name="emergency_no"
                                    value={formData.emergency_no || ""}
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
                                    className={`flex-1 px-4 py-2 ${isLoading ? 'bg-gray-400' : 'bg-black'} text-white rounded-lg`}
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
                    ) : (
                        // View mode - Show profile data
                        <>
                            <p className="mt-2">Name: {profileData.name || "Not set"}</p>
                            <p>Age: {profileData.age || "Not set"}</p>
                            <p>Gender: {profileData.gender || "Not set"}</p>
                            <p>Address: {profileData.address || "Not set"}</p>
                            <p>Emergency No: {profileData.emergency_no || "Not set"}</p>
                            <button 
                                onClick={handleEditClick}
                                className="mt-4 px-4 py-2 bg-black text-white rounded-lg w-full"
                            >
                                Edit Profile
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Main Content - Conditionally render based on workout data */}
            {!hasWorkoutPlan ? (
                <>
                    {/* Survey Button - Only show if no workout data */}
                    <div className="mt-6 flex justify-center md:justify-start">
                        <button 
                            onClick={() => navigate("/surveyform")} 
                            className="px-5 py-2 md:px-6 md:py-3 bg-black text-white rounded-lg text-base md:text-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                            Fill Survey!
                        </button>
                    </div>

                    {/* Hero Section */}
                    <section className="mt-8 md:mt-12 lg:mt-16">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="w-full md:w-3/5">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center md:text-left">
                                    <span className="text-black">Customizable</span> <br />
                                    <span className="text-black">Rehabilitation Plans</span>
                                </h2>
                                <p className="mt-4 text-base lg:text-lg text-gray-600 text-center md:text-left">
                                    Rehabilitation isn't one-size-fits-all, and neither are our plans! With XhaleFit,
                                    you get personalized recovery programs designed to match your body's needs.
                                </p>
                                <div className="mt-6 flex justify-center md:justify-start">
                                    <button 
                                        onClick={() => navigate("/customize")} 
                                        className="px-5 py-2 md:px-6 md:py-3 bg-black text-white rounded-lg text-base md:text-lg font-medium hover:bg-gray-800 transition-colors"
                                    >
                                        Get Started!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Image Section */}
                    <div className="mt-8 md:mt-12 lg:mt-16 flex justify-center w-full">
                        <img src={first} alt="Rehabilitation" className="w-full rounded-lg shadow-lg" />
                    </div>
                    
                    {/* Feature Sections */}
                    {[
                        { title: "Training Diary", img: diary, description: "Track your fitness journey effortlessly with XhaleFit's Training Diary! Log your workouts, monitor progress, and reflect on achievements." },
                        { title: "Masseur Details", img: masseur, description: "Relax, recover, and rejuvenate with expert masseur services! Our skilled professionals help you relieve stress." },
                        { title: "Progress", img: progress, description: "Growth happens when you push beyond limits and track your journey. Visualize your progress and stay inspired." }
                    ].map((section, index) => (
                        <section key={index} className="mt-12 md:mt-16 lg:mt-20">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                <div className="w-full md:w-3/5">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center md:text-left">
                                        <span className="text-black">{section.title}</span>
                                    </h2>
                                    <p className="mt-4 text-base lg:text-lg text-gray-600 text-center md:text-left">
                                        {section.description}
                                    </p>
                                    {/* <div className="mt-6 flex justify-center md:justify-start">
                                        <button className="px-5 py-2 md:px-6 md:py-3 bg-black text-white rounded-lg text-base md:text-lg font-medium hover:bg-gray-800 transition-colors">
                                            View {section.title === "Training Diary" ? "Diary" : "Details"}
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                            <div className="mt-6 md:mt-8 flex justify-center w-full">
                                <img src={section.img} alt={section.title} className="w-full rounded-lg" />
                            </div>
                        </section>
                    ))}
                </>
            ) : (
                /* Workout Details Section - Show when workout data exists */
                <div className="mt-8 md:mt-12 lg:mt-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">Your Personal Rehabilitation Plan</h2>
                    
                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            <p>{error}</p>
                            <button 
                                onClick={() => navigate("/surveyform")} 
                                className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
                            >
                                Fill Survey
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Workout Overview Section */}
                            <div className="bg-gray-50 rounded-lg p-6 shadow">
                                <h3 className="text-xl font-semibold mb-4">Workout Overview</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white p-4 rounded shadow">
                                        <h4 className="font-medium text-gray-500">Category</h4>
                                        <p className="text-lg">{dashboardData?.suggestedWorkout?.category || "Rehabilitation"}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded shadow">
                                        <h4 className="font-medium text-gray-500">Difficulty</h4>
                                        <p className="text-lg">{dashboardData?.suggestedWorkout?.difficulty || "Moderate"}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded shadow">
                                        <h4 className="font-medium text-gray-500">Duration</h4>
                                        <p className="text-lg">{dashboardData?.suggestedWorkout?.duration_minutes || "45"} minutes</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Workout Details */}
                            <div className="bg-white rounded-lg p-6 shadow">
                                <h3 className="text-xl font-semibold mb-4">Workout Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-lg">{dashboardData?.suggestedWorkout?.name || "Physiotherapy"}</h4>
                                        <p className="text-gray-600">{dashboardData?.suggestedWorkout?.description || "General rehabilitation exercises."}</p>
                                    </div>
                                    
                                    {dashboardData?.suggestedWorkout?.video_url && (
                                        <div className="mt-4">
                                            <h4 className="font-medium mb-2">Instructional Video</h4>
                                            <div className="aspect-w-16 aspect-h-9">
                                                <a 
                                                    href={dashboardData.suggestedWorkout.video_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="block w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-black hover:text-blue-600"
                                                >
                                                    <div className="text-center">
                                                        <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                                        </svg>
                                                        <span>Watch on YouTube</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            < SessionTracking workoutId={ dashboardData.suggestedWorkout._id }/>
                            
                            {/* Training Diary Button */}
                            <div className="flex justify-center md:justify-start">
                                <button 
                                    onClick={() => navigate("/training-diary")} 
                                    className="px-5 py-2 md:px-6 md:py-3 bg-black text-white rounded-lg text-base md:text-lg font-medium hover:bg-gray-800 transition-colors"
                                >
                                    Go to Training Diary
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {/* Footer Section */}
            <div className="mt-12 md:mt-16 lg:mt-20">
                <Footer />
            </div>
        </div>
    );
};

export default Dashboard;