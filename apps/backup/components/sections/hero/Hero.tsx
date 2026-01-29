import React from 'react';
import { AlumniCounter } from './AlumniCounter';
import { Background } from './Background';
import { FloatingElements } from './FloatingElements';
import { AnimatedLines } from './AnimatedLines';
import { LocationBadge } from './LocationBadge';
import { HeroTitle } from './HeroTitle';
import { HeroDescription } from './HeroDescription';
import { CallToAction } from './CallToAction';

export interface HeroProps {
  onJoinClick: () => void;
  onWatchStory?: () => void;
}

export default function Hero({ onJoinClick, onWatchStory }: HeroProps) {
  const description = 'Welcome to the official alumni network of রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি School. Reconnect with old friends, share memories, and stay updated with our community events.';

  return (
    <>
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-20 pb-28 md:pb-32">
      <Background>
        <FloatingElements />
        <AnimatedLines />
      </Background>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto mt-0 md:mt-16">
        <LocationBadge location="Raiganj, West Bengal" />
        <HeroTitle />
        <HeroDescription description={description} />
        <CallToAction onJoinClick={onJoinClick} onWatchStory={onWatchStory} />
      </div>
      
      
    </section>
    <AlumniCounter onJoinClick={onJoinClick} />
    </>
  )
}