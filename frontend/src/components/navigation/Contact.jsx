import React from 'react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate('/dashboard') // or whatever your dashboard route is
      }

  return (
    <>
      <div className="max-w-4xl mx-auto text-center bg-white">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-gray-600">
        Have questions or need support? Contact us at info@xhalefit.com or call us at 123-456-7890. We are here to help.
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

export default Contact