import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Send from './pages/Send';
import Contacts from './pages/Contacts';
import Content from './pages/Content';
import Preferences from './pages/Preferences';
import WhatsNew from './pages/WhatsNew';
import UserSettings from './pages/UserSettings';
import Inbox from './pages/inbox/Inbox';
import FormBuilder from './pages/FormBuilder';
import Login from './components/Login'; 
import Register from './components/Register';           // <--- import these
import ForgotPassword from './ForgotPassword'; // <---
import './App.css';

// ProtectedRoute component to guard routes
function ProtectedRoute({ user, children }: { user: any; children: JSX.Element }) {
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false); 
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('User logged out successfully');
    } catch (err: any) {
      console.error('Logout failed:', err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="loader">
        <div className="justify-content-center jimu-primary-loading"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {user && <Sidebar handleLogout={handleLogout} />}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={user ? <Navigate to="/" replace /> : <Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/formbuilder"
              element={
                <ProtectedRoute user={user}>
                  <FormBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/campaigns"
              element={
                <ProtectedRoute user={user}>
                  <Campaigns />
                </ProtectedRoute>
              }
            />
            <Route
              path="/send"
              element={
                <ProtectedRoute user={user}>
                  <Send />
                </ProtectedRoute>
              }
            />
            <Route
              path="/audience"
              element={
                <ProtectedRoute user={user}>
                  <Contacts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/content"
              element={
                <ProtectedRoute user={user}>
                  <Content />
                </ProtectedRoute>
              }
            />
            <Route
              path="/preferences"
              element={
                <ProtectedRoute user={user}>
                  <Preferences />
                </ProtectedRoute>
              }
            />
            <Route
              path="/whats-new"
              element={
                <ProtectedRoute user={user}>
                  <WhatsNew />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings/account"
              element={
                <ProtectedRoute user={user}>
                  <UserSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inbox"
              element={
                <ProtectedRoute user={user}>
                  <Inbox type="all" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inbox/email"
              element={
                <ProtectedRoute user={user}>
                  <Inbox type="email" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inbox/sms"
              element={
                <ProtectedRoute user={user}>
                  <Inbox type="sms" />
                </ProtectedRoute>
              }
            />

            {/* Catch-all Route */}
            <Route 
              path="*" 
              element={<Navigate to={user ? '/' : '/login'} replace />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
