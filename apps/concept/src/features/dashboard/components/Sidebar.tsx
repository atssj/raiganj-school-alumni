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
  Shield,
} from 'lucide-react';
import { ViewState, AlumniProfile } from '../../../shared/types';
import { Logo } from '../../../shared/components';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  currentUser: AlumniProfile;
  onLogout: () => void;
  isCollapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onChangeView,
  currentUser,
  onLogout,
  isCollapsed,
}) => {
  const NavItem = ({
    view,
    icon: Icon,
    label,
    isDanger = false,
    onClick,
  }: {
    view?: ViewState;
    icon: React.ElementType;
    label: string;
    isDanger?: boolean;
    onClick?: () => void;
  }) => {
    const isActive = view === currentView;
    return (
      <div className="relative group">
        <button
          onClick={onClick ? onClick : () => view && onChangeView(view)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group-hover:bg-gray-50 ${
            isActive
              ? 'bg-gray-100 text-gray-900 font-semibold shadow-sm'
              : isDanger 
                ? 'text-rose-600 hover:bg-rose-50 hover:text-rose-700'
                : 'text-gray-600 hover:text-gray-900 font-medium'
          } ${isCollapsed ? 'justify-center' : ''}`}
        >
          <Icon
            className={`transition-all duration-200 ${
              isActive ? 'text-gray-900' : isDanger ? 'text-rose-500 group-hover:text-rose-600' : 'text-gray-400 group-hover:text-gray-600'
            } ${isCollapsed ? 'w-5 h-5' : 'w-4.5 h-4.5'}`}
          />
          {!isCollapsed && <span className="truncate tracking-tight">{label}</span>}
        </button>
        
        {/* Tooltip for collapsed mode */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none drop-shadow-lg">
            {label}
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
          </div>
        )}
      </div>
    );
  };

  const SectionHeader = ({ label }: { label: string }) => {
    if (isCollapsed) return <div className="h-px bg-gray-100 mx-4 my-2" />;
    return (
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
          {label}
        </p>
      </div>
    );
  };

  return (
    <aside 
      className={`hidden md:flex flex-col bg-white border-r border-gray-200 fixed h-full z-20 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header / Logo Area */}
        <div className={`flex items-center justify-center h-16 border-b border-gray-50 mb-2`}>
          <div
            className={`flex items-center justify-center cursor-pointer transition-all duration-300 ${isCollapsed ? 'scale-90' : 'scale-100'}`}
            onClick={() => onChangeView(ViewState.DASHBOARD_HOME)}
          >
             <Logo size="md" />
          </div>
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide py-2 px-3 space-y-0.5">
           <NavItem view={ViewState.DASHBOARD_HOME} icon={Home} label="Overview" />
           
           <SectionHeader label="Community" />
           <NavItem view={ViewState.DIRECTORY} icon={Users} label="Directory" />
           <NavItem view={ViewState.MEMBERSHIP} icon={CreditCard} label="Membership" />
           <NavItem view={ViewState.AI_ASSISTANT} icon={Sparkles} label="AI Ice Breaker" />

           <SectionHeader label="Campus Life" />
           <NavItem view={ViewState.EVENTS} icon={Calendar} label="Events & Reunions" />
           <NavItem view={ViewState.STORIES} icon={BookOpen} label="Stories" />
           <NavItem view={ViewState.GALLERY} icon={Image} label="Gallery & Archive" />

           <SectionHeader label="Impact" />
           <NavItem view={ViewState.DONATE} icon={Heart} label="Donate" />
           <NavItem view={ViewState.VOLUNTEER} icon={HandHeart} label="Volunteer" />

           <SectionHeader label="Institute" />
           <NavItem view={ViewState.ABOUT} icon={Landmark} label="About & Vision" />

           <SectionHeader label="Administration" />
           <NavItem view={ViewState.ADMIN} icon={Shield} label="Admin Dashboard" />
        </div>

        {/* Footer / Profile Area */}
        <div className="p-3 border-t border-gray-100 bg-white">
           <div className="space-y-0.5 mb-3">
             <NavItem view={ViewState.PROFILE} icon={UserCircle} label="My Profile" />
             <NavItem icon={LogOut} label="Sign Out" isDanger onClick={onLogout} />
           </div>

           {!isCollapsed && (
             <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-gray-50 border border-gray-100">
               <img
                 src={currentUser.avatar}
                 alt="Profile"
                 className="w-8 h-8 rounded-full border border-gray-200 object-cover shadow-sm bg-white"
               />
               <div className="flex-1 min-w-0">
                 <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.name}</p>
                 <p className="text-xs text-gray-500 truncate">Batch of {currentUser.batch}</p>
               </div>
             </div>
           )}
           
           {isCollapsed && (
             <div className="flex justify-center pt-2 border-t border-gray-100">
                <img
                 src={currentUser.avatar}
                 alt="Profile"
                 className="w-8 h-8 rounded-full border border-gray-200 object-cover shadow-sm bg-white"
               />
             </div>
           )}
        </div>
      </div>
    </aside>
  );
};
