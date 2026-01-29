import React, { useState } from 'react';
import { ViewState, AlumniProfile } from '../../shared/types';
import { Sidebar, MobileNav, MobileHeader, Overview } from './components';

// Lazy load view components for better performance
const Directory = React.lazy(() => import('../directory/Directory').then(m => ({ default: m.Directory })));
const Events = React.lazy(() => import('../events/Events').then(m => ({ default: m.Events })));
const Gallery = React.lazy(() => import('../gallery/Gallery').then(m => ({ default: m.Gallery })));
const Stories = React.lazy(() => import('../stories/Stories').then(m => ({ default: m.Stories })));
const ReconnectionAssistant = React.lazy(() =>
  import('../ai-assistant/ReconnectionAssistant').then(m => ({ default: m.ReconnectionAssistant }))
);
const Membership = React.lazy(() =>
  import('../membership/Membership').then(m => ({ default: m.Membership }))
);
const Donate = React.lazy(() => import('../donation/Donate').then(m => ({ default: m.Donate })));
const Volunteer = React.lazy(() => import('../volunteer/Volunteer').then(m => ({ default: m.Volunteer })));
const Profile = React.lazy(() => import('../profile/Profile').then(m => ({ default: m.Profile })));
const About = React.lazy(() => import('../about/About').then(m => ({ default: m.About })));

interface DashboardProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onLogout: () => void;
  currentUser: AlumniProfile;
  onUpdateUser: (user: AlumniProfile) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentView,
  onChangeView,
  onLogout,
  currentUser,
  onUpdateUser,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD_HOME:
        return <Overview currentUser={currentUser} onChangeView={onChangeView} />;
      case ViewState.DIRECTORY:
        return <Directory />;
      case ViewState.EVENTS:
        return <Events />;
      case ViewState.GALLERY:
        return <Gallery />;
      case ViewState.STORIES:
        return <Stories />;
      case ViewState.AI_ASSISTANT:
        return <ReconnectionAssistant />;
      case ViewState.MEMBERSHIP:
        return <Membership />;
      case ViewState.DONATE:
        return <Donate />;
      case ViewState.VOLUNTEER:
        return <Volunteer />;
      case ViewState.PROFILE:
        return <Profile user={currentUser} onUpdate={onUpdateUser} />;
      case ViewState.ABOUT:
        return <About />;
      default:
        return <Overview currentUser={currentUser} onChangeView={onChangeView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        currentView={currentView}
        onChangeView={onChangeView}
        currentUser={currentUser}
        onLogout={onLogout}
      />

      <MobileHeader isMenuOpen={isMobileMenuOpen} onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      <MobileNav
        currentView={currentView}
        onChangeView={onChangeView}
        onLogout={onLogout}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto min-h-[calc(100vh-6rem)]">
          <React.Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
            {renderView()}
          </React.Suspense>
        </div>
      </main>
    </div>
  );
};
