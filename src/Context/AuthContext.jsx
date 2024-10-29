import { createContext, useContext, useState } from 'react';
import LocalStore from '../Store/LocalStore';

// Create a context
const AuthContext = createContext();

// AuthProvider component to wrap around the app
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => LocalStore.getAuth());
  const [user, setUser] = useState(() => LocalStore.getAuth()?.user);

  // Method to check if auth is authenticated
  const isAuthenticated = () => !!auth;
  
  // Method to check if auth has the required role
  const hasRole = (role) => auth?.user?.Role?.includes(role);

  // Login method (takes authData passed from the SignIn component)
  const login = (authData) => {
    setAuth(authData); 
    LocalStore.storeAuth(authData);
  };

  // Method to update user information (ex user profile)
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    const updatedAuth = { ...auth, user: updatedUser };
    setAuth(updatedAuth); 
    LocalStore.storeAuth(updatedAuth);
  };

  // Logout method
  const logout = () => {
    LocalStore.removeAuth();
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, user, isAuthenticated, hasRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
