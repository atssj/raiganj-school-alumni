import React from 'react';
import { Bird, GraduationCap, Clock, ArrowRight, Quote } from 'lucide-react';
import { ViewState } from '../../../shared/types';
import { Reveal } from '../../../shared/components';

interface AboutProps {
  onNavigate: (view: ViewState) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <section id="about-section" className="py-20 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4 md:mb-6">
              The Spirit of Raiganj
            </h2>
            <div className="w-24 h-1 bg-brand-600 mx-auto rounded-full mb-4 md:mb-6" />
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light">
              It&apos;s not just a town; it&apos;s an emotion. The sound of the morning assembly bell,
              the cycle rides through College Para, and the aroma of tea at Bandar.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Kulik Bird Sanctuary - Large Card */}
          <Reveal delay={100} className="md:col-span-2">
            <LargeImageCard
              image="https://images.unsplash.com/photo-1470114716159-e389f87b9610?q=80&w=1600&auto=format&fit=crop"
              icon={Bird}
              badge="Asia's 2nd Largest"
              title="Kulik Bird Sanctuary"
              description="Every winter, migratory birds find their way home to Raiganj. Just like our alumni returning for the grand reunion."
            />
          </Reveal>

          {/* Decades of Excellence */}
          <Reveal delay={200}>
            <FeatureCard
              icon={GraduationCap}
              title="Decades of Excellence"
              description="From the historic Coronation High School to the vibrant halls of Raiganj Girls'. Our schools have shaped leaders, artists, and thinkers."
              action={{ label: 'View History', onClick: () => onNavigate(ViewState.ABOUT) }}
              variant="light"
            />
          </Reveal>

          {/* Clock Tower Adda */}
          <Reveal delay={300}>
            <FeatureCard
              icon={Clock}
              title="The Clock Tower Adda"
              description="Time stands still when old friends meet. Relive the endless political debates, cricket commentary, and tea breaks that defined our youth."
              variant="dark"
              backgroundImage="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
            />
          </Reveal>

          {/* Quote Card */}
          <Reveal delay={400} className="md:col-span-2">
            <QuoteCard
              image="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1600&auto=format&fit=crop"
              quote="Raiganj is not just a place on the map.<br/>It's the geography of my soul."
              author="Amitav Ghosh, Batch of '92"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// Sub-components
interface LargeImageCardProps {
  image: string;
  icon: React.ElementType;
  badge: string;
  title: string;
  description: string;
}

const LargeImageCard: React.FC<LargeImageCardProps> = ({
  image,
  icon: Icon,
  badge,
  title,
  description,
}) => (
  <div className="relative group overflow-hidden rounded-3xl md:rounded-[2.5rem] h-[300px] md:h-[400px]">
    <img
      src={image}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      alt={title}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-10 flex flex-col justify-end">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-white/20 backdrop-blur rounded-lg text-white">
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <span className="text-brand-200 font-bold tracking-widest text-[10px] md:text-xs uppercase">
          {badge}
        </span>
      </div>
      <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 max-w-md text-sm md:text-base">{description}</p>
    </div>
  </div>
);

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
  variant: 'light' | 'dark';
  backgroundImage?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  action,
  variant,
  backgroundImage,
}) => {
  const isDark = variant === 'dark';

  return (
    <div
      className={`relative group overflow-hidden rounded-3xl md:rounded-[2.5rem] h-[350px] md:h-[400px] p-6 md:p-8 flex flex-col justify-between border transition-colors ${
        isDark
          ? 'bg-brand-900 border-brand-800'
          : 'bg-brand-50 border-brand-100 hover:border-brand-300'
      }`}
    >
      {!isDark && backgroundImage && (
        <img
          src={backgroundImage}
          className="absolute bottom-0 right-0 w-1/2 h-1/2 object-cover rounded-tl-[2.5rem] opacity-50 group-hover:opacity-100 transition-opacity"
          alt="Decoration"
        />
      )}
      {isDark && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px]" />
      )}

      <div>
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
            isDark ? 'bg-white/10 text-white backdrop-blur' : 'bg-brand-100 text-brand-700'
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <h3
          className={`text-2xl font-serif font-bold mb-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h3>
        <p className={`leading-relaxed text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>

      {action && (
        <div className="flex items-center gap-2 text-brand-700 font-medium cursor-pointer group-hover:gap-3 transition-all">
          <span onClick={action.onClick}>{action.label}</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

interface QuoteCardProps {
  image: string;
  quote: string;
  author: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ image, quote, author }) => (
  <div className="relative group overflow-hidden rounded-3xl md:rounded-[2.5rem] h-[300px] md:h-[400px]">
    <img
      src={image}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      alt="Community"
    />
    <div className="absolute inset-0 bg-brand-950/40 p-6 md:p-10 flex flex-col justify-center items-center text-center hover:bg-brand-950/50 transition-colors">
      <Quote className="w-10 h-10 md:w-12 md:h-12 text-white mb-4 md:mb-6 opacity-80" />
      <h3
        className="text-2xl md:text-4xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight"
        dangerouslySetInnerHTML={{ __html: quote }}
      />
      <p className="text-white font-medium">— {author}</p>
    </div>
  </div>
);
