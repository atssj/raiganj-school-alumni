import React from 'react';
import {
  Home,
  Users,
  Calendar,
  Sparkles,
  LogOut,
  CreditCard,
  BookOpen,
  UserCircle,
  Heart,
  HandHeart,
  Image,
  Landmark,
} from 'lucide-react';
import { ViewState } from '../../../shared/types';

interface MobileNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentView,
  onChangeView,
  onLogout,
  isOpen,
  onClose,
}) => {
  const NavItem = ({
    view,
    icon: Icon,
    label,
  }: {
    view: ViewState;
    icon: React.ElementType;
    label: string;
  }) => (
    <button
      onClick={() => {
        onChangeView(view);
        onClose();
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
        currentView === view
          ? 'bg-brand-50 text-brand-700 font-semibold'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon
        className={`w-5 h-5 ${currentView === view ? 'text-brand-600 stroke-[2.5px]' : 'text-gray-400'}`}
      />
      {label}
    </button>
  );

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-20">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 right-0 w-[80%] max-w-sm h-full bg-white shadow-2xl flex flex-col pt-16 animate-fade-in">
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            <NavItem view={ViewState.DASHBOARD_HOME} icon={Home} label="Overview" />

            <div className="pt-6 pb-2 px-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                The Institute
              </p>
            </div>
            <NavItem view={ViewState.ABOUT} icon={Landmark} label="About & Vision" />

            <div className="pt-6 pb-2 px-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Connect</p>
            </div>
            <NavItem view={ViewState.DIRECTORY} icon={Users} label="Directory" />
            <NavItem view={ViewState.AI_ASSISTANT} icon={Sparkles} label="AI Ice Breaker" />

            <div className="pt-6 pb-2 px-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Campus Life
              </p>
            </div>
            <NavItem view={ViewState.EVENTS} icon={Calendar} label="Events & Reunions" />
            <NavItem view={ViewState.STORIES} icon={BookOpen} label="Stories" />
            <NavItem view={ViewState.GALLERY} icon={Image} label="Gallery & Archive" />

            <div className="pt-6 pb-2 px-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Support</p>
            </div>
            <NavItem view={ViewState.MEMBERSHIP} icon={CreditCard} label="Membership" />
            <NavItem view={ViewState.DONATE} icon={Heart} label="Donate" />
            <NavItem view={ViewState.VOLUNTEER} icon={HandHeart} label="Volunteer" />

            <div className="pt-6 pb-2 border-t border-gray-100 mt-4">
              <NavItem view={ViewState.PROFILE} icon={UserCircle} label="My Profile" />
            </div>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
