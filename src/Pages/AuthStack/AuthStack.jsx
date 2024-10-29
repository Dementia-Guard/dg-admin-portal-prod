import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Authenticate from '../../Store/Authenticate'
import { useAuth } from '../../Context/AuthContext';

export default function AuthStack() {
  const { isAuthenticated, user } = useAuth();

  // If the user is authenticated, redirect them to the home or dashboard page
  if (isAuthenticated()) {
    // Check if user.Role is defined
    if (user?.Role) {
      return <Navigate to={`/app/${user.Role.toLowerCase()}/dashboard`} />;
    } else {
      return <Navigate to="/app" />;
    }
  }

  return (
    <>
      <Outlet />
    </>
  )
}
