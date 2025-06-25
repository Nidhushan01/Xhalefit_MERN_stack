import React, { useState } from "react";
import Logo from "../../assets/images/Logo.jpg"
import Physiotherapy from "../../assets/images/CustomizePlan/Physiotherapy.png"
import MyofascialRelease from "../../assets/images/CustomizePlan/MyofascialRelease.png"
import PositionalRelease from "../../assets/images/CustomizePlan/PositionalRelease.png"
import SwedishMassage from "../../assets/images/CustomizePlan/SwedishMassage.png"
import ScarTissueRemodeling from "../../assets/images/CustomizePlan/ScarTissueRemodeling.png"
import Pranayama from "../../assets/images/CustomizePlan/Pranayama.png"
import HeatTherapy from "../../assets/images/CustomizePlan/HeatTherapy.png"
import MassageChairTherapy from "../../assets/images/CustomizePlan/MassageChairTherapy.png"
import Aromatherapy from "../../assets/images/CustomizePlan/Aromatherapy.png"
import SteamBath from "../../assets/images/CustomizePlan/SteamBath & Sauna.png"

const primaryImages = [
    { id: 1, title: "Physiotherapy", src: Physiotherapy },
    { id: 2, title: "Myofascial Release", src: MyofascialRelease },
    { id: 3, title: "Positional Release", src: PositionalRelease },
    { id: 4, title: "Swedish Massage", src: SwedishMassage },
    { id: 5, title: "Scar Tissue Remodeling", src: ScarTissueRemodeling },
    { id: 6, title: "Pranayama", src: Pranayama },
    { id: 7, title: "HeatTherapy", src: HeatTherapy },
    { id: 8, title: "MassageChairTherapy", src: MassageChairTherapy },
    { id: 9, title: "Aromatherapy", src: Aromatherapy },
    { id: 10, title: "SteamBath", src:SteamBath },
  ];

const Step2 = ({ onDone }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const toggleSelection = (id) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDone = () => {
    const selectedTitles = primaryImages
      .filter((image) => selectedImages.includes(image.id))
      .map((image) => image.title);
    onDone(selectedTitles);
  };


  return (
    <div className="relative w-full min-h-screen flex justify-center items-center p-4">
          {/* Main Content */}
          <div className="relative w-full max-w-5xl bg-white bg-opacity-70 shadow-lg rounded-2xl p-6 md:p-12">
            <div className="flex flex-col md:flex-row items-center space-x-4">
                <img src={Logo} alt="XhaleFit Logo" className="w-20 h-20 md:w-80 md:h-32"/>
                <h1 className="text-[#401717] text-4xl md:text-5xl font-bold text-center md:text-left">
                    Customize Rehabilitation Plans
                </h1>
            </div>
        
        {/* Greeting */}
        <h2 className="text-5xl font-['Poor_Richard'] text-red-900 mt-12 mb-6">Hello!</h2>

        {/* Paragraph after first two images */}
        <p className="text-xl text-center text-gray-700 my-6">
        Unlock a recovery journey tailored just for you – our expert-crafted plans adapt to your needs, guiding you every step of the way!
        </p>
        
        {/* Image section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {primaryImages.slice(0, 2).map((image) => (
            <div
              key={image.id}
              className={`border-4 rounded-lg cursor-pointer transition-all text-center font-bold ${selectedImages.includes(image.id) ? "border-blue-500" : "border-transparent"}`}
              onClick={() => toggleSelection(image.id)}
            >
              <img src={image.src} alt={image.title} className="w-full h-40 object-cover rounded-lg" />
              <p className="mt-2">{image.title}</p>
            </div>
          ))}
        </div>

        {/* Paragraph after first two images */}
        <p className="text-xl text-center text-gray-700 my-6">
            You may select additionally  from these expertly designed rehabilitation plans, tailored to support your recovery and progress seamlessly!
        </p>
        {/* Done button */}

          {/* Remaining images */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {primaryImages.slice(2).map((image) => (
                <div
                key={image.id}
                className={`border-4 rounded-lg cursor-pointer transition-all text-center font-bold ${
                    selectedImages.includes(image.id) ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => toggleSelection(image.id)}
                >
                <img src={image.src} alt={image.title} className="w-full h-40 object-cover rounded-lg" />
                <p className="mt-2">{image.title}</p>
                </div>
            ))}
        </div>

        <div className="flex justify-center my-12">
          <button 
          className="bg-black text-white font-black text-2xl py-3 px-12 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={handleDone}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2;