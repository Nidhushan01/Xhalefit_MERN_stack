import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../auth/api/axios";

const AssignWorkout = () => {
  const navigate = useNavigate();
  const { surveyId } = useParams();

  const [exercises, setExercises] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [plan, setPlan] = useState("Gold");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch exercises (available services)
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get("/auth/trainer-dashboard", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setExercises(response.data?.data?.availableServices || []);
      } catch (error) {
        console.error("Failed to fetch exercises", error);
      }
    };

    fetchExercises();
  }, []);

  const handleSubmit = async () => {
    if (!selectedExerciseId) {
      alert("Please select an exercise.");
      return;
    }

    setLoading(true);
    console.log("log data");
    console.log(surveyId);
    console.log(localStorage.getItem("token"));
    console.log(notes)
    console.log(plan)
    console.log(selectedExerciseId)

    try {
      await axios.put(
        `/auth/survey/${surveyId}`,
        {
          suggested_workout_id: selectedExerciseId,
          suggested_plan: plan,
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Workout assigned successfully!");
      navigate("/trainer");
    } catch (error) {
      console.error("Error assigning workout", error);
      alert("Failed to assign workout.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-6">Assign Workout Plan</h2>

      <div className="space-y-6 max-w-3xl">
        {/* List of Exercises */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Available Workouts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercises.map((exercise) => (
              <div
                key={exercise._id}
                className={`border rounded-xl p-4 cursor-pointer transition duration-200 ${
                  selectedExerciseId === exercise._id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
                onClick={() => setSelectedExerciseId(exercise._id)}
              >
                <h4 className="text-lg font-bold text-gray-800">
                  {exercise.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Difficulty:</strong> {exercise.difficulty}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  {exercise.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Plan Select */}
        <div>
          <label className="block font-medium mb-1">Select Plan</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          >
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block font-medium mb-1">Notes</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special notes or observations..."
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Assigning..." : "Assign Workout"}
        </button>
      </div>
    </div>
  );
};

export default AssignWorkout;
