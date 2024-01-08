// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const PrivateRoute = ({ element }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
