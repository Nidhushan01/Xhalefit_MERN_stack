import React, { useState, useContext } from "react";
import axios from "./api/axios";
import { AuthContext } from "./context/AuthProvider";

const ChangePassword = () => {
  const { user } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    try {
      await axios.post("auth/change-password", {
        email: user.email,
        oldPassword,
        newPassword,
      });
      setSuccess("Password changed successfully.");
      setError("");
    } catch (err) {
      setError("Failed to change password. Please check your old password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white opacity-75 p-6 shadow-lg rounded-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4">Change Password</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}
        <input
          type="password"
          className="w-full p-2 border rounded-lg my-2"
          placeholder="Enter old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border rounded-lg my-2"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 border rounded-lg my-2"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleChangePassword} className="bg-black text-white px-6 py-3 rounded-lg w-full mt-4">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
