import React from 'react';
import { ArrowRight, Play, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeroStats } from './HeroStats';
import { HeroVideo } from './HeroVideo';

export const Hero: React.FC = () => {
  const containerRef = React.useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Scroll Parallax: Background moves slower than foreground
  const yBg = useTransform(scrollY, [0, 500], [0, 100]); 
  
  // Mouse Parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [3, -3]);
  const rotateY = useTransform(x, [-100, 100], [-3, 3]);

  // Smooth mouse movement
  const springConfig = { damping: 25, stiffness: 100 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((event.clientX - centerX) / 10); // Divisor controls sensitivity
      y.set((event.clientY - centerY) / 10);
    }
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-dvh w-full flex items-center overflow-hidden pt-20 pb-28 md:pb-32 perspective-1000 bg-brand-950"
    >
      {/* Background w/ Parallax - HeroVideo with Cloudinary */}
      <motion.div
        style={{ y: yBg, rotateX: springRotateX, rotateY: springRotateY, scale: 1.05, willChange: 'transform' }}
        className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] z-0 origin-center opacity-40 md:opacity-100 transform-gpu"
      >
        <HeroVideo
          cloudName="donrm4btg"
          videoPublicId="hero-video_oeelgx"
          posterPublicId="hero-video-poster_kczfnc"
          className="w-full h-full"
        />
        {/* Gradient Overlay for blending into solid color */}
        <div className="absolute inset-0 bg-linear-to-r from-brand-950 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-brand-950/80 via-transparent to-transparent" />
      </motion.div>

      {/* Content - Left Aligned */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-10 md:pt-0 h-full flex flex-col justify-center pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
            <div className="mt-12 mb-8 md:mb-12 relative">
              <h1 className="flex flex-col gap-2 text-white">
                <span className="mt-12 text-xl md:text-3xl font-bengali text-brand-300 opacity-90 block mb-2">
                  ( শৈশবের সেই দিনগুলো... )
                </span>
                
                <span className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight leading-[1.1]">
                  Rooted in <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-yellow-100 to-amber-200 animate-gradient-xy italic font-light decoration-brand-400/30 underline-offset-8 decoration-2">History</span>.
                </span>
                <span className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight leading-[1.1]">
                  Connected by <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-yellow-100 to-amber-200 animate-gradient-xy italic font-light pb-2">Heart</span>.
                </span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-white/95 max-w-2xl mb-10 leading-[1.6] font-normal tracking-wide border-l-4 border-amber-400/80 pl-6 drop-shadow-lg">
              <span className="block text-white/90 font-light tracking-wider text-lg md:text-xl mb-1">
                From the misty banks of Kulik to every corner of the globe.
              </span>
              <span className="text-amber-300 font-medium tracking-tight">
                Join 15,000+ alumni
              </span>
              <span className="text-white/90 font-light"> reliving the golden days.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <Link
                to="/dashboard/directory"
                className="group inline-flex items-center rounded-full px-8 md:px-10 h-14 text-lg bg-blue-600 text-white hover:bg-blue-700 border-none shadow-xl shadow-brand-900/30 transition-all duration-300"
              >
                Find Your Batch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/stories"
                className="group inline-flex items-center rounded-full px-8 md:px-10 h-14 text-lg bg-white/10 border border-white/10 text-white hover:bg-white/20 hover:border-white/20 hover:text-white backdrop-blur-md transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 group-hover:bg-white/30 text-white transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                Watch Stories
              </Link>
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
