import React from 'react';
import {
  Header,
  Hero,
  Footer,
  SchoolHistory,
  NostalgiaSection,
  AlumniSuccess,
  AlumniTestimonials,
  UpcomingEvents,
  JoinCTA,
} from './components';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden">
      <Header />

      <main className="flex-1">
        <Hero />
        <SchoolHistory />
        <NostalgiaSection />
        <AlumniSuccess />
        <AlumniTestimonials />
        <UpcomingEvents />
        <JoinCTA />
      </main>

      <Footer />
    </div>
  );
};
