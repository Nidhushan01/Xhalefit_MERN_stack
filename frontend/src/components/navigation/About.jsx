import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate('/dashboard') // or whatever your dashboard route is
      }
  return (
    <>
      <div className="max-w-4xl mx-auto text-center bg-white">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-600">
            XhaleFit is dedicated to providing personalized fitness and rehabilitation solutions.
            Our mission is to empower users in Sri Lanka to achieve better health through tailored workout plans and recovery therapies.
        </p>
        <button
          onClick={handleNavigateHome}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
        >
          Home
        </button>
    </div>
    </>
  )
}

export default About