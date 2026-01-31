import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden">
      {/* 
        We use variant="solid" so the header has a white background 
        and dark text, suitable for pages without a hero image.
      */}
      <Header variant="solid" />

      {/* 
        Add top padding to account for the fixed header height.
        Header is roughly 80px-96px tall depending on state.
      */}
      <main className="flex-1 pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
