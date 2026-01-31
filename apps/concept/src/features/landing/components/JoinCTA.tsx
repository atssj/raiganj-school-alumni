import React from 'react';
import { Sparkles } from 'lucide-react';
import { Reveal } from '../../../shared/components';
import { ViewState } from '../../../shared/types';

interface JoinCTAProps {
  onNavigate: (view: ViewState) => void;
}

export const JoinCTA: React.FC<JoinCTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 relative overflow-hidden bg-brand-900 text-white">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900 to-brand-800" />
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-brand-200 text-sm font-bold uppercase tracking-wider mb-8 border border-white/10">
            <Sparkles className="w-4 h-4" />
            <span>Join 2000+ Alumni</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Ready to come back home? <br/>
            <span className="text-brand-300">Fele Asha Din.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-brand-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Rekindle old friendships, network with seniors, and give back to the school that made you. The Vidya Chakra family is waiting for you.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => onNavigate(ViewState.MEMBERSHIP)}
              className="px-8 py-4 bg-white text-brand-900 rounded-full font-bold text-lg hover:bg-brand-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 w-full md:w-auto"
            >
              Join the Network
            </button>
            <button 
              onClick={() => onNavigate(ViewState.GALLERY)}
              className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all w-full md:w-auto backdrop-blur"
            >
              Explore Gallery
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
