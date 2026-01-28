import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/Button';
import { ArrowRight, MapPin, Play, Users, Calendar, MessageSquare } from 'lucide-react';
import { AlumniCounter } from './AlumniCounter';
import { BottomNav } from '@/components/BottomNav';
import { ViewState } from '@/types';

interface HeroProps {
  onLogin: () => void;
  scrollToSection: (id: string) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onLogin,
  scrollToSection,
  isLoginModalOpen,
  setIsLoginModalOpen,
  currentView,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section className="relative min-h-screen w-full overflow-x-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-950 to-brand-1000"
          style={{ scale }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <img 
              src="/images/hero-bg.jpg" 
              className="w-full h-full object-cover mix-blend-overlay opacity-30"
              alt="Raiganj Vidyachakra School"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/90 via-brand-950/80 to-brand-950/90"></div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 pt-20 pb-16 flex-grow flex flex-col">
          <div className="max-w-4xl mx-auto text-center my-auto">
            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-brand-100 text-sm font-medium tracking-wider"
            >
              <MapPin className="w-4 h-4 text-brand-300" />
              <span>Raiganj, West Bengal</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-brand-200">
                Raiganj Vidya Chakra
              </span>
              <span className="block mt-2 md:mt-4 text-2xl sm:text-3xl md:text-4xl font-light text-brand-200">
                Alumni Network
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-lg md:text-xl text-gray-200 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Welcome to the official alumni network of Raiganj Vidya Chakra. Reconnect with old friends, share memories, and stay updated with our community events.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button 
                onClick={() => setIsLoginModalOpen(true)}
                size="lg"
                className="group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Join Our Network</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-600 opacity-100 group-hover:opacity-100 transition-opacity duration-500"></span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/20 text-white hover:bg-white/5 hover:border-white/40"
                onClick={() => scrollToSection('gallery-section')}
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Our Story
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { icon: <Users className="w-6 h-6 text-brand-300" />, value: '5,000+', label: 'Alumni' },
                { icon: <Calendar className="w-6 h-6 text-brand-300" />, value: '50+', label: 'Years of Legacy' },
                { icon: <MessageSquare className="w-6 h-6 text-brand-300" />, value: '1,240+', label: 'Active Members' },
              ].map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-brand-500/30 transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center mb-2">
                      {stat.icon}
                    </div>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-300">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Alumni Counter */}
        <AlumniCounter onJoinClick={() => setIsLoginModalOpen(true)} />

        {/* Bottom Navigation */}
        <BottomNav currentView={currentView} onNavigate={onNavigate} />

        {/* Wave Animation */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
          <svg 
            className="relative block w-full h-16 md:h-24 lg:h-32" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity="0.25" 
              className="fill-current text-brand-600/30"
            />
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,141.56,70.72,12.27,20.68,18.94,41.21,20.88,60.22,1.5,14.8,1.5,24.33,0,39.16-1.49,14.8-4.35,28.65-8.8,41.58-2.1,6.08-4.65,12.05-7.56,17.87V0Z" 
              opacity="0.5" 
              className="fill-current text-brand-500/40"
            />
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              className="fill-current text-brand-400/50"
            />
          </svg>
        </div>
      </div>
      
      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;