import { useParams } from "react-router-dom";

const AlreadyAssigned = () => {
  //const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Workout Already Assigned</h2>
        {/* <p className="text-gray-600 mb-6">
          A workout has already been assigned for survey ID: <span className="font-semibold">{id}</span>
        </p> */}
        <a
          href="/trainer"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
};

export default AlreadyAssigned;
