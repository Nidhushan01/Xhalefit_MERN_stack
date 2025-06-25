import { useRef, useState, useEffect, useContext } from "react";
import axios from "./api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import XhaleFitProfile from "../../components/XhaleFitProfile/XhaleFitProfile";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPassword = () => {
  const { setTempUser } = useContext(AuthContext);
  const errRef = useRef(null);
  const userRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {};

  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");

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
  }, [password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validPwd || !validMatch) {
      setErrMsg("Invalid Password Format or passwords do not match");
      return;
    }
    try {
      console.log(email);
      console.log(otp);
      console.log(password);
      await axios.post(
        "auth/reset-password",
        JSON.stringify({ email:email, otp:otp, newPassword:password}),
        {
          headers: { "Content-Type": "application/json" },
          //withCredentials: true,
        }
      );

      console.log("password successfully reset");
      //setTempUser({ email, password, role }); // Store user details
      navigate("/login");

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
                        <label className="block text-gray-700">New Password</label>
                        <input
                        type="password"
                        ref={userRef}
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
                        <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300"
                        >
                        Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ResetPassword;
