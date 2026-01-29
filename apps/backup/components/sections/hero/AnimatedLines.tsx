import React from 'react';

export const AnimatedLines: React.FC = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
      <line
        x1="0" y1="100%"
        x2="100%" y2="0"
        className="stroke-white/30"
        strokeWidth="1"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'draw 3s ease-out forwards 0.5s' }}
      />
      <line
        x1="10%" y1="60%"
        x2="90%" y2="60%"
        className="stroke-brand-300/40"
        strokeWidth="1"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'draw 2s ease-out forwards 1s' }}
      />
      <line
        x1="50%" y1="20%"
        x2="50%" y2="80%"
        className="stroke-brand-200/30"
        strokeWidth="1"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{ animation: 'draw 2.5s ease-out forwards 0.8s' }}
      />
    </svg>
  );
};

export default AnimatedLines;
