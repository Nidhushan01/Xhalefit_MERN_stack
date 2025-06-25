import { useEffect, useState } from "react";
import axios from "../auth/api/axios";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("auth/admin-dashboard", {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        setRequests(response.data.data.pendingTrainers);
      } catch (error) {
        console.error("Error fetching trainer requests", error);
      }
    };

    fetchRequests();
  }, []);

  const handleApproval = async (id, action) => {
    const endpoint = action === "Approved" 
      ? `auth/approve-trainer/${id}` 
      : `auth/reject-trainer/${id}`;

    try {
      await axios.put(endpoint, {}, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      // Update state after approval/rejection
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: action.toLowerCase() } : request
        )
      );
    } catch (error) {
      console.error(`Error ${action === "Approved" ? "approving" : "rejecting"} request`, error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Trainer Requests</h2>

        {requests.length === 0 ? (
          <p className="text-gray-500 text-center">No pending trainer requests.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
                  <th className="p-3">Email</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request._id} className="border-b">
                    <td className="p-3">{request.email}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        request.status === "pending" 
                          ? "bg-yellow-100 text-yellow-600" 
                          : "bg-green-100 text-green-600"
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {request.status === "pending" && (
                        <div className="flex gap-2 justify-center">
                          <button 
                            onClick={() => handleApproval(request._id, "Approved")}
                            className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleApproval(request._id, "Rejected")}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
