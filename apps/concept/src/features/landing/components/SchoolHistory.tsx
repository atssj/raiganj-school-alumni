import React from 'react';
import { Award, BookOpen, Users } from 'lucide-react';
import { Reveal } from '../../../shared/components';
import { ViewState } from '../../../shared/types';

interface SchoolHistoryProps {
  onNavigate: (view: ViewState) => void;
}

export const SchoolHistory: React.FC<SchoolHistoryProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 md:py-32 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background Creative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <svg className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] text-brand-100/50 animate-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90.1,-18,87.9,-3.3C85.7,11.4,78.6,25.3,69.5,37.3C60.4,49.3,49.3,59.4,36.9,67.3C24.5,75.2,10.8,80.9,-2,84.4C-14.8,87.9,-26.7,89.2,-37.6,83.9C-48.5,78.6,-58.4,66.7,-66.3,53.8C-74.2,40.9,-80.1,27,-82.5,12.2C-84.9,-2.6,-83.8,-18.3,-76.3,-31.4C-68.8,-44.5,-54.9,-55,-41.2,-62.7C-27.5,-70.4,-14,-75.3,0.7,-76.5C15.4,-77.7,30.5,-76.4,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] text-orange-100/50 animate-blob animation-delay-2000" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M41.7,-73.4C54.1,-65.4,64.4,-54.6,72.8,-42.6C81.2,-30.6,87.7,-17.4,87.1,-4.5C86.5,8.4,78.8,21,69.6,32.3C60.4,43.6,49.7,53.6,37.5,62.3C25.3,71,11.6,78.4,-1.4,80.9C-14.4,83.3,-27.4,80.8,-39.5,74.1C-51.6,67.4,-62.8,56.5,-71.3,44.1C-79.8,31.7,-85.6,17.8,-83.9,4.7C-82.2,-8.4,-73,-20.7,-64.1,-32.3C-55.2,-43.9,-46.6,-54.8,-35.8,-63.5C-25,-72.2,-12.1,-78.7,1.8,-81.8C15.7,-84.9,29.3,-81.4,41.7,-73.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          
          {/* Left: Image & Badge (Creative Style) */}
          <Reveal>
            <div className="relative group perspective-1000">
              {/* Decorative Frame Elements */}
              <div className="absolute top-4 left-4 w-full h-full border-2 border-brand-200 rounded-[2rem] transform rotate-3 transition-transform group-hover:rotate-6 duration-500" />
              <div className="absolute top-4 left-4 w-full h-full bg-brand-50 rounded-[2rem] transform -rotate-2 transition-transform group-hover:-rotate-4 duration-500 -z-10" />
              
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-700 bg-white p-2">
                <div className="relative rounded-[1.8rem] overflow-hidden h-[500px]">
                   <img 
                    src="https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?q=80&w=1600&auto=format&fit=crop" 
                    alt="Raiganj Vidya Chakra Old Building" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Vintage Overlay */}
                  <div className="absolute inset-0 bg-sepia-[0.3] opacity-50 mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-8 left-8 text-white">
                    <p className="text-sm font-bold tracking-[0.3em] uppercase mb-2 text-brand-200 opacity-80">Our Roots</p>
                    <h3 className="text-5xl font-serif font-bold text-white/90">1948</h3>
                  </div>
                </div>
              </div>
              
              {/* Floating 'Stamp' Card */}
              <div className="absolute -top-6 -right-6 md:-right-10 bg-white p-4 rounded-xl shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-500 z-20 max-w-[180px]">
                 <div className="border border-brand-100 border-dashed p-3 rounded-lg bg-brand-50/50">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mb-2">
                         <Award className="w-5 h-5" />
                      </div>
                      <p className="font-serif font-bold text-gray-900 text-lg">75+ Years</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Of Heritage</p>
                    </div>
                 </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Content */}
          <div>
            <Reveal delay={200}>
              <div className="inline-block px-4 py-2 bg-brand-100 rounded-full text-brand-800 text-xs font-bold tracking-widest uppercase mb-6 transform -rotate-1">
                Since 1948
              </div>
              
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-[1.1]">
                More than a school, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 to-brand-500 relative">
                  it's an emotion.
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                     <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h2>
              <h3 className="text-xl md:text-2xl font-serif text-gray-600 mb-8 font-medium italic relative pl-6 border-l-4 border-brand-300">
                রায়গঞ্জ বিদ্যাচক্র শুধু স্কুল নয়, একটা আবেগ।
              </h3>
              
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                From the dusty playgrounds where we learned teamwork to the classrooms that ignited our curiosity, Vidya Chakra has been the foundation of our dreams. It is where we found our first friends, our first mentors, and our true selves.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <FeatureItem 
                  icon={BookOpen} 
                  title="Academic Excellence" 
                  text="Top-ranking in district boards consistently."
                  delay={100}
                />
                <FeatureItem 
                  icon={Users} 
                  title="Global Community" 
                  text="Alumni spread across 30+ countries."
                  delay={200}
                />
              </div>

              <button 
                onClick={() => onNavigate(ViewState.ABOUT)}
                className="group relative px-8 py-4 bg-brand-900 text-white rounded-xl font-medium overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-800 to-brand-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                   Explore Our History 
                   <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ icon: Icon, title, text, delay }: { icon: any, title: string, text: string, delay?: number }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100">
    <div className="p-3 bg-white border border-gray-100 shadow-sm rounded-xl text-brand-600 group-hover:bg-brand-50 transition-colors">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-500 leading-snug">{text}</p>
    </div>
  </div>
);
