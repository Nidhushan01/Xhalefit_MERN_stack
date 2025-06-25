import { createContext, useState } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState(null);
    const [tempUser, setTempUser] = useState(null);  // Store user data before OTP verification
    const [role, setRole] = useState(null);

    // Check authentication status on mount
    // const checkAuthStatus = async () => {
    //     try {
    //         const response = await axios.get("/api/auth/me", { withCredentials: true});
    //         setUser(response.data.user);
    //         setAccessToken(response.data.accessToken);
    //     }catch(error) {
    //         setUser(null);
    //     }finally {
    //         setLoading(false);
    //     }
    // };

    // Login function
    const login = async (Credential) => {
        try {
            const response = await axios.post("auth/Login", Credential);  // , { withCredentials: true }
            //setUser(response.data.user);
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                setAccessToken(response.data.token);
                localStorage.setItem("role", response.data.role);
                setRole(response.data.role);
            }

        }catch (error) {
            throw new Error(error.response?.data?.message || "Login failed");
        }
    };

    // Logout function
    // const logout = async () => {
    //     try {
    //         await axios.post("/api/auth/logout", {}, { withCredentials: true });
    //         setUser(null);
    //         setAccessToken(null);
    //     }catch (error) {
    //         console.log( "Logout failed", error);
    //     }
    // };

    // Refresh access token
    // const refreshAccessToken = async () => {
    //     try {
    //         const response = await axios.get("/api/auth/refresh", { withCredentials: true });
    //         setAccessToken(response.data.accessToken);
    //     }catch (error) {
    //         setUser(null);
    //         setAccessToken(null);
    //     }
    // };

    // Automatically refresh access token before expiration
    // useEffect(() => {
    //     checkAuthStatus();
    //     const interval = setInterval(() => {
    //         refreshAccessToken();
    //     }, 15 * 60 * 1000); // Refresh every 15 minutes
    //     return () => clearInterval(interval);
    // }, []);
    
    return (
        <AuthContext.Provider value={{ user, login, loading, accessToken, tempUser, setTempUser, setUser, role }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;