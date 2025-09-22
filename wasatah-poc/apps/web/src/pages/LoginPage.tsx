import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../components/ui/Card';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Login attempt:', { email, password });
    navigate('/role');
    setIsLoading(false);
  };

  const handleDemoLogin = () => {
    setEmail('demo@wasatah.app');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-2xl">🏠</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to Wasatah
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Blockchain + AI Real Estate Platform
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl">
          <CardBody className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            
            {/* Demo Credentials */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo Access</span>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <button
                  onClick={handleDemoLogin}
                  className="btn btn-secondary w-full"
                >
                  🚀 Use Demo Credentials
                </button>
                <p className="mt-2 text-xs text-gray-500">
                  Email: demo@wasatah.app | Password: demo123
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Features */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Experience the future of real estate with blockchain technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
