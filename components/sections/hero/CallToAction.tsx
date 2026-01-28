import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/common/Reveal';

interface CallToActionProps {
  onJoinClick: () => void;
  onWatchStory?: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onJoinClick, onWatchStory }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Reveal delay={300}>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          onClick={onJoinClick}
          size="lg"
          className="group relative overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          <span className="relative z-10 flex items-center">
            <span className="group-hover:translate-x-1 transition-transform duration-300">Join Our Network</span>
            <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </span>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 group animate-fade-in-up"
          onClick={onWatchStory || (() => scrollToSection('gallery-section'))}
          style={{ animationDelay: '0.9s' }}
        >
          <Play className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
          <span>Watch Our Story</span>
        </Button>
      </div>
    </Reveal>
  );
};

export default CallToAction;
