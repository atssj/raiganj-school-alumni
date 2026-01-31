import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../shared/components';
import { useAuth } from '../../auth/components/ProtectedRoute';

export const Overview: React.FC = () => {
  const { user } = useAuth();
  const userName = user?.name?.split(' ')[0] || 'Alumni';

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">
            Welcome back, {userName}!
          </h1>
          <p className="text-brand-100 text-sm md:text-base max-w-lg">
            There are 3 upcoming reunions this winter in Raiganj. Connect with your batchmates now.
          </p>
          <Link to="/dashboard/directory">
            <Button className="mt-6 w-full md:w-auto bg-white text-brand-700 hover:bg-gray-100">
              Find Batchmates
            </Button>
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentJoinees />
        <SchoolNews />
      </div>
    </div>
  );
};

const RecentJoinees: React.FC = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-gray-900">Recent Joinees</h3>
      <Link to="/dashboard/directory" className="text-xs text-brand-600 font-medium hover:underline">
        View All
      </Link>
    </div>
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            <img
              src={`https://picsum.photos/200/200?random=${i}`}
              className="w-full h-full object-cover"
              alt="Alumnus"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Alumnus Name {i}</p>
            <p className="text-xs text-gray-500">Batch of 200{i}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SchoolNews: React.FC = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-gray-900">School News</h3>
    </div>
    <div className="space-y-4">
      <NewsItem date="Oct 12" title="New Science Block Inauguration Ceremony held today." />
      <NewsItem date="Oct 05" title="School Football Team wins district championship." />
    </div>
  </div>
);

const NewsItem: React.FC<{ date: string; title: string }> = ({ date, title }) => (
  <div className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
    <span className="text-xs font-bold text-brand-600 uppercase">{date}</span>
    <p className="text-sm font-medium text-gray-800 mt-1">{title}</p>
  </div>
);
