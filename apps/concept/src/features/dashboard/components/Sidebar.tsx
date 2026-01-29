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
import { ViewState, AlumniProfile } from '../../../shared/types';
import { Logo } from '../../../shared/components';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  currentUser: AlumniProfile;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onChangeView,
  currentUser,
  onLogout,
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
      onClick={() => onChangeView(view)}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors mb-1 ${
        currentView === view
          ? 'bg-brand-50 text-brand-700 font-semibold shadow-sm'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon
        className={`w-4.5 h-4.5 ${
          currentView === view ? 'text-brand-600 stroke-[2.5px]' : 'text-gray-400'
        }`}
      />
      {label}
    </button>
  );

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-20 overflow-y-auto scrollbar-hide">
      <div className="p-6 pb-0">
        <div
          className="flex items-center space-x-3 mb-8 cursor-pointer"
          onClick={() => onChangeView(ViewState.DASHBOARD_HOME)}
        >
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-sm">
            <Logo size="sm" />
          </div>
          <span className="font-bengali text-lg font-bold text-gray-900 tracking-tight">
            রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি
          </span>
        </div>
      </div>

      <div className="flex-1 px-4 pb-6">
        <nav className="space-y-0.5">
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
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <NavItem view={ViewState.PROFILE} icon={UserCircle} label="My Profile" />
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full mt-1"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Sign Out</span>
        </button>
        <div className="flex items-center gap-3 mt-4 px-2">
          <img
            src={currentUser.avatar}
            alt="Profile"
            className="w-8 h-8 rounded-full border border-gray-200 object-cover shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-900 truncate">{currentUser.name}</p>
            <p className="text-[10px] text-gray-500 truncate">Batch of {currentUser.batch}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
