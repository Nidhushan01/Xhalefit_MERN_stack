import XhaleFitProfile from '../../components/XhaleFitProfile/XhaleFitProfile';

const ProfileUser = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-5">
      {/* Profile Card Container */}
      <div className="relative bg-white w-[1150px] h-[650px] rounded-2xl shadow-lg border-2 border-blue-200 p-0 flex justify-between ">
        
        {/* Top Right Circle */}
        <div className="absolute top-5 right-5 w-24 h-24 bg-red-200 rounded-full"></div>
        
        {/* Left Column */}
        <XhaleFitProfile />

        {/* Right Column */}
        <div className="absolute top-25 right-10 w-[356px] h-[679px] overflow-y-auto">
          <div className="space-y-6">
            {/* Account Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">ACCOUNT INFO</h3>
              <p className="text-sm text-gray-700"><strong>User name</strong></p>
              <p className="text-sm text-gray-700"><strong>User ID</strong></p>
              <p className="text-sm text-gray-700"><strong>Email</strong></p>
              <p className="text-sm text-gray-700"><strong>Date Of Birth</strong></p>
              <p className="text-sm text-gray-700"><strong>Address</strong></p>
              <p className="text-sm text-gray-700 mt-4"><strong>Contact No.</strong></p>
            </div>
            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">PERSONAL INFO</h3>
              <p className="text-sm text-gray-700"><strong>Weight</strong></p>
              <p className="text-sm text-gray-700"><strong>Height</strong></p>
              <p className="text-sm text-gray-700"><strong>Past Treatments</strong></p>
              <p className="text-sm text-gray-700"><strong>Past Injuries/Surgeries</strong></p>
              <p className="text-sm text-gray-700"><strong>Current Treatments Undergoing</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
