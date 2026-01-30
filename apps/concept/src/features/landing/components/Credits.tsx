import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Code2, Heart, Linkedin } from "lucide-react";
import { cn } from "../../../shared/lib/utils";

interface CreditsProps {
  className?: string;
}

export const Credits: React.FC<CreditsProps> = ({ className }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative py-8 px-4 mt-8",
        "flex flex-col items-center justify-center gap-4",
        "border-t border-white/5",
        className
      )}
    >
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Main Content Group */}
      <div className="group relative flex flex-col items-center gap-3 z-10 cursor-default">
        
        {/* Label */}
        <motion.div 
          className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-white/40 uppercase"
          whileHover={{ letterSpacing: "0.25em", color: "rgba(255,255,255,0.6)" }}
        >
          <Sparkles className="w-3 h-3 text-amber-500/70" />
          <span>Concept & Developed by</span>
          <Sparkles className="w-3 h-3 text-amber-500/70" />
        </motion.div>

        {/* Name & Team */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <motion.a
            href="https://linkedin.com" // Replace with specific LinkedIn URL
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[0_0_20px_-5px_rgba(10,102,194,0.5)] overflow-hidden min-w-[160px]"
            whileHover="hover"
            initial="initial"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="flex items-center gap-2"
              variants={{
                initial: { y: 0, opacity: 1 },
                hover: { y: -30, opacity: 0 },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent font-bold text-sm tracking-wide">
                Subhajit Saha
              </span>
              <div className="w-1 h-1 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            </motion.div>
            
            <motion.div
              className="absolute flex items-center gap-2 whitespace-nowrap"
              variants={{
                initial: { y: 30, opacity: 0 },
                hover: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <span className="text-white font-bold text-sm tracking-wide flex items-center gap-1.5">
                Connect on <Linkedin className="w-4 h-4 fill-white" />
              </span>
            </motion.div>
          </motion.a>
          
          <motion.div 
            className="flex items-center gap-1.5 text-white/50 text-sm font-medium"
            whileHover={{ color: "rgba(255,255,255,0.8)" }}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>AI Team</span>
          </motion.div>
        </div>

        {/* Footer Text */}
        <motion.p 
          className="flex items-center gap-1.5 text-[10px] text-white/50 font-medium tracking-wide mt-1"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Crafted with <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500/50" /> for the alumni community
        </motion.p>
      </div>
    </motion.div>
  );
};
