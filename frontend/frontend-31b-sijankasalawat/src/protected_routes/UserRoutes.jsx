import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const UserRoutes = () => {
  // get user data
  const user = JSON.parse(localStorage.getItem('user'));

  if (user !== null) {
    return <Outlet />;
  } else {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/" />;
  }
};

export default UserRoutes;