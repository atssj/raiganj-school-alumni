import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../../shared/components';
import { Linkedin, ExternalLink } from 'lucide-react';

const ALUMNI_DATA = [
  {
    id: 1,
    name: "Dr. Anirban Basu",
    batch: "1998",
    role: "Senior Scientist, ISRO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    desc: "Leading the propulsion team for the upcoming Chandrayaan mission. Always credits his physics teacher at VC for the spark.",
    highlight: "Scientist"
  },
  {
    id: 2,
    name: "Priya Saha",
    batch: "2005",
    role: "Director of AI, Google",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    desc: "From coding in the computer lab to leading global AI initiatives. A true inspiration for girls in STEM.",
    highlight: "Tech Leader"
  },
  {
    id: 3,
    name: "Siddharth Roy",
    batch: "2001",
    role: "Filmmaker & Author",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    desc: "Award-winning director documenting the rural stories of Bengal. His storytelling roots go back to school drama competitions.",
    highlight: "Artist"
  },
];

export const AlumniSuccess: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-stone-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Pride of Raiganj <span className="text-brand-400">.</span>
            </h2>
            <p className="text-stone-400 text-lg md:text-xl max-w-xl">
              From Raiganj to the World. Our alumni are making waves across the globe while keeping their roots alive.
            </p>
          </Reveal>
          
          <Reveal delay={200}>
            <Link
              to="/dashboard/directory"
              className="px-6 py-3 border border-brand-700 hover:bg-brand-900 rounded-full text-brand-300 font-medium transition-colors flex items-center gap-2"
            >
              View All Alumni <ExternalLink className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALUMNI_DATA.map((alumni, index) => (
            <Reveal key={alumni.id} delay={index * 100}>
              <div className="group relative bg-stone-800 rounded-3xl overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={alumni.image} 
                    alt={alumni.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-brand-200 border border-white/10">
                    {alumni.highlight}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold group-hover:text-brand-300 transition-colors">{alumni.name}</h3>
                      <p className="text-sm font-mono text-stone-500">Batch of '{alumni.batch}</p>
                    </div>
                    <a href="#" className="p-2 bg-stone-700 rounded-full hover:bg-[#0077b5] hover:text-white transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                  
                  <p className="text-stone-400 leading-relaxed mb-6">
                    {alumni.desc}
                  </p>
                  
                  <div className="pt-6 border-t border-stone-700">
                    <p className="text-sm font-medium text-brand-200">{alumni.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
