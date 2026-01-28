import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';

interface AlumniCounterProps {
  onJoinClick: () => void;
}

export const AlumniCounter: React.FC<AlumniCounterProps> = ({ onJoinClick }) => {
  return (
    <motion.div 
      className="w-full py-6 md:py-8 relative overflow-hidden"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/bg/alumni-count-bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex -space-x-2 mr-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative">
                  <div 
                    className="absolute inset-0 rounded-full bg-white/30 animate-ping" 
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                  <img 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/40 object-cover relative z-10" 
                    src={`/images/avatars/alumni-${(i % 3) + 1}.jpg`} 
                    alt="Alumni" 
                  />
                </div>
              ))}
            </div>
            <span className="text-white font-medium text-lg">
              <span className="font-bold">1,240+</span> alumni joined this month
            </span>
          </div>
          <Button 
            size="md"
            className="bg-white text-brand-600 hover:bg-gray-100 shadow-lg"
            onClick={onJoinClick}
          >
            Join Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AlumniCounter;
