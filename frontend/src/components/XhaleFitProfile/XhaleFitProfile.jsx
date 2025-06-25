import logo from "../../assets/logo.png";

export default function XhaleFitProfile({ profileText = "Profile", height = 550, width = 430 }) {
  return (
    <div 
      className="relative bg-[#E8D1D1] shadow-lg rounded-[20px] p-6 flex flex-col items-center justify-center"
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <h1 className="text-[48px] md:text-[72px] font-[Poor Richard] text-[#401717] text-center">
        Hello!
      </h1>

      {/* Logo Image */}
      <img src={logo} alt="XhaleFit Logo" className="w-[200px] md:w-[300px] my-6" />

      <p className="text-center text-[14px] md:text-[15px] font-medium font-[Sofia Sans] text-black max-w-[90%]">
        XhaleFit is a smart fitness and rehabilitation platform that offers personalized plans, expert guidance, and seamless tracking. With structured planning, progress monitoring, and smart reminders, it helps users stay on track and achieve their wellness goals effectively.
      </p>

      <h2 className="text-[32px] md:text-[50px] font-[Protest Strike] text-[#2E0D0D] mt-4">
        {profileText}
      </h2>      
    </div>
  );
}
