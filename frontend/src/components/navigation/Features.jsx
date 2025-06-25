import React from 'react'
import { useNavigate } from 'react-router-dom'

const Features = () => {
    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate('/dashboard') // or whatever your dashboard route is
      }
  return (
    <div className="max-w-4xl mx-auto text-center bg-white">
      <h1 className="text-3xl font-bold mb-4">Features</h1>
      <p className="text-gray-600">
        Discover the core functionalities of XhaleFit. 
        Our app offers personalized workout and rehabilitation plans along with AI-driven insights and progress tracking.
      </p>
      <button
          onClick={handleNavigateHome}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
        >
          Home
        </button>
    </div>

  )
}

export default Features