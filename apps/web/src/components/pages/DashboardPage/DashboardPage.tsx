import { Card } from '../../molecules/Card/Card';
import { Button } from '../../atoms/Button/Button';
import { useAuth } from '../../../hooks/useAuth';

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your protected dashboard, {user?.name}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Statistics">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Users</span>
              <span className="font-semibold">1,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Sessions</span>
              <span className="font-semibold">567</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Revenue</span>
              <span className="font-semibold">$12,345</span>
            </div>
          </div>
        </Card>

        <Card title="Recent Activity" headerActions={<Button size="sm" variant="ghost">View All</Button>}>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="font-medium text-gray-900">New user registered</p>
              <p className="text-gray-500">2 hours ago</p>
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">System update completed</p>
              <p className="text-gray-500">5 hours ago</p>
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">Backup created</p>
              <p className="text-gray-500">1 day ago</p>
            </div>
          </div>
        </Card>

        <Card title="Quick Actions">
          <div className="space-y-2">
            <Button variant="primary" size="md" fullWidth>
              Create New
            </Button>
            <Button variant="outline" size="md" fullWidth>
              Import Data
            </Button>
            <Button variant="outline" size="md" fullWidth>
              Export Report
            </Button>
          </div>
        </Card>
      </div>

      <Card title="User Information">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{user?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">User ID:</span>
            <span className="font-medium">{user?.id}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
