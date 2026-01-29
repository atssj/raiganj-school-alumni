import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { Avatar } from '@/components/ui/Avatar';

interface AlumniCounterProps {
  onJoinClick: () => void;
}

export const AlumniCounter: React.FC<AlumniCounterProps> = ({ onJoinClick }) => {
  const randomIds = Array(3).fill(0).map(() => Math.floor(Math.random() * 1000));

  return (
    <motion.div 
      className="w-full py-3 md:py-4 relative overflow-hidden min-h-[90px] md:min-h-[70px] flex items-center justify-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0">
          <img src="/images/bg/alumni-count-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-center md:text-left">
          <div className="flex items-center justify-center">
            <div className="flex -space-x-3">
              {randomIds.map((id, i) => (
                <div key={id} className="relative">
                  <div className="relative group">
                    <Avatar
                      className="w-8 h-8 md:w-10 md:h-10 border-2 border-white/40 hover:scale-110 transition-transform"
                      src={`https://picsum.photos/seed/alumni-${id}/200/200`}
                      alt={`Alumni ${i + 1}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 max-w-md">
            <h3 className="text-white text-xl md:text-2xl font-bold mb-1 drop-shadow-md">Join our community</h3>
            <p className="text-white/90 text-base">
              <span className="font-bold text-gold-200">1,240+</span> alumni joined this month
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <Button 
              size="md"
              className="w-full md:w-auto bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold shadow-lg hover:scale-105 transition-transform ring-2 ring-white/20"
              onClick={onJoinClick}
            >
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlumniCounter;
