import React from 'react';
import { MapPin } from 'lucide-react';
import { Reveal } from '@/components/common/Reveal';

interface LocationBadgeProps {
  location: string;
}

export const LocationBadge: React.FC<LocationBadgeProps> = ({ location }) => {
  return (
    <Reveal>
      <div className="relative inline-flex items-center gap-2 mb-6 md:mb-8 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-100 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-white/20 group/location">
        <MapPin className="w-3 h-3 animate-pulse" style={{ animationDuration: '4s' }} />
        <span className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {location}
        </span>
      </div>
    </Reveal>
  );
};

export default LocationBadge;
