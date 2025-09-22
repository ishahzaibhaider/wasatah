const BrokerPage = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Broker Dashboard</h1>
        <p className="text-gray-600">Connect buyers and sellers in the Wasatah network</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Active Connections */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Active Connections</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Luxury Villa - Riyadh</h3>
                <span className="text-sm text-green-600">Active</span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Seller: Ahmed Al-Rashid</p>
                <p>Buyer: Sarah Al-Mansouri</p>
                <p>Offer: SAR 2,500,000</p>
              </div>
              <div className="mt-3">
                <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700">
                  Facilitate Meeting
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Available Properties */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Available Properties</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">Modern Apartment - Jeddah</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Price: SAR 1,800,000</p>
                <p>Status: Available</p>
                <p>Seller: Fatima Al-Zahra</p>
              </div>
              <div className="mt-3">
                <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200">
                  Connect Buyers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Broker Stats */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Broker Statistics</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">12</div>
            <div className="text-sm text-gray-600">Active Connections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-600">Completed Deals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">SAR 45M</div>
            <div className="text-sm text-gray-600">Total Volume</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">4.8</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerPage;
