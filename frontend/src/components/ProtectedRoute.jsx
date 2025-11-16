import React from 'react';
import { useAuth } from '../auth/AuthContext';
import Login from './Login';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0e27',
        color: '#fff'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Login />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

