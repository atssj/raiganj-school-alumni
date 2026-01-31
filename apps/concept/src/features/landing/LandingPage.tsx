import React, { Suspense, lazy } from 'react';
import {
  Header,
  Hero,
  Footer,
} from './components';
import { SectionSkeleton } from '../../shared/components';

// Lazy load sections below the fold for better performance
const SchoolHistory = lazy(() => import('./components/SchoolHistory').then(m => ({ default: m.SchoolHistory })));
const NostalgiaSection = lazy(() => import('./components/NostalgiaSection').then(m => ({ default: m.NostalgiaSection })));
const AlumniSuccess = lazy(() => import('./components/AlumniSuccess').then(m => ({ default: m.AlumniSuccess })));
const AlumniTestimonials = lazy(() => import('./components/AlumniTestimonials').then(m => ({ default: m.AlumniTestimonials })));
const UpcomingEvents = lazy(() => import('./components/UpcomingEvents').then(m => ({ default: m.UpcomingEvents })));
const JoinCTA = lazy(() => import('./components/JoinCTA').then(m => ({ default: m.JoinCTA })));

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden">
      <Header />

      <main className="flex-1">
        <Hero />
        
        <Suspense fallback={<SectionSkeleton height="600px" className="bg-[#FDFBF7]" />}>
          <SchoolHistory />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="800px" showHeader={false} />}>
          <NostalgiaSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="700px" className="bg-stone-900" />}>
          <AlumniSuccess />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="500px" className="bg-brand-50" />}>
          <AlumniTestimonials />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="600px" showHeader={false} />}>
          <UpcomingEvents />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="400px" className="bg-brand-900" />}>
          <JoinCTA />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};
