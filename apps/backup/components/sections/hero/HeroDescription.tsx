import React from 'react';
import { Reveal } from '@/components/common/Reveal';

interface HeroDescriptionProps {
  description: string;
}

export const HeroDescription: React.FC<HeroDescriptionProps> = ({ description }) => {
  return (
    <Reveal delay={200}>
      <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed animate-fade-in-up" 
         style={{ animationDelay: '0.7s' }}>
        {description}
      </p>
    </Reveal>
  );
};

export default HeroDescription;
