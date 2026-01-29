import React from 'react';
import { ArrowRight, MapPin, Play } from 'lucide-react';
import { ViewState } from '../../../shared/types';
import { Button, Reveal } from '../../../shared/components';
import { HeroStats } from './HeroStats';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-20 pb-28 md:pb-32">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2800&auto=format&fit=crop"
          className="w-full h-full object-cover scale-105 animate-pulse-slow"
          style={{ animationDuration: '20s' }}
          alt="Forest Path"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-black/40 to-brand-950/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto mt-0 md:mt-16">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-6 md:mb-8 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-100 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase shadow-lg">
            <MapPin className="w-3 h-3" /> Raiganj, West Bengal
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
            Rooted in <span className="text-brand-300 italic font-light">History</span>.<br />
            Connected by <span className="text-brand-300 italic font-light">Heart</span>.
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-light drop-shadow-md">
            From the misty banks of Kulik to every corner of the globe. Join 15,000+ alumni reliving
            the golden days of Raiganj.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-5 w-full max-w-sm sm:max-w-none mx-auto">
            <Button
              size="lg"
              variant="white"
              onClick={() => onNavigate(ViewState.DIRECTORY)}
              className="rounded-full w-full sm:w-auto px-8 md:px-10 h-12 md:h-14 text-base md:text-lg border-none shadow-xl"
            >
              Find Your Batch
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate(ViewState.STORIES)}
              className="rounded-full w-full sm:w-auto px-8 md:px-10 h-12 md:h-14 text-base md:text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <Play className="w-4 h-4 mr-2 fill-current" /> Watch Stories
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Bottom Stats Bar */}
      <HeroStats monthlyJoins={1240} />
    </section>
  );
};
