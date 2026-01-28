import React from 'react';

interface BackgroundProps {
  children?: React.ReactNode;
}

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="w-full h-full relative">
        <img
          src="https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2800&auto=format&fit=crop"
          className="w-full h-full object-cover scale-110 animate-float"
          style={{
            animationDuration: '30s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate'
          }}
          alt="Forest Path"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-black/40 to-brand-950/90" />
        {children}
      </div>
    </div>
  );
};

export default Background;
