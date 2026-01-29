import React from 'react';
import { Target, Compass, Award, BookOpen, Clock } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in pb-12">
      <HeroSection />
      <VisionMissionSection />
      <CoreValuesSection />
      <TimelineSection />
      <PrincipalMessageSection />
    </div>
  );
};

// Sub-components
const HeroSection: React.FC = () => (
  <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 shadow-md">
    <img
      src="https://images.unsplash.com/photo-1592280771800-bcf9fe950d62?q=80&w=2000&auto=format&fit=crop"
      alt="School Building"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/40 to-transparent flex flex-col justify-end p-8 md:p-12">
      <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">Our Legacy</h1>
      <p className="text-brand-100 text-lg md:text-xl max-w-2xl font-light">
        Shaping minds and building character in the heart of Raiganj since 1952.
      </p>
    </div>
  </div>
);

const VisionMissionSection: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <VisionCard />
    <MissionCard />
  </div>
);

const VisionCard: React.FC = () => (
  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-lg transition-shadow">
    <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
      <Compass className="w-6 h-6" />
    </div>
    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Our Vision</h2>
    <p className="text-gray-600 leading-relaxed flex-1">
      To be a beacon of educational excellence in North Bengal, nurturing global citizens who foster
      innovation, integrity, and social responsibility while staying rooted in their cultural
      heritage.
    </p>
  </div>
);

const MissionCard: React.FC = () => (
  <div className="bg-brand-900 p-8 rounded-3xl border border-brand-800 shadow-sm flex flex-col h-full relative overflow-hidden text-white">
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-300 mb-6 relative z-10">
      <Target className="w-6 h-6" />
    </div>
    <h2 className="text-2xl font-serif font-bold text-white mb-4 relative z-10">Our Mission</h2>
    <p className="text-brand-100 leading-relaxed flex-1 relative z-10">
      To empower students with holistic education that balances academic rigor with co-curricular
      growth. We strive to create an inclusive environment that encourages critical thinking, empathy,
      and lifelong learning.
    </p>
  </div>
);

const CoreValuesSection: React.FC = () => (
  <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Core Values</h2>
      <div className="w-24 h-1 bg-brand-600 mx-auto rounded-full" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <ValueCard icon={Award} title="Excellence" description="Striving for the highest standards in everything we do." />
      <ValueCard icon={BookOpen} title="Knowledge" description="Pursuing truth and understanding through rigorous inquiry." />
      <ValueCard icon={Clock} title="Tradition" description="Honoring our rich history while embracing the future." />
    </div>
  </div>
);

interface ValueCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon: Icon, title, description }) => (
  <div className="text-center">
    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-600 mx-auto mb-4 shadow-sm border border-gray-100">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);

const TIMELINE_EVENTS = [
  {
    year: '1952',
    title: 'Foundation Stone',
    description:
      'The school was established in a small building near the river Kulik with just 50 students and 5 teachers.',
    position: 'left',
  },
  {
    year: '1980',
    title: 'New Campus Inaugurated',
    description:
      'Moved to the current sprawling campus at College Para, introducing modern science laboratories.',
    position: 'right',
  },
  {
    year: '2002',
    title: 'Golden Jubilee',
    description:
      'Celebrated 50 glorious years of excellence. The Alumni Association was formally registered this year.',
    position: 'left',
  },
  {
    year: '2023',
    title: 'Digital Transformation',
    description: 'Launch of smart classrooms and this dedicated Alumni Digital Platform.',
    position: 'right',
  },
];

const TimelineSection: React.FC = () => (
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10 text-center">
      Journey Through Time
    </h2>
    <div className="relative border-l-2 border-brand-200 ml-4 md:ml-1/2 md:translate-x-[-1px] space-y-12">
      {TIMELINE_EVENTS.map((event, index) => (
        <TimelineEvent key={event.year} event={event} isFirst={index === 0} />
      ))}
    </div>
  </div>
);

interface TimelineEventProps {
  event: (typeof TIMELINE_EVENTS)[0];
  isFirst: boolean;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ event, isFirst }) => {
  const isLeft = event.position === 'left';

  return (
    <div className="relative pl-8 md:pl-0 md:flex md:justify-between items-center group">
      <div
        className={`absolute left-[-9px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm md:left-1/2 md:translate-x-[-50%] ${
          isFirst ? 'bg-brand-600' : 'bg-brand-200 group-hover:bg-brand-600'
        } transition-colors`}
      />
      <div className={`md:w-[45%] ${isLeft ? 'md:text-right md:pr-12' : 'md:order-last md:pl-12'}`}>
        <span className="text-brand-600 font-bold tracking-widest text-sm">{event.year}</span>
        <h3 className="text-xl font-bold text-gray-900 mt-1">{event.title}</h3>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">{event.description}</p>
      </div>
      <div className={`hidden md:block md:w-[45%] ${isLeft ? '' : 'md:order-first'}`} />
    </div>
  );
};

const PrincipalMessageSection: React.FC = () => (
  <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-lg mt-12">
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
      <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=400&auto=format&fit=crop"
          alt="Principal"
          className="w-full h-full object-cover rounded-2xl shadow-md"
        />
      </div>
      <div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">From the Principal&apos;s Desk</h2>
        <p className="text-brand-600 font-medium mb-4">Mr. S. K. Das, M.Sc, B.Ed</p>
        <div className="text-gray-600 space-y-4 italic leading-relaxed relative">
          <span className="absolute -top-4 -left-2 text-6xl text-brand-100 font-serif -z-10">&ldquo;</span>
          <p>
            &quot;It gives me immense pride to see our alumni shining across the globe. You are the true
            ambassadors of our institution. This platform is a bridge to connect your past with our
            present. I invite you all to come back, mentor the current generation, and keep the flag
            of <span className="font-bengali not-italic">রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি</span> flying high.&quot;
          </p>
          <p>The school has grown leaps and bounds, but our core values remain unchanged.</p>
        </div>
      </div>
    </div>
  </div>
);
