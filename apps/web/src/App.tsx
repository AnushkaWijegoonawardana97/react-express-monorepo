import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/templates/PublicLayout/PublicLayout';
import { PrivateLayout } from './components/templates/PrivateLayout/PrivateLayout';
import { ProtectedRoute } from './components/organisms/ProtectedRoute/ProtectedRoute';
import { HomePage } from './components/pages/HomePage/HomePage';
import { LoginPage } from './components/pages/LoginPage/LoginPage';
import { DashboardPage } from './components/pages/DashboardPage/DashboardPage';
import { ROUTES } from './constants/routes';

function App() {
  console.log('App component rendering');
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />
        <Route
          path={ROUTES.LOGIN}
          element={
            <PublicLayout>
              <LoginPage />
            </PublicLayout>
          }
        />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <DashboardPage />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
