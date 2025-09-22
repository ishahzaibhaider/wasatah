const ExplorerPage = () => {
  const transactions = [
    {
      id: 'tx_001',
      type: 'Property Listed',
      timestamp: '2024-09-22 10:30:00',
      hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
      details: {
        property: 'Luxury Villa - Riyadh',
        owner: 'Ahmed Al-Rashid',
        price: 'SAR 2,800,000'
      }
    },
    {
      id: 'tx_002',
      type: 'Offer Made',
      timestamp: '2024-09-22 14:15:00',
      hash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
      details: {
        buyer: 'Sarah Al-Mansouri',
        amount: 'SAR 2,500,000',
        property: 'Luxury Villa - Riyadh'
      }
    },
    {
      id: 'tx_003',
      type: 'Identity Verification',
      timestamp: '2024-09-22 09:45:00',
      hash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
      details: {
        user: 'Sarah Al-Mansouri',
        status: 'Verified',
        method: 'NAFTA-SIM'
      }
    },
    {
      id: 'tx_004',
      type: 'Deed Verification',
      timestamp: '2024-09-22 08:20:00',
      hash: '0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      details: {
        property: 'Luxury Villa - Riyadh',
        status: 'Verified',
        authority: 'Saudi Land Registry'
      }
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Property Listed':
        return 'bg-blue-100 text-blue-800';
      case 'Offer Made':
        return 'bg-yellow-100 text-yellow-800';
      case 'Identity Verification':
        return 'bg-green-100 text-green-800';
      case 'Deed Verification':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blockchain Explorer</h1>
        <p className="text-gray-600">View all transactions and verifications on the Wasatah network</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Transaction History</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(tx.type)}`}>
                      {tx.type}
                    </span>
                    <span className="text-sm text-gray-500">{tx.timestamp}</span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm font-mono text-gray-600 break-all">
                      Hash: {tx.hash}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(tx.details).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="font-medium text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="ml-2 text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Network Stats */}
      <div className="mt-8 grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-primary-600">4</div>
          <div className="text-sm text-gray-600">Total Transactions</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-green-600">2</div>
          <div className="text-sm text-gray-600">Verified Properties</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">3</div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">100%</div>
          <div className="text-sm text-gray-600">Verification Rate</div>
        </div>
      </div>
    </div>
  );
};

export default ExplorerPage;
