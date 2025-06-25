import XhaleFitProfile from '../../components/XhaleFitProfile/XhaleFitProfile';

const ProfileTrainer = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-5 relative">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl w-[1150px] h-[650px] shadow-lg border-2 border-blue-200 relative">
        {/* Circle in the top-right corner */}
        <div className="absolute top-5 right-5 w-24 h-24 bg-red-200 rounded-full"></div>

        {/* Two-column layout */}
        <div className="flex justify-between items-start">
          {/* Left Column: Greeting, Logo, and Description */}
          <XhaleFitProfile />

          {/* Right Column: Profile Info */}
          <div className="absolute top-25 right-10 w-[356px] h-[679px]">
            <div className="flex flex-col gap-5 h-full overflow-y-auto">
              <div className="w-full">
                <h3 className="text-lg text-gray-800 mb-2">ACCOUNT INFO</h3>
                <p className="text-sm text-gray-600 font-semibold">User name</p>
                <p className="text-sm text-gray-600 font-semibold">User ID</p>
                <p className="text-sm text-gray-600 font-semibold">E mail</p>
                <p className="text-sm text-gray-600 font-semibold">Date Of Birth</p>
                <p className="text-sm text-gray-600 font-semibold">Address</p>
                <p className="text-sm text-gray-600 font-semibold mt-5">Contact No.</p>
                <p className="text-sm text-gray-600 font-semibold">Service Type</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTrainer;
