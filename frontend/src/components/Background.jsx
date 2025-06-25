// Background.jsx
import React from 'react';

const Background = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[rgb(224,210,248)] relative overflow-hidden">
      {/* Top right quarter circles */}
      <div className="absolute top-0 right-0 w-30 h-30 md:w-40 md:h-40 lg:w-80 lg:h-80">
        {/* Largest circle - rgb(194, 152, 159) */}
        <div className="absolute top-0 right-0 rounded-bl-full bg-[rgb(194,152,159)] w-full h-full"></div>
        {/* Second largest circle - rgb(190, 145, 145) */}
        <div className="absolute top-0 right-0 rounded-bl-full bg-[rgb(190,145,145)] w-[83%] h-[83%]"></div>
        {/* Third largest circle - rgb(205, 175, 175) */}
        <div className="absolute top-0 right-0 rounded-bl-full bg-[rgb(205,175,175)] w-[70%] h-[70%]"></div>
        {/* Smallest circle - rgb(251, 201, 201) */}
        <div className="absolute top-0 right-0 rounded-bl-full bg-[rgb(251,201,201)] w-[60%] h-[60%]"></div>
      </div>

      {/* Bottom left quarter circles */}
      <div className="absolute bottom-0 left-0 w-30 h-30 md:w-40 md:h-40 lg:w-80 lg:h-80">
        {/* Largest circle - rgb(200, 180, 180) */}
        <div className="absolute bottom-0 left-0 rounded-tr-full bg-[rgb(200,180,180)] w-full h-full"></div>
        {/* Middle circle - rgb(224, 210, 248) */}
        <div className="absolute bottom-0 left-0 rounded-tr-full bg-[rgb(224,210,248)] w-[85%] h-[85%]"></div>
        {/* Smallest circle - rgb(251, 201, 201) */}
        <div className="absolute bottom-0 left-0 rounded-tr-full bg-[rgb(251,201,201)] w-[80%] h-[80%]"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Background;