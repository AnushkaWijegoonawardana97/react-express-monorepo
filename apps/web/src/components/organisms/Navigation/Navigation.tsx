import { Link, useNavigate } from 'react-router-dom';
import type { NavigationProps } from './Navigation.types';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../constants/routes';
import { Button } from '../../atoms/Button/Button';

export const Navigation = ({ className = '' }: NavigationProps) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <nav className={`flex items-center gap-4 ${className}`}>
      {isAuthenticated ? (
        <>
          <Link
            to={ROUTES.DASHBOARD}
            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Dashboard
          </Link>
          <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link
            to={ROUTES.HOME}
            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <Link to={ROUTES.LOGIN}>
            <Button variant="primary" size="sm">
              Login
            </Button>
          </Link>
        </>
      )}
    </nav>
  );
};
