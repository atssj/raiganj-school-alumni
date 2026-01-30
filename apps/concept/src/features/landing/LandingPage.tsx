import React from 'react';
import { ViewState } from '../../shared/types';
import { LoginModal } from '../auth/components/LoginModal';
import { Header, Hero, About, Gallery, Features, Footer } from './components';
import { useMobileMenu, useLoginModal } from './hooks';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
  onLogin: () => void;
  onAdminLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onLogin, onAdminLogin }) => {
  const { isOpen: isLoginModalOpen, open: openLoginModal, close: closeLoginModal } = useLoginModal();
  const {
    isOpen: isMobileMenuOpen,
    toggle: toggleMobileMenu,
    close: closeMobileMenu,
  } = useMobileMenu();

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden">
      <Header
        onNavigate={onNavigate}
        onLoginClick={openLoginModal}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={toggleMobileMenu}
        onMobileMenuClose={closeMobileMenu}
      />

      <main className="flex-1">
        <Hero onNavigate={onNavigate} />
        <About onNavigate={onNavigate} />
        <Gallery onNavigate={onNavigate} />
        <Features onNavigate={onNavigate} />
      </main>

      <Footer onNavigate={onNavigate} onLoginClick={openLoginModal} onAdminLogin={onAdminLogin} />

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onLogin={onLogin} />
    </div>
  );
};
