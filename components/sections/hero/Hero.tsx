import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AlumniCounter } from './AlumniCounter';
import { Background } from './Background';
import { FloatingElements } from './FloatingElements';
import { AnimatedLines } from './AnimatedLines';
import { LocationBadge } from './LocationBadge';
import { HeroTitle } from './HeroTitle';
import { HeroDescription } from './HeroDescription';
import { CallToAction } from './CallToAction';
import { TornImage } from './TornImage';

export interface HeroProps {
  onJoinClick: () => void;
  onWatchStory?: () => void;
}

export default function Hero({ onJoinClick, onWatchStory }: HeroProps) {
  const description = 'Welcome to the official alumni network of Raiganj Heritage School. Reconnect with old friends, share memories, and stay updated with our community events.';

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <>
    <section ref={targetRef} className="relative min-h-[100dvh] w-full flex items-center overflow-hidden pt-20 pb-28 md:pb-32">
      <Background>
        <FloatingElements />
        <AnimatedLines />
      </Background>

      {/* Two Column Layout: Text Overlapping Image */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Left: Content - Overlaps image */}
        <div className="flex-1 md:-mr-24 z-20 text-center md:text-left">
          <LocationBadge location="Raiganj, West Bengal" />
          <HeroTitle />
          <HeroDescription description={description} />
          <CallToAction onJoinClick={onJoinClick} onWatchStory={onWatchStory} />
        </div>

        {/* Right: Image */}
        <div 
          className="flex-1 w-full max-w-lg md:max-w-xl lg:max-w-2xl aspect-[4/3]"
        >
          <div 
            className="relative w-full h-full opacity-100 scale-100 transition-all duration-300"
            style={{
              opacity: undefined,
              scale: undefined,
            }}
          >
            <TornImage
              src="/images/school/sketch-2.png"
              alt="Raiganj Vidyachakra School Sketch"
            />
          </div>
        </div>
      </div>
    </section>
    <AlumniCounter onJoinClick={onJoinClick} />
    </>
  )
}