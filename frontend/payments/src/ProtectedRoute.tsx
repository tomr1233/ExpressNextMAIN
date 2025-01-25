import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  user: any;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  if (!user) {
    // Not logged in; redirect to /login
    return <Navigate to="/login" replace />;
  }
  // If logged in, show the protected content
  return children;
};

export default ProtectedRoute;
