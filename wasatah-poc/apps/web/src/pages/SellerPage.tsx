const SellerPage = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
        <p className="text-gray-600">Manage your property listings and track offers</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Property Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Luxury Villa in Riyadh</h3>
              <p className="text-gray-600">Al Olaya District, Riyadh</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Deed Verified
              </span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Ownership History</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ahmed Al-Rashid</span>
                  <span>2020 - Present</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Mohammed Al-Saud</span>
                  <span>2015 - 2020</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Fatima Al-Zahra</span>
                  <span>2010 - 2015</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offers */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Offers</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">SAR 2,500,000</span>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
              <p className="text-sm text-gray-600">From: Sarah Al-Mansouri</p>
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pending Review
                </span>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">SAR 2,300,000</span>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>
              <p className="text-sm text-gray-600">From: Khalid Al-Rashid</p>
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Declined
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
