import { Card, CardBody } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import propertyData from '../data/property.json';
import { useRoleStore } from '../stores/useRoleStore';

const SellerPage = () => {
  const navigate = useNavigate();
  const { currentRole } = useRoleStore();
  
  // Get the featured property from the seed data
  const property = propertyData[0];

  const offers = [
    {
      id: 'offer_001',
      amount: 'SAR 2,500,000',
      buyer: 'Sarah Al-Mansouri',
      buyerEmail: 'sarah@example.com',
      status: 'pending',
      timestamp: '2 hours ago',
      message: 'Interested in this beautiful villa. Please consider my offer.'
    },
    {
      id: 'offer_002',
      amount: 'SAR 2,300,000',
      buyer: 'Khalid Al-Rashid',
      buyerEmail: 'khalid@example.com',
      status: 'declined',
      timestamp: '1 day ago',
      message: 'Looking for a family home in this area.'
    },
    {
      id: 'offer_003',
      amount: 'SAR 2,600,000',
      buyer: 'Fatima Al-Zahra',
      buyerEmail: 'fatima@example.com',
      status: 'pending',
      timestamp: '3 hours ago',
      message: 'Very interested in this property. Can we schedule a viewing?'
    }
  ];

  // Use the ownership history from the property data
  const ownershipHistory = property.ownershipHistory;

  const handleOfferAction = (offerId: string, action: 'accept' | 'decline') => {
    console.log(`${action} offer ${offerId}`);
    // TODO: Implement offer action logic
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
            <p className="text-gray-600">Manage your property listings and track offers</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="success" className="text-sm">
              ✅ Deed Verified
            </Badge>
            <button 
              onClick={() => navigate('/explorer')}
              className="btn btn-secondary"
            >
              🔍 Open Explorer
            </button>
            <button className="btn btn-primary">
              📝 Edit Property
            </button>
          </div>
        </div>
      </div>

      {/* Role Checklist */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">🏘️ Seller Role Capabilities</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-green-800">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  List and manage property listings
                </div>
                <div className="flex items-center text-sm text-green-800">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Review and respond to offers
                </div>
                <div className="flex items-center text-sm text-green-800">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Track ownership history and deed verification
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-green-800">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Access blockchain property records
                </div>
                <div className="flex items-center text-sm text-green-800">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Manage transaction documentation
                </div>
                <div className="flex items-center text-sm text-green-800">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  View property analytics and insights
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Property Details */}
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardBody className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h2>
                  <p className="text-gray-600 mb-4">{property.address}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>🏠 {property.area} sqm</span>
                    <span>🛏️ {property.bedrooms} beds</span>
                    <span>🚿 {property.bathrooms} baths</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600">
                    {property.currency} {property.price.toLocaleString()}
                  </div>
                  <Badge variant="success" className="mt-2">
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Property Images */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {property.images.map((_, index) => (
                  <div key={index} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">🏠 Image {index + 1}</span>
                  </div>
                ))}
              </div>

              {/* Ownership History */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Ownership History</h3>
                <div className="space-y-3">
                  {ownershipHistory.map((owner, index) => {
                    const fromDate = new Date(owner.fromDate).toLocaleDateString();
                    const toDate = owner.toDate ? new Date(owner.toDate).toLocaleDateString() : 'Present';
                    const isCurrentOwner = !owner.toDate;
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-primary-600 font-semibold">
                              {owner.ownerName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{owner.ownerName}</div>
                            <div className="text-sm text-gray-500">{fromDate} - {toDate}</div>
                            <div className="text-xs text-gray-400 capitalize">{owner.transferType}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={owner.deedVerified ? 'success' : 'warning'}>
                            {owner.deedVerified ? '✅ Deed Verified' : '⏳ Pending'}
                          </Badge>
                          <div className="text-sm text-gray-500 mt-1">
                            {isCurrentOwner ? 'Current Owner' : 'Previous Owner'}
                          </div>
                          {owner.verificationAuthority && (
                            <div className="text-xs text-gray-400 mt-1">
                              {owner.verificationAuthority}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Offers Sidebar */}
        <div>
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Offers</h2>
                <Badge variant="primary">{offers.length} Total</Badge>
              </div>
              
              <div className="space-y-4">
                {offers.map((offer) => (
                  <div key={offer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-lg font-bold text-primary-600">{offer.amount}</div>
                      <span className="text-sm text-gray-500">{offer.timestamp}</span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="font-medium text-gray-900">{offer.buyer}</div>
                      <div className="text-sm text-gray-500">{offer.buyerEmail}</div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{offer.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={offer.status === 'pending' ? 'warning' : offer.status === 'accepted' ? 'success' : 'danger'}
                      >
                        {offer.status === 'pending' ? '⏳ Pending' : 
                         offer.status === 'accepted' ? '✅ Accepted' : '❌ Declined'}
                      </Badge>
                      
                      {offer.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleOfferAction(offer.id, 'accept')}
                            className="btn btn-success btn-sm"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleOfferAction(offer.id, 'decline')}
                            className="btn btn-danger btn-sm"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
