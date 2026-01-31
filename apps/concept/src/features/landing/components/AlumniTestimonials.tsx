import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '../../../shared/components';

const TESTIMONIALS = [
  {
    id: 1,
    text: "The values I learnt at Vidya Chakra - discipline, humility, and perseverance - have been my guiding light in Silicon Valley. It's truly where my foundation was built.",
    author: "Rohan Das",
    role: "Senior Engineer @ Apple",
    batch: "2003",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    text: "স্কুলের সেই দিনগুলো, স্যারদের বকুনি আর বন্ধুদের আড্ডা - এসবই তো জীবন ছিল। আজ পৃথিবী দেখছি, কিন্তু মনটা সেই ক্লাসরুমেই পড়ে আছে।",
    author: "Ananya Roy",
    role: "IFS Officer",
    batch: "2010",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    text: "Whatever I am today, I owe it to the teachers who believed in me when I didn't believe in myself. Raiganj Vidya Chakra is family.",
    author: "Sumit Banik",
    role: "Entrepreneur",
    batch: "1995",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  }
];

export const AlumniTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-24 bg-brand-50 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-brand-200 rounded-full blur-[50px] opacity-50 translate-x-[-50%]" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-200 rounded-full blur-[80px] opacity-50 translate-x-[30%]" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">What Alumni Speaks</h2>
            <div className="w-20 h-1 bg-brand-500 mx-auto rounded-full" />
          </Reveal>
        </div>

        <div className="relative">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl mx-4 md:mx-20 relative transform-gpu"
              style={{ willChange: 'transform, opacity' }}
            >
              <Quote className="absolute top-8 left-8 md:top-12 md:left-12 w-12 h-12 md:w-20 md:h-20 text-brand-100/50 rotate-180" />
              
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                <div className="shrink-0 relative group">
                  <div className="w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg ring-4 ring-brand-50">
                    <img 
                      src={TESTIMONIALS[currentIndex].image} 
                      alt={TESTIMONIALS[currentIndex].author}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="absolute -bottom-2 right-0 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    '{TESTIMONIALS[currentIndex].batch}
                  </div>
                </div>

                <div className="text-center md:text-left flex-1">
                  <p className="text-xl md:text-3xl font-serif text-gray-800 leading-relaxed mb-6 italic">
                    "{TESTIMONIALS[currentIndex].text}"
                  </p>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{TESTIMONIALS[currentIndex].author}</h4>
                    <p className="text-brand-600 font-medium">{TESTIMONIALS[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            type="button"
            onClick={prev}
            className="absolute top-1/2 left-0 md:-left-4 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg text-gray-600 hover:text-brand-600 hover:scale-110 transition-all z-20"
            aria-label="Previous testimonial"
            title="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            type="button"
            onClick={next}
            className="absolute top-1/2 right-0 md:-right-4 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg text-gray-600 hover:text-brand-600 hover:scale-110 transition-all z-20"
            aria-label="Next testimonial"
            title="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
