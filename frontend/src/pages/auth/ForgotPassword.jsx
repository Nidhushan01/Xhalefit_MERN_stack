import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  
  const handleSendOTP = async (e) => {
    e.preventDefault();
    console.log("OTP sent to:", email);

    try{
        await axios.post(
            "auth/forgot-password",
            JSON.stringify({ email }),
            {
                headers: { "Content-Type": "application/json" },
                //withCredentials: true,
            }
        );
        navigate("/verify-otp", { 
        state: { 
            passwordReset: true, 
            email: email 
        } 
        });
    }catch(error) {
        console.log("error in getting otp");
    }
    
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md rounded-2xl shadow-xl bg-white p-6">
          <button onClick={() => navigate("/login")} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
            <ArrowLeft size={20} /> Back
          </button>
          <div className="flex flex-col gap-4 mt-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Forgot Password</h2>
            <p className="text-gray-600 text-center">Enter your email to receive a password reset OTP.</p>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                className="pl-10 py-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              onClick={handleSendOTP}
              className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 text-white font-semibold rounded-lg transition-all"
            >
              Send OTP
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
