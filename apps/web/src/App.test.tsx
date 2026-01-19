import { BrowserRouter } from 'react-router-dom';
import { PublicLayout } from './components/templates/PublicLayout/PublicLayout';
import { HomePage } from './components/pages/HomePage/HomePage';

export const TestApp = () => {
  return (
    <BrowserRouter>
      <PublicLayout>
        <HomePage />
      </PublicLayout>
    </BrowserRouter>
  );
};
