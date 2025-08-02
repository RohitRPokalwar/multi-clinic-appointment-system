import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    
    if (token && (!requiredRole || userRole === requiredRole)) {
      setAuthenticated(true);
    }
    
    setLoading(false);
  }, [requiredRole]);
  
  if (loading) {
    // You could render a loading spinner here
    return <div>Loading...</div>;
  }
  
  return authenticated ? element : <Navigate to={`/login/${requiredRole || 'patient'}`} />;
};

export default ProtectedRoute;