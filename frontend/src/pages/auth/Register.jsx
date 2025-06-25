import { useRef, useState, useEffect, useContext } from "react";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import axios from "./api/axios";
import signup from "../../assets/images/auth/signup.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import XhaleFitProfile from "../../components/XhaleFitProfile/XhaleFitProfile";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const { setTempUser } = useContext(AuthContext);
  const errRef = useRef(null);
  const userRef = useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [role, setRole] = useState("User");

  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validPwd || !validMatch) {
      setErrMsg("Invalid Password Format or passwords do not match");
      return;
    }
    try {
      let registerUrl = role === "User" ? "auth/register" : "auth/register-trainer";
      // Register the user
      await axios.post(
        registerUrl,
        JSON.stringify({ email, password}),
        {
          headers: { "Content-Type": "application/json" },
          //withCredentials: true,
        }
      );

      setTempUser({ email, password, role }); // Store user details
      navigate("/verify-otp"); // Redirect to OTP page

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email already in use");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
        <div className="flex bg-white rounded-[20px] shadow-2xl overflow-hidden max-w-4xl w-full">
            <p ref={errRef} className={`text-red-500 text-sm ${errMsg ? "block" : "hidden"}`}>
                {errMsg}
            </p>

            {/* Left Section - Image */}
            <div className="hidden md:block md:w-1/2">
                {/* <img
                    src={signup}
                    alt="Rehabilitation"
                    className="w-full h-full object-cover"
                /> */}
                <XhaleFitProfile profileText="Signup" height={580}/>
            </div>

            {/* right Section for Sign-Up Form */}
            <div className="w-full md:w-1/2 p-3 md:p-6">
                <div className="flex flex-col items-center">
                    <form onSubmit={handleSubmit} className="w-full">
                        <label className="block text-gray-700">E-mail</label>
                        <input
                        type="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className="w-full p-3 border border-gray-400 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <label className="block text-gray-700">Password</label>
                        <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        className="w-full p-3 border border-gray-400 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                        type="password"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        className="w-full p-3 border border-gray-400 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <label className="block text-gray-700">Select Role</label>
                        <select 
                          className="w-full p-2 border border-gray-400 rounded mb-4"
                          onChange={(e) => setRole(e.target.value)}  // Update role on selection
                          value = {role}  // set the value to selected role
                        >
                          <option>User</option>
                          <option>Trainer</option>
                        </select>
                        <p className="text-sm text-gray-600 mb-4">
                            Already have an account? <span className="text-purple-600 cursor-pointer" onClick={() => navigate("/login")}>Login</span>
                        </p>
                        <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300"
                        >
                        SignUp
                        </button>
                    </form>

                    <div className="flex items-center w-full my-4">
                        <hr className="flex-grow border-gray-400" />
                        <span className="mx-2 text-gray-600">Or Signup with</span>
                        <hr className="flex-grow border-gray-400" />
                    </div>

                    <div className="flex space-x-4">
                        <FaGoogle className="text-2xl cursor-pointer hover:text-red-500" />
                        <FaGithub className="text-2xl cursor-pointer hover:text-gray-800" />
                        <FaFacebook className="text-2xl cursor-pointer hover:text-blue-600" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Register;
