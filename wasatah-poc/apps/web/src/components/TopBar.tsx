import { Link } from 'react-router-dom';
import { useLedgerStore } from '../stores/useLedgerStore';

const TopBar = () => {
  const { resetLedger } = useLedgerStore();

  const handleReset = async () => {
    try {
      await resetLedger();
      console.log('Demo data reset successfully');
    } catch (error) {
      console.error('Failed to reset demo data:', error);
    }
  };

  return (
    <header className="bg-white shadow-soft border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
              Wasatah.app
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/explorer"
              className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
            >
              Explorer
            </Link>
            <Link
              to="/about-zk"
              className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
            >
              About ZK
            </Link>
            <button
              onClick={handleReset}
              className="btn btn-secondary btn-sm"
            >
              Reset Demo
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
