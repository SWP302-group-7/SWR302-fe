import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { useSelector } from 'react-redux';
import type { RootState } from './store/index.ts';
import type { AuthState } from './types';

// Import layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

// Import pages
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import ServicesPage from './pages/services/ServicesPage';
import AppointmentPage from './pages/appointment/AppointmentPage';
import ConsultationPage from './pages/consultation/ConsultationPage';
import AdminDashboardPage from './pages/admin/DashboardPage';
import AboutPage from './pages/about/AboutPage';
import TeamPage from './pages/team/TeamPage';
import ContactPage from './pages/contact/ContactPage';
import CycleTrackingPage from './pages/cycle/CycleTrackingPage';
import ConsultationQAPage from './pages/consultation/ConsultationQAPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  requiredRole?: 'admin' | 'doctor' | 'patient';
  userRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  requiredRole,
  userRole
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth as AuthState);

  return (
    <Routes>
      {/* Main Layout Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="contact" element={<ContactPage />} />

        {/* Protected Routes */}
        <Route path="app">
          <Route path="profile" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="appointments" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AppointmentPage />
            </ProtectedRoute>
          } />
          <Route path="consultations" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ConsultationPage />
            </ProtectedRoute>
          } />
          <Route path="cycle-tracking" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CycleTrackingPage />
            </ProtectedRoute>
          } />
          <Route path="qa" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ConsultationQAPage />
            </ProtectedRoute>
          } />
        </Route>
      </Route>

      {/* Auth Layout Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="reset-password" element={<div>Reset Password Page</div>} />
      </Route>

      {/* Admin Layout Routes */}
      <Route path="/admin" element={
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          requiredRole="admin"
          userRole={user?.role}
        >
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboardPage />} />
        <Route path="users" element={<div>Users Management</div>} />
        <Route path="appointments" element={<div>Appointments Management</div>} />
        <Route path="consultations" element={<div>Consultations Management</div>} />
        <Route path="services" element={<div>Services Management</div>} />
        <Route path="reports" element={<div>Reports</div>} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
