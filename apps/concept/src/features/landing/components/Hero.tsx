import React from 'react';
import { ArrowRight, Play, MapPin } from 'lucide-react';
import { ViewState } from '../../../shared/types';
import { Button } from '../../../shared/components/ui/button';
import { HeroStats } from './HeroStats';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-start overflow-hidden pt-20 pb-28 md:pb-32">
      {/* Background with Editorial Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero/sketch-2.jpg"
          className="w-full h-full object-cover object-center"
          alt="Raiganj School Sketch"
        />
        {/* Modern Directional Gradient: Dark on left, fading to transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/80 via-brand-950/40 to-brand-950/5 md:to-transparent" />
        {/* Bottom fade for mobile legibility */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-950 to-transparent" />
      </div>

      {/* Content - Left Aligned Editorial Style */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-10 md:pt-0 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
            <div className="mt-12 mb-8 md:mb-12 relative">
              <h1 className="flex flex-col gap-2 text-white">
                <span className="mt-12 text-xl md:text-3xl font-bengali text-brand-300 opacity-90 block italic mb-2">
                  ( শৈশবের সেই দিনগুলো... )
                </span>
                
                <span className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight leading-[1.1]">
                  Rooted in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 animate-gradient-xy italic font-light decoration-brand-400/30 underline-offset-8 decoration-4">History</span>.
                </span>
                <span className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight leading-[1.1]">
                  Connected by <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-indigo-200 to-brand-100 animate-gradient-xy italic font-light pb-2">Heart</span>.
                </span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-white/95 max-w-2xl mb-10 leading-[1.6] font-normal tracking-wide border-l-4 border-amber-400/80 pl-6 drop-shadow-lg">
              <span className="block text-white/85 font-light tracking-wider text-lg md:text-xl mb-1">
                From the misty banks of Kulik to every corner of the globe.
              </span>
              <span className="text-white font-semibold tracking-tight">
                Join 15,000+ alumni
              </span>
              <span className="text-white/90 font-normal"> reliving the golden days.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <Button
                size="lg"
                onClick={() => onNavigate(ViewState.DIRECTORY)}
                className="group rounded-full px-8 md:px-10 h-14 text-lg bg-brand-500 text-white hover:bg-brand-600 border-none shadow-xl shadow-brand-900/30 transition-all duration-300"
              >
                Find Your Batch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate(ViewState.STORIES)}
                className="group rounded-full px-8 md:px-10 h-14 text-lg border-brand-300/40 text-white hover:bg-brand-400/20 hover:border-brand-300/60 backdrop-blur-sm transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-brand-400/30 flex items-center justify-center mr-3 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" /> 
                </div>
                Watch Stories
              </Button>
            </div>
            
          {/* Location Badge */}
          <div className="hidden md:inline-flex items-center gap-3 mt-12 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-brand-50 text-xs font-medium tracking-widest uppercase hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg cursor-default">
            <MapPin className="w-3.5 h-3.5 text-brand-300" />
            <span className="opacity-90">Raiganj, West Bengal</span>
            <span className="w-1 h-1 rounded-full bg-brand-400 opacity-50" />
            <span className="font-bold text-brand-200">Est. 2023</span>
          </div>
        </div>
      </div>

      <HeroStats monthlyJoins={1240} />
    
    </section>
  );
};
