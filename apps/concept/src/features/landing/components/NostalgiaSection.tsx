import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Coffee, Music, Bike, Book, Heart, GraduationCap } from 'lucide-react';
import { Reveal } from '../../../shared/components';

export const NostalgiaSection: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-950 mb-4">
              School Jibon
            </h2>
            <p className="text-xl md:text-2xl text-brand-700 font-serif mb-6">
              স্কুল জীবন - <span className="italic">The Golden Days</span>
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Do you remember the smell of fresh books? The tiffin breaks shared with friends? 
              The frantic last-minute revisions? Let's take a walk down memory lane.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 h-auto overflow-visible p-4">
          {/* Column 1 - Moves Up - Saraswati Puja & Teachers' Day */}
          <motion.div style={{ y: y1, willChange: 'transform' }} className="flex flex-col gap-12 transform-gpu">
            <MemoryCard 
              icon={Music}
              title="Saraswati Puja"
              subtitle="The Annual Festival"
              desc="Yellow sarees, পাঞ্জাবি (Punjabi), and the freedom to roam around the town."
              color="bg-yellow-50 text-yellow-600"
              image="https://images.unsplash.com/photo-1614958564117-649da4320921?q=80&w=800&auto=format&fit=crop"
              rotate={-1}
              loading="lazy"
            />
             <MemoryCard 
              icon={GraduationCap}
              title="Teachers' Day"
              subtitle="Role Reversal"
              desc="Mimicking our favorite teachers, organizing the function, and seeking their blessings."
              color="bg-purple-50 text-purple-600"
              rotate={1}
            />
          </motion.div>

          {/* Column 2 - Moves Down (Slower) - Cycle Rides & Tiffin */}
          <motion.div style={{ y: y3, willChange: 'transform' }} className="flex flex-col gap-12 pt-12 md:pt-0 transform-gpu">
             <MemoryCard 
              icon={Bike}
              title="Cycle Rides"
              subtitle="The Morning Rush"
              desc="Racing through the misty streets of Raiganj to reach before the prayer bell."
              color="bg-orange-50 text-orange-600"
              image="https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=800&auto=format&fit=crop"
              rotate={-2}
              loading="lazy"
            />
             <MemoryCard 
              icon={Coffee}
              title="Tiffin Breaks"
              subtitle="Sharing is Caring"
              desc="Changes of Singara and Ghugni. The best conversations happened with food in mouth."
              color="bg-amber-50 text-amber-600"
              image="https://images.unsplash.com/photo-1594488517527-b50a0b80981f?q=80&w=800&auto=format&fit=crop"
              rotate={2}
              loading="lazy"
            />
          </motion.div>

          {/* Column 3 - Moves Up - Library, First Crush, Last Benchers */}
          <motion.div style={{ y: y2, willChange: 'transform' }} className="flex flex-col gap-12 hidden lg:flex transform-gpu">
            <MemoryCard 
              icon={Book}
              title="Library Hours"
              subtitle="Hidden Comics"
              desc="Pretending to study while secretly reading Tintin and Feluda inside textbooks."
              color="bg-blue-50 text-blue-600"
              rotate={1}
            />
             <div className="group relative h-64 rounded-3xl border border-rose-200/70 bg-rose-50/60 p-6 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-rose-300 hover:shadow-lg">
                {/* Tape Effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-amber-300/50 opacity-80 rotate-2 shadow-sm z-20 backdrop-blur-sm transform skew-x-12" />
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-rose-50 via-white to-rose-100/70 opacity-80" />
                <div className="absolute right-5 top-5 h-10 w-10 rounded-full border border-rose-200/70 bg-white/70" />

                <div className="relative z-10 flex h-full flex-col items-center justify-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-200 bg-white/90 shadow-xs">
                    <Heart className="h-5 w-5 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-rose-950">First Crush</h3>
                  <p className="text-xs uppercase tracking-[0.25em] text-rose-400">Notes passed silently.</p>
                </div>
             </div>
             <MemoryCard 
              icon={Book}
              title="Last Benchers"
              subtitle="Backbench Legends"
              desc="Where the real planning for bunking classes happened. The kings of the classroom."
              color="bg-emerald-50 text-emerald-600"
              rotate={2}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MemoryCard = ({ icon: Icon, title, subtitle, desc, color, image, rotate = 0, loading }: any) => (
  <div 
    className="group relative bg-white p-3 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:z-10 hover:-translate-y-2 hover:rotate-0"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    {/* Tape Effect */}
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-amber-300/50 opacity-80 rotate-2 shadow-sm z-20 backdrop-blur-sm transform skew-x-12" />

    <div className="relative bg-white border border-gray-100 p-4 h-full">
        {image && (
        <div className="h-48 w-full overflow-hidden mb-4 relative grayscale group-hover:grayscale-0 transition-all duration-700">
            <div className="absolute inset-0 bg-brand-900/10 group-hover:bg-transparent transition-colors z-10" />
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              loading={loading || "lazy"}
              decoding="async"
            />
        </div>
        )}
        <div className="mt-2">
            <div className="flex items-center justify-between mb-3">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Memory</span>
            </div>
            
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-1 font-handwriting">{title}</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-400 mb-3">{subtitle}</p>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">{desc}</p>
        </div>
        
        {/* Handwriting effect decoration */}
        <div className="absolute bottom-2 right-2 opacity-10">
             <Icon className="w-16 h-16 text-brand-900" />
        </div>
    </div>
  </div>
);
