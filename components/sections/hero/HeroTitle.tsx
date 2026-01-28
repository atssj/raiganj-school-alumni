import React from 'react';
import { Reveal } from '@/components/common/Reveal';

export const HeroTitle: React.FC = () => {
  return (
    <Reveal delay={100}>
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
        <span className="inline-block relative">
          <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Rooted in </span>
          <span className="text-brand-300 italic font-light animate-float relative inline-block" style={{ animationDelay: '0.4s', animationDuration: '8s' }}>
            <span className="relative z-10">History</span>
            <svg className="absolute -left-4 -top-4 w-24 h-24 text-brand-300/20" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                style={{ animation: 'draw 2s ease-out forwards 1.2s' }}
              />
            </svg>
          </span>
          <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.3s' }}>.</span>
        </span>
        <br className="md:hidden" />
        <span className="inline-block relative">
          <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.5s' }}>Connected by </span>
          <span className="text-brand-300 italic font-light animate-float relative inline-block" style={{ animationDelay: '0.6s', animationDuration: '8s' }}>
            <span className="relative z-10">Heart</span>
            <svg className="absolute -left-2 -bottom-2 w-16 h-16 text-brand-300/20" viewBox="0 0 100 100">
              <path
                d="M20,50 Q50,10 80,50 T140,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                style={{ animation: 'draw 1.5s ease-out forwards 1.5s' }}
              />
            </svg>
          </span>
          <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.5s' }}>.</span>
        </span>
      </h1>
      <div className="absolute -left-20 top-1/4 w-16 h-px bg-gradient-to-r from-transparent to-white/20 animate-expand" style={{ animationDelay: '0.8s' }} />
      <div className="absolute -right-20 bottom-1/4 w-16 h-px bg-gradient-to-l from-transparent to-white/20 animate-expand" style={{ animationDelay: '1s' }} />
    </Reveal>
  );
};

export default HeroTitle;
