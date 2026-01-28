import React from 'react';

export const FloatingElements: React.FC = () => {
  return (
    <>
      <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-brand-300/30 animate-float" 
           style={{ animationDuration: '15s', animationDelay: '0s' }} 
      />
      <div className="absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-brand-200/20 animate-float" 
           style={{ animationDuration: '18s', animationDelay: '2s' }} 
      />
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full bg-white/10 animate-float" 
           style={{ animationDuration: '20s', animationDelay: '1s' }} 
      />
    </>
  );
};

export default FloatingElements;
