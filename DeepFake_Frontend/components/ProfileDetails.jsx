export default function ProfileDetails() {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-8">Profile details</h2>
  
        {/* Profile Information */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="rounded-full w-20 h-20"
            />
            <div>
              <h3 className="font-bold text-lg">Jaylon Dias</h3>
            </div>
          </div>
          <a href="#" className="text-blue-500 font-medium">
            Edit profile
          </a>
        </div>
  
        <hr className="my-6" />
  
        {/* Email Section */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-700 mb-2">Email addresses</h4>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>example@clerk.dev</span>
              <span className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded-md">
                Primary
              </span>
            </li>
            <li>example@personal.com</li>
            <li>email@work.io</li>
          </ul>
          <a href="#" className="text-blue-500 mt-3 block">
            + Add email address
          </a>
        </div>
  
        <hr className="my-6" />
  
        {/* Phone Number Section */}
        <div className="mb-6">
          <h4 className="font-bold text-gray-700 mb-2">Phone number</h4>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>+1 (555) 123-4567</span>
              <span className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded-md">
                Primary
              </span>
            </li>
          </ul>
          <a href="#" className="text-blue-500 mt-3 block">
            + Add phone number
          </a>
        </div>
  
        <hr className="my-6" />
  
        {/* Connected Accounts Section */}
        <div>
          <h4 className="font-bold text-gray-700 mb-2">Connected accounts</h4>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm">Google</span>
                <span className="text-sm text-gray-600">example@email.com</span>
              </div>
            </li>
          </ul>
          <a href="#" className="text-blue-500 mt-3 block">
            + Connect account
          </a>
        </div>
      </div>
    );
  }
  