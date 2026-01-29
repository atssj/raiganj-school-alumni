import React from 'react';
import { Users, Calendar, Heart } from 'lucide-react';
import { ViewState } from '../../../shared/types';
import { Reveal } from '../../../shared/components';

interface FeaturesProps {
  onNavigate: (view: ViewState) => void;
}

export const Features: React.FC<FeaturesProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Users,
      title: 'Global Directory',
      description:
        'Search for batchmates by year, city, or profession. Our network spans across continents, yet is rooted in Raiganj.',
      view: ViewState.DIRECTORY,
    },
    {
      icon: Calendar,
      title: 'Events & Reunions',
      description:
        'From the nostalgic Saraswati Puja to the Grand Winter Reunion. RSVP to events and make new memories.',
      view: ViewState.EVENTS,
    },
    {
      icon: Heart,
      title: 'Giving Back',
      description:
        'Support the institution that supported you. Create scholarships, fund infrastructure, or mentor a student.',
      view: ViewState.DONATE,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Why Join the Network?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 100}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                onClick={() => onNavigate(feature.view)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, onClick }) => (
  <div
    className="group cursor-pointer p-6 md:p-8 rounded-[2rem] hover:bg-gray-50 transition-colors duration-500"
    onClick={onClick}
  >
    <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-brand-700 transition-colors">
      {title}
    </h3>
    <p className="text-gray-500 leading-relaxed text-sm md:text-base">{description}</p>
  </div>
);
