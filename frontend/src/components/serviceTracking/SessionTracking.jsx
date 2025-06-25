import React, { useState, useEffect } from 'react';
import axios from '../../pages/auth/api/axios';

const SessionTracking = ({ workoutId }) => {
    const token = localStorage.getItem('token');
    const totalSessions = 10;

    const [completedSessions, setCompletedSessions] = useState(
        Array(totalSessions).fill(false)
    );

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserProgress = async () => {
            try {
                const response = await axios.get('/auth/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Assume this is how you get the completed sessions from user data:
                // Adjust this line based on actual response shape
                console.log("response is : ")
                console.log(response)
                const completedCount = response.data?.data?.data?.workoutProgress[0]?.completedSessions || 0;
                console.log("completed count is: ")
                console.log(completedCount);

                const updatedSessions = Array(totalSessions)
                    .fill(false)
                    .map((_, index) => index < completedCount);

                setCompletedSessions(updatedSessions);
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserProgress();
    }, [token]);

    // const handleSessionClick = async (index) => {
    //     const updated = [...completedSessions];
    //     updated[index] = !updated[index];
    //     setCompletedSessions(updated);

    //     const completedCount = updated.filter(Boolean).length;

    //     try {
    //         const response = await axios.post(
    //             'api/workout/complete',
    //             {
    //                 workoutId: workoutId,
    //                 completedSessions: completedCount,
    //             },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                     'Content-Type': 'application/json',
    //                 },
    //             }
    //         );

    //         console.log('Progress saved:', response.data);
    //     } catch (error) {
    //         console.error('Error saving progress:', error.message);
    //     }
    // };
    
    const handleSessionClick = async (index) => {
        try {
            // Only allow marking the next session in sequence
            const currentCompleted = completedSessions.filter(Boolean).length;
            
            // Only allow completing the next session
            if (index !== currentCompleted) {
                console.log('Please complete sessions in order');
                return;
            }
            
            // Since we're marking just one more session as complete, always send 1
            const response = await axios.post(
                'api/workout/complete',
                {
                    workoutId: workoutId,
                    completedSessions: 1, // Always send 1 to increment by one session
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            
            // Update local state based on server response
            if (response.data && response.data.progress) {
                const serverCompletedCount = response.data.progress.completed_sessions;
                // Make sure we don't exceed total sessions
                const actualCompletedCount = Math.min(serverCompletedCount, totalSessions);
                
                const updatedSessions = Array(totalSessions)
                    .fill(false)
                    .map((_, idx) => idx < actualCompletedCount);
                
                setCompletedSessions(updatedSessions);
                console.log('Progress saved:', response.data);
            }
        } catch (error) {
            console.error('Error saving progress:', error.message);
        }
    };


    const completedCount = completedSessions.filter(Boolean).length;
    const completionPercentage = Math.round((completedCount / totalSessions) * 100);

    return (
        <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-bold mb-4 text-center">Progress Tracker</h3>

            {/* Session Boxes */}
            <div className="grid grid-cols-5 gap-4 mb-6">
                {Array.from({ length: totalSessions }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleSessionClick(index)}
                        className={`h-16 w-full rounded-md border-2 text-sm font-semibold transition-colors
                            ${completedSessions[index]
                                ? 'bg-green-500 border-green-600 text-white'
                                : 'bg-gray-100 border-gray-300 hover:bg-gray-200'}`}
                    >
                        Session {index + 1}
                    </button>
                ))}
            </div>

            {/* Progress Display */}
            <div className="text-center">
                <p className="text-lg font-medium">
                    <span className="text-2xl font-bold">{completionPercentage}%</span> completed
                </p>
                <p className="text-sm text-gray-500">
                    {completedCount} of {totalSessions} sessions finished
                </p>
            </div>
        </div>
    );
};

export default SessionTracking;
