import { useState, useEffect, useContext } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import axios from "../../pages/auth/api/axios";
import { AuthContext } from "../../pages/auth/context/AuthProvider";
import { useNavigate } from "react-router-dom";

const SurveyForm = () => {
  const [step, setStep] = useState(1);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("jeeva")
  console.log(user?.data?.userProfile?.email);
  console.log(user?.data?.userProfile?._id);
  console.log(localStorage.getItem("token"));

  const [formData, setFormData] = useState(() => {
    // Retrieve stored data if available, otherwise initialize default values
    const savedData = JSON.parse(localStorage.getItem("surveyFormData") || "{}");

    return Object.keys(savedData).length > 0
    ? savedData
    : {
          name: "",
          dateOfBirth: "",
          gender: "",
          contact: "",
          emergencyContact: "",
          address: "",
          occupation: "",
          height: "",
          weight: "",
          injuries: "",
          medicalReports: null,
          previousTreatment: "",
          difficulty: "",
          reason: "",
          preferredDays: "",
        };
  });

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("surveyFormData", JSON.stringify(formData));
  }, [formData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: e.target.files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Navigation
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const url = `auth/survey/`;
      await axios.post(
        url,
        JSON.stringify({"user_id":user.data.userProfile._id, "survey_data":formData}),
        {
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          //withCredentials: true,
        }
      );
      console.log("hello");
    }catch (error) {
      console.error("Error submitting survey", error);
    }
    console.log("Final Form Data:", formData);
    alert("Survey submitted successfully!");

    // Clear localStorage after successful submission
    localStorage.removeItem("surveyFormData");
    navigate("/dashboard");

  };

  return (
    <div>
      {step === 1 && <Step1 formData={formData} handleChange={handleChange} nextStep={nextStep} />}
      {step === 2 && <Step2 formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <Step3 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} prevStep={prevStep} />}
    </div>
  );
};

export default SurveyForm;
