import { useRef, useState, useEffect, useContext } from 'react';
import { AuthContext } from "./context/AuthProvider";
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import axios from "../auth/api/axios";
import XhaleFitProfile from '../../components/XhaleFitProfile/XhaleFitProfile';

const Login = () => {
    const { login, setUser, user } = useContext(AuthContext);
    const userRef = useRef(null);
    const errRef = useRef(null);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    useEffect(() => {
        console.log("Updated user:");
        console.log(user);
    }, [user]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();


        // Check if email and password are empty
        if (!email || !password) {
            setErrMsg('Please enter both email and password');
            errRef.current.focus();
            return;
        }

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setErrMsg('Invalid email format');
            errRef.current.focus();
            return;
        }

        try {
            // Login the user
            await login({ email, password });

            try {
                // Fetch user details after login
                const response = await axios.get("auth/dashboard", {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                // Set the user data
                setUser(response.data);

                // Check if the user's role is "trainer" and if their status is pending
                if (localStorage.getItem("role") === "trainer") {
                if (response.data.data.trainerProfile.status === "pending") {
                    navigate("/trainerToApprove");
                } 
                else if (response.data.data.trainerProfile.status === "rejected") {
                    navigate("/rejected");
                }else {
                    navigate("/trainer"); // Redirect to trainer dashboard if status is not "pending"
                }
            } else {
                // Handle other roles (e.g., customer, admin)
                if (localStorage.getItem("role") === "customer") {
                    navigate("/dashboard");
                } else if (localStorage.getItem("role") === "admin") {
                    navigate("/admin");
                }
            }
        } catch (error) {
            console.error("Error getting user details");
            setErrMsg('Failed to fetch user data');
            errRef.current.focus();
        }

        // Clear the form
        setEmail('');
        setPassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Invalid Email or Password');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="flex bg-white rounded-[20px] shadow-2xl overflow-hidden max-w-4xl w-full">
                <p 
                    ref={errRef} 
                    className={errMsg ? "text-red-500 mb-4" : "hidden"} 
                    aria-live="assertive"
                >
                    {errMsg}
                </p>

                {/* Left Section - Image */}
                <div className="hidden md:block md:w-1/2">
                    <XhaleFitProfile profileText='Login' height={563}/>
                </div>

                {/* right Section for Login Form */}
                <div className="w-full lg:w-[458px] p-8 bg-white bg-opacity-10 rounded-2xl">
                    <form onSubmit={handleSubmit} className="mt-8">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                className="w-full p-3 border border-gray-400 rounded-md  mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700">Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                className="w-full p-3 border border-gray-400 rounded-md  mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <div className="flex justify-end">
                                <Link to="/forgotPassword" className="text-sm text-[#96C5F1] italic mt-2">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white text-lg font-semibold p-3 rounded-lg"
                            >
                            Login
                        </button>
                    </form>

                    <p className="text-center mt-6">
                        No Account? {" "}
                        <span 
                            className="font-medium text-purple-600 cursor-pointer"
                            onClick={() => navigate("/signup")}
                        >
                            Create one
                        </span>
                    </p>
                    <div className="flex items-center justify-center mt-6">
                        <hr className="w-1/3 border-black" />
                        <span className="mx-4 text-sm">Or Login with</span>
                        <hr className="w-1/3 border-black" />
                    </div>
                    <div className="flex justify-center mt-4 gap-6">
                        <FaGoogle className="text-2xl cursor-pointer hover:text-red-500" />
                        <FaGithub className="text-2xl cursor-pointer hover:text-gray-800" />
                        <FaFacebook className="text-2xl cursor-pointer hover:text-blue-600" />
                    </div>
                    <p className="text-center text-sm mt-6">Terms and Policy</p>
                </div>
            </div>
        </div>
    );
};

export default Login;