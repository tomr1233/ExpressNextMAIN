import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ user, children }: { user: any; children: JSX.Element }) {
  return user ? children : <Navigate to="/login" />;
}