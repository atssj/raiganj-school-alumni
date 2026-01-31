import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  Calendar,
  LogOut,
  CreditCard,
  Heart,
  HandHeart,
  Image,
  UserCircle,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../../shared/components';

interface MobileNavProps {
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  onLogout,
  isOpen,
  onClose,
  isAdmin,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const NavItem = ({
    to,
    icon: Icon,
    label,
  }: {
    to: string;
    icon: React.ElementType;
    label: string;
  }) => {
    const isActive = currentPath === to || currentPath.startsWith(to + '/');
    
    return (
      <Link
        to={to}
        onClick={onClose}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
          isActive
            ? 'bg-brand-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-current' : 'text-gray-400'}`} />
        {label}
      </Link>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 right-0 w-[80%] max-w-sm h-full bg-white shadow-2xl flex flex-col pt-16 animate-fade-in">
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            <NavItem
              to={isAdmin ? '/admin' : '/dashboard'}
              icon={Home}
              label="Overview"
            />

            {isAdmin ? (
              <>
                <div className="pt-6 pb-2 px-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Administration
                  </p>
                </div>
                <NavItem to="/admin/members" icon={Users} label="Member Management" />
                <NavItem to="/admin/donations" icon={Heart} label="Donation Reports" />
                <NavItem to="/admin/events" icon={Calendar} label="Event Management" />
                <NavItem to="/admin/volunteers" icon={HandHeart} label="Volunteer Requests" />
                
                <div className="pt-6 pb-2 px-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Community
                  </p>
                </div>
                <NavItem to="/dashboard/directory" icon={Users} label="Directory" />
                <NavItem to="/dashboard/events" icon={Calendar} label="Events & Reunions" />
                <NavItem to="/dashboard/gallery" icon={Image} label="Gallery & Archive" />
                <NavItem to="/dashboard/donate" icon={HandHeart} label="Donations" />
              </>
            ) : (
              <>
                <div className="pt-6 pb-2 px-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Community
                  </p>
                </div>
                <NavItem to="/dashboard/directory" icon={Users} label="Directory" />
                <NavItem to="/dashboard/events" icon={Calendar} label="Events" />
                <NavItem to="/dashboard/gallery" icon={Image} label="Gallery" />
                <NavItem to="/dashboard/stories" icon={BookOpen} label="Stories" />
                <NavItem to="/dashboard/ai-assistant" icon={Sparkles} label="AI Assistant" />

                <div className="pt-6 pb-2 px-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Personal</p>
                </div>
                <NavItem to="/dashboard/profile" icon={UserCircle} label="My Profile" />
                <NavItem to="/dashboard/membership" icon={CreditCard} label="Membership" />
                <NavItem to="/dashboard/donate" icon={Heart} label="Donate" />
                <NavItem to="/dashboard/volunteer" icon={HandHeart} label="Volunteer" />
              </>
            )}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start gap-3 px-4 py-3 h-auto text-base font-medium text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5 mr-2" /> Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};
