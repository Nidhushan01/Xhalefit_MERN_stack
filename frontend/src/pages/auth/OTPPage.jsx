import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import axios from "./api/axios";
import { useNavigate, useLocation } from "react-router-dom";

const OTPInput = ({ otp, setOtp }) => {
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  return (
    <div className="flex justify-center gap-2 mt-4">
      {otp.map((digit, i) => (
        <input
          key={i}
          data-index={i}
          type="text"
          maxLength="1"
          className="w-12 h-14 text-center border rounded-lg text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={digit}
          onChange={(e) => handleChange(e, i)}
        />
      ))}
    </div>
  );
};

const OTPPage = () => {
  const { tempUser, setTempUser, setUser, login } = useContext(AuthContext);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(300);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine the flow: registration or password reset
  const isPasswordReset = location.state?.passwordReset || false;
  const email = location.state?.email || tempUser?.email;
  
  useEffect(() => {
    if (!email) {
      // If no email is available, redirect to appropriate page
      navigate(isPasswordReset ? "/forgotPassword" : "/login");
    }
  }, [email, navigate, isPasswordReset]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleResendOTP = async (e) => {
    try {
      // Determine endpoint based on the flow
      const endpoint = isPasswordReset 
        ? "auth/resend-reset-otp" 
        : tempUser?.role === "User" 
          ? "auth/resend-otp" 
          : "auth/resend-trainer-otp";
      
      await axios.post(
        endpoint,
        JSON.stringify({ email }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      // Reset timer
      setTimeLeft(300);
      setError("");
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
      console.error("Failed to resend OTP:", err);
    }
  };

  const handleOtpVerification = async () => {
    if (!email) {
      setError("No email found. Please try again.");
      return;
    }
    
    // Clear any previous errors
    setError("");
    
    try {
      if (isPasswordReset) {
          console.log(email);
          console.log(otp);
          navigate("/resetPassword", { 
            state: { 
              email:email, 
              otp: otp.join("")
            } 
          });
      } else {
        // Registration flow (original logic)
        const endpoint = tempUser.role === "User" ? "auth/verify-otp" : "auth/verify-trainer-otp";
        const response = await axios.post(
          endpoint,
          JSON.stringify({ 
            email: tempUser.email, 
            password: tempUser.password, 
            otp: otp.join("") 
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        
        setUser(response.data.user);
        if (tempUser.role === "User") {
          // login
          await login({ email: tempUser?.email, password: tempUser.password });
          navigate("/dashboard");
        } else {
          navigate("/trainerToApprove");
        }
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
      console.error("OTP verification failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4">
          {isPasswordReset ? "Reset Your Password" : "Verify your email address"}
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          6 digit One Time Password (OTP) has been sent via Email to
        </p>
        <p className="text-xl font-semibold text-gray-800 mb-4">{email}</p>
        <p className="text-lg text-gray-600 mb-4">Enter the OTP below to verify it.</p>
        
        <OTPInput otp={otp} setOtp={setOtp} />
        
        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}
        
        <p className="text-xl font-semibold text-black mt-4">{formatTime(timeLeft)}</p>
        
        <button
          onClick={handleOtpVerification}
          disabled={otp.some(digit => digit === "")}
          className="mt-6 bg-black text-white px-6 py-3 rounded-lg w-full text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isPasswordReset ? "Verify & Continue" : "Confirm"}
        </button>
        
        <p 
          onClick={handleResendOTP} 
          className="mt-4 text-blue-500 font-bold cursor-pointer hover:underline"
        >
          Resend OTP
        </p>
      </div>
    </div>
  );
};

export default OTPPage;