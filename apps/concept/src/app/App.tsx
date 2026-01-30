import React, { useState } from 'react';
import { LandingPage } from '../features/landing';
import { Dashboard } from '../features/dashboard';
import { ViewState, AlumniProfile } from '../shared/types';

const DEFAULT_USER: AlumniProfile = {
  id: 'user-1',
  name: 'Rahul C.',
  batch: 2010,
  location: 'Raiganj, WB',
  profession: 'Software Engineer',
  avatar: 'https://picsum.photos/id/1012/200/200',
};

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);
  const [dashboardView, setDashboardView] = useState<ViewState>(ViewState.DASHBOARD_HOME);
  const [currentUser, setCurrentUser] = useState<AlumniProfile>(DEFAULT_USER);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAdmin(false);
    setCurrentView(ViewState.DASHBOARD_HOME);
    setDashboardView(ViewState.DASHBOARD_HOME);
  };

  const handleAdminLogin = () => {
    setIsLoggedIn(true);
    setIsAdmin(true);
    setCurrentView(ViewState.ADMIN);
    setDashboardView(ViewState.ADMIN);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentView(ViewState.LANDING);
    setDashboardView(ViewState.DASHBOARD_HOME);
  };

  const handleNavigate = (view: ViewState) => {
    if (view === ViewState.ADMIN_LOGIN) {
      handleAdminLogin();
      return;
    }

    if (!isLoggedIn) {
      setIsLoggedIn(true);
      setIsAdmin(false);
    }

    setDashboardView(view);
    setCurrentView(view);
  };

  const handleUpdateUser = (user: AlumniProfile) => {
    setCurrentUser(user);
  };

  if (!isLoggedIn) {
    return (
      <LandingPage onNavigate={handleNavigate} onLogin={handleLogin} onAdminLogin={handleAdminLogin} />
    );
  }

  return (
    <Dashboard
      currentView={dashboardView}
      onChangeView={setDashboardView}
      onLogout={handleLogout}
      currentUser={currentUser}
      onUpdateUser={handleUpdateUser}
      isAdmin={isAdmin}
    />
  );
};

export default App;
