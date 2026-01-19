import { Card } from '../../molecules/Card/Card';
import { Button } from '../../atoms/Button/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

export const HomePage = () => {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Our Application
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          This is a public home page demonstrating the atomic design structure.
        </p>
        <Link to={ROUTES.LOGIN}>
          <Button variant="primary" size="lg">
            Get Started
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Feature 1">
          <p className="text-gray-600 mb-4">
            This card demonstrates the Card molecule component from the atomic design structure.
          </p>
          <Button variant="outline" size="sm" fullWidth>
            Learn More
          </Button>
        </Card>

        <Card title="Feature 2">
          <p className="text-gray-600 mb-4">
            Molecules are composed of atoms and provide more complex functionality.
          </p>
          <Button variant="outline" size="sm" fullWidth>
            Learn More
          </Button>
        </Card>

        <Card title="Feature 3">
          <p className="text-gray-600 mb-4">
            This structure promotes reusability and maintainability.
          </p>
          <Button variant="outline" size="sm" fullWidth>
            Learn More
          </Button>
        </Card>
      </div>
    </div>
  );
};
