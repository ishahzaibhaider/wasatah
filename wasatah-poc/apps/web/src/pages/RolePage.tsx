import { useNavigate } from 'react-router-dom';
import PageHeading from '../components/layout/PageHeading';
import { Card, CardBody } from '../components/ui/Card';

const RolePage = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'buyer',
      title: 'Buyer',
      description: 'Browse properties and make offers',
      icon: '🏠',
      path: '/buyer'
    },
    {
      id: 'seller',
      title: 'Seller',
      description: 'Manage your property listings',
      icon: '🏘️',
      path: '/seller'
    },
    {
      id: 'broker',
      title: 'Broker',
      description: 'Connect buyers and sellers',
      icon: '🤝',
      path: '/broker'
    }
  ];

  const handleRoleSelect = (path: string) => {
    navigate(path);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeading
        title="Select Your Role"
        subtitle="Choose how you want to interact with the Wasatah platform"
        className="text-center"
      />

      <div className="grid md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card
            key={role.id}
            hover
            onClick={() => handleRoleSelect(role.path)}
            className="text-center"
          >
            <CardBody className="p-6">
              <div className="text-4xl mb-4">{role.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
              <p className="text-gray-600">{role.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RolePage;
