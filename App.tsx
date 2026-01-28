import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { ViewState, AlumniProfile } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);
  const [dashboardView, setDashboardView] = useState<ViewState>(ViewState.DASHBOARD_HOME);
  
  // User state
  const [currentUser, setCurrentUser] = useState<AlumniProfile>({
    id: 'user-1',
    name: 'Rahul C.',
    batch: 2010,
    location: 'Raiganj, WB',
    profession: 'Software Engineer',
    avatar: 'https://picsum.photos/id/1012/200/200'
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView(ViewState.DASHBOARD_HOME);
    setDashboardView(ViewState.DASHBOARD_HOME);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView(ViewState.LANDING);
    setDashboardView(ViewState.DASHBOARD_HOME);
  };

  const handleNavigate = (view: ViewState) => {
    // For demo purposes, navigating to protected views triggers login
    setIsLoggedIn(true);
    setDashboardView(view);
    setCurrentView(view);
  };

  if (!isLoggedIn) {
    return (
      <LandingPage 
        onNavigate={handleNavigate}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <Dashboard 
      currentView={dashboardView} 
      onChangeView={setDashboardView} 
      onLogout={handleLogout} 
      currentUser={currentUser}
      onUpdateUser={setCurrentUser}
    />
  );
}

export default App;