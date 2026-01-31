import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  Calendar,
  LogOut,
  CreditCard,
  UserCircle,
  Heart,
  HandHeart,
  Image,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Logo, Button } from '../../../shared/components';

interface SidebarProps {
  onLogout: () => void;
  isCollapsed: boolean;
  isAdmin: boolean;
  user: {
    id: string;
    name: string;
    batch: number;
    location: string;
    profession: string;
    avatar: string;
  } | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onLogout,
  isCollapsed,
  isAdmin,
  user,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const NavItem = ({
    to,
    icon: Icon,
    label,
    isDanger = false,
  }: {
    to?: string;
    icon: React.ElementType;
    label: string;
    isDanger?: boolean;
  }) => {
    const isActive = to ? currentPath === to || currentPath.startsWith(to + '/') : false;
    
    if (isDanger) {
      return (
        <div className="relative group">
          <Button
            onClick={onLogout}
            variant="ghost"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 justify-start text-rose-600 hover:bg-rose-50 hover:text-rose-700"
          >
            <Icon className="w-4.5 h-4.5 text-rose-500 group-hover:text-rose-600 transition-all duration-200" />
            {!isCollapsed && <span className="truncate tracking-tight">{label}</span>}
          </Button>
        </div>
      );
    }

    return (
      <div className="relative group">
        <Link
          to={to || '#'}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
            isActive
              ? 'font-semibold shadow-sm bg-brand-600 text-white'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium'
          } ${isCollapsed ? 'justify-center' : ''}`}
        >
          <Icon
            className={`transition-all duration-200 ${
              isActive ? 'text-current' : 'text-gray-400 group-hover:text-gray-600'
            } ${isCollapsed ? 'w-5 h-5' : 'w-4.5 h-4.5'}`}
          />
          {!isCollapsed && <span className="truncate tracking-tight">{label}</span>}
        </Link>
        
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
          <Link
            to={isAdmin ? '/admin' : '/dashboard'}
            className={`flex items-center justify-center cursor-pointer transition-all duration-300 ${isCollapsed ? 'scale-90' : 'scale-100'}`}
          >
             <Logo size="md" />
          </Link>
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide py-2 px-3 space-y-0.5">
          <NavItem
            to={isAdmin ? '/admin' : '/dashboard'}
            icon={Home}
            label="Overview"
          />

          {isAdmin ? (
            <>
              <SectionHeader label="Administration" />
              <NavItem to="/admin/members" icon={Users} label="Member Management" />
              <NavItem to="/admin/donations" icon={Heart} label="Donation Reports" />
              <NavItem to="/admin/events" icon={Calendar} label="Event Management" />
              <NavItem to="/admin/volunteers" icon={HandHeart} label="Volunteer Requests" />
              
              <SectionHeader label="Community" />
              <NavItem to="/admin/directory" icon={Users} label="Directory" />
              <NavItem to="/admin/community-events" icon={Calendar} label="Events & Reunions" />
              <NavItem to="/admin/gallery" icon={Image} label="Gallery & Archive" />
              <NavItem to="/admin/donate" icon={HandHeart} label="Donations" />
            </>
          ) : (
            <>
              <SectionHeader label="Community" />
              <NavItem to="/dashboard/directory" icon={Users} label="Directory" />
              <NavItem to="/dashboard/events" icon={Calendar} label="Events" />
              <NavItem to="/dashboard/gallery" icon={Image} label="Gallery" />
              <NavItem to="/dashboard/stories" icon={BookOpen} label="Stories" />
              <NavItem to="/dashboard/ai-assistant" icon={Sparkles} label="AI Assistant" />

              <SectionHeader label="Personal" />
              <NavItem to="/dashboard/profile" icon={UserCircle} label="My Profile" />
              <NavItem to="/dashboard/membership" icon={CreditCard} label="Membership" />
              <NavItem to="/dashboard/donate" icon={Heart} label="Donate" />
              <NavItem to="/dashboard/volunteer" icon={HandHeart} label="Volunteer" />
            </>
          )}
        </div>

        {/* Footer / Profile Area */}
        <div className="p-3 border-t border-gray-100 bg-white">
           <div className="space-y-0.5 mb-3">
             <NavItem icon={LogOut} label="Sign Out" isDanger />
           </div>

           {!isCollapsed && !isAdmin && user && (
             <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-gray-50 border border-gray-100">
               <img
                 src={user.avatar}
                 alt="Profile"
                 className="w-8 h-8 rounded-full border border-gray-200 object-cover shadow-sm bg-white"
               />
               <div className="flex-1 min-w-0">
                 <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                 <p className="text-xs text-gray-500 truncate">Batch of {user.batch}</p>
               </div>
             </div>
           )}

           {isCollapsed && !isAdmin && user && (
             <div className="flex justify-center pt-2 border-t border-gray-100">
                <img
                 src={user.avatar}
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
