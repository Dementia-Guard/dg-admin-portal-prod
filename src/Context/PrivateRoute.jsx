// PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function PrivateRoute({ roles }) {
  const { isAuthenticated, hasRole, user } = useAuth(); // Destructure user from useAuth

  if (!isAuthenticated()) {
    return <Navigate to="/auth/signIn" />;
  }

  if (roles && !roles.some(role => hasRole(role))) {
    // return <Navigate to="/notauthorized" />;
    return <Navigate to={`/app/${user.Role ? user.Role.toLowerCase() : ''}/dashboard`} />;
  }

  // Render the child routes if authenticated and has the required role
  return <Outlet />;
}
