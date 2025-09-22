import { useState } from 'react';

const BuyerPage = () => {
  const [offerAmount, setOfferAmount] = useState('');

  const handleMakeOffer = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement offer submission
    console.log('Making offer:', offerAmount);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Buyer Dashboard</h1>
        <p className="text-gray-600">Browse verified properties and make offers</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Property Listing */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Featured Property</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Luxury Villa in Riyadh</h3>
              <p className="text-gray-600">Al Olaya District, Riyadh</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Deed Verified
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  ZKP Verified
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Property Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Bedrooms:</span>
                  <span className="ml-2 font-medium">5</span>
                </div>
                <div>
                  <span className="text-gray-600">Bathrooms:</span>
                  <span className="ml-2 font-medium">4</span>
                </div>
                <div>
                  <span className="text-gray-600">Area:</span>
                  <span className="ml-2 font-medium">450 sqm</span>
                </div>
                <div>
                  <span className="text-gray-600">Year Built:</span>
                  <span className="ml-2 font-medium">2018</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Asking Price</h4>
              <p className="text-2xl font-bold text-primary-600">SAR 2,800,000</p>
            </div>
          </div>
        </div>

        {/* Make Offer */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Make an Offer</h2>
          <form onSubmit={handleMakeOffer} className="space-y-4">
            <div>
              <label htmlFor="offerAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Offer Amount (SAR)
              </label>
              <input
                type="number"
                id="offerAmount"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your offer amount"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <textarea
                id="message"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Add a message to the seller"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
            >
              Submit Offer
            </button>
          </form>
        </div>
      </div>

      {/* My Offers */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">My Offers</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">Luxury Villa - Riyadh</h3>
                <p className="text-sm text-gray-600">SAR 2,500,000</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>
            <p className="text-sm text-gray-600">Submitted 2 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerPage;
