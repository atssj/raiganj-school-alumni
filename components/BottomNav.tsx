import React from 'react';
import { Home, Users, Calendar, BookOpen, Heart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ViewState } from '../types';

interface BottomNavProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onNavigate, currentView }) => {
  const navItems = [
    { icon: Home, label: 'Home', view: ViewState.HOME },
    { icon: Users, label: 'Alumni', view: ViewState.ALUMNI },
    { icon: Calendar, label: 'Events', view: ViewState.EVENTS },
    { icon: BookOpen, label: 'Stories', view: ViewState.STORIES },
    { icon: Heart, label: 'Donate', view: ViewState.DONATE },
    { icon: User, label: 'Profile', view: ViewState.PROFILE },
  ];

  const isActive = (view: ViewState) => {
    return currentView === view;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.view);
          
          return (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                active ? 'text-brand-600' : 'text-gray-500 hover:text-brand-500'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'fill-current' : ''}`} />
              <span className="text-xs mt-1">{item.label}</span>
              {active && (
                <div className="w-1 h-1 rounded-full bg-brand-600 mt-1"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
