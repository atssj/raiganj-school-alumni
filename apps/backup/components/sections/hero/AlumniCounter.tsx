import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/ui/Avatar';
import { WaveDivider } from '@/components/ui/WaveDivider';

interface AlumniCounterProps {
  onJoinClick: () => void;
}

export const AlumniCounter: React.FC<AlumniCounterProps> = ({ onJoinClick }) => {
  const randomIds = Array(3).fill(0).map(() => Math.floor(Math.random() * 1000));
  const noiseTexture = {
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E\")",
    backgroundSize: '200px 200px'
  };

  return (
    <motion.div 
      className="w-full py-8 md:py-12 relative overflow-hidden min-h-[300px] flex items-center justify-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700" style={noiseTexture}>
        <div className="absolute inset-0 opacity-20">
          <img src="/images/bg/alumni-count-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex -space-x-3">
              {randomIds.map((id, i) => (
                <div key={id} className="relative">
                  <div className="relative group">
                    <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" style={{ animationDelay: `${i * 0.2}s` }} />
                    <Avatar
                      className="w-10 h-10 md:w-12 md:h-12 border-2 border-white/40 hover:scale-110 transition-transform"
                      src={`https://picsum.photos/seed/alumni-${id}/200/200`}
                      alt={`Alumni ${i + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-white text-xl md:text-2xl font-bold mb-1 drop-shadow-md">Join our community</h3>
            <p className="text-white/90 text-base">
              <span className="font-bold text-gold-200">1,240+</span> alumni joined this month
            </p>
          </div>
          
          <Button 
            size="md"
            className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold shadow-lg hover:scale-105 transition-transform ring-2 ring-white/20"
            onClick={onJoinClick}
          >
            Join Now
          </Button>
        </div>
      </div>

      <WaveDivider 
        fillColor="#FBBF24" 
        className="absolute bottom-0 left-0 right-0"
        height="h-12 md:h-20"
        flip={false}
      />
    </motion.div>
  );
};

export default AlumniCounter;
