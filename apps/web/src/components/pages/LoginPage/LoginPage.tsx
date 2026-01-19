import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../molecules/Card/Card';
import { FormField } from '../../molecules/FormField/FormField';
import { Button } from '../../atoms/Button/Button';
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../constants/routes';
import { validateEmail } from '../../../utils';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password });
      navigate(ROUTES.DASHBOARD);
    } catch {
      setErrors({ email: 'Invalid credentials. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card title="Login">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
            fullWidth
            placeholder="Enter your email"
          />

          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
            fullWidth
            placeholder="Enter your password"
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Demo: Use any email and password (min 8 chars) to login</p>
        </div>
      </Card>
    </div>
  );
};
