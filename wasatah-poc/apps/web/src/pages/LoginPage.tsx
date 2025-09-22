import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../components/ui/Card';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    console.log('Login attempt:', { email, password });
    navigate('/role');
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <Card>
        <CardBody className="p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Login to Wasatah</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label">
                Email
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
              className="btn btn-primary w-full"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Demo credentials: demo@wasatah.app / demo123</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;
