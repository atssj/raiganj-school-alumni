import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: {
    id: string;
    name: string;
    batch: number;
    location: string;
    profession: string;
    avatar: string;
  } | null;
  login: (asAdmin?: boolean) => void;
  logout: () => void;
}

const DEFAULT_USER = {
  id: 'user-1',
  name: 'Rahul C.',
  batch: 2010,
  location: 'Raiganj, WB',
  profession: 'Software Engineer',
  avatar: 'https://picsum.photos/id/1012/200/200',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<AuthContextType['user']>(null);

  const login = (asAdmin = false) => {
    setIsLoggedIn(true);
    setIsAdmin(asAdmin);
    setUser(asAdmin ? null : DEFAULT_USER);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return <>{children}</>;
};

export const AdminRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isAdmin } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
