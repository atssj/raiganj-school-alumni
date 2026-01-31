import React from 'react';
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
} from 'lucide-react';
import { ViewState } from '../../../shared/types';
import { Button } from '../../../shared/components';

interface MobileNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentView,
  onChangeView,
  onLogout,
  isOpen,
  onClose,
  isAdmin,
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
    <Button
      variant={currentView === view ? 'default' : 'ghost'}
      onClick={() => {
        onChangeView(view);
        onClose();
      }}
      className={`w-full justify-start gap-3 px-4 py-3 h-auto text-base font-medium ${
        currentView === view ? 'shadow-sm' : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      <Icon
        className={`w-5 h-5 mr-2 ${currentView === view ? 'text-current' : 'text-gray-400'}`}
      />
      {label}
    </Button>
  );

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-20">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 right-0 w-[80%] max-w-sm h-full bg-white shadow-2xl flex flex-col pt-16 animate-fade-in">
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            <NavItem
              view={isAdmin ? ViewState.ADMIN : ViewState.DASHBOARD_HOME}
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
                <NavItem view={ViewState.ADMIN_MEMBERS} icon={Users} label="Member Management" />
                <NavItem view={ViewState.ADMIN_DONATION_WORK} icon={Heart} label="Donation Reports" />
                <NavItem view={ViewState.ADMIN_EVENTS} icon={Calendar} label="Event Management" />
                <NavItem view={ViewState.DIRECTORY} icon={Users} label="Directory" />
                <NavItem view={ViewState.EVENTS} icon={Calendar} label="Events & Reunions" />
                <NavItem view={ViewState.GALLERY} icon={Image} label="Gallery & Archive" />
                <NavItem view={ViewState.DONATE} icon={HandHeart} label="Donations" />
              </>
            ) : (
              <>
                <div className="pt-6 pb-2 px-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Community
                  </p>
                </div>
                <NavItem view={ViewState.DIRECTORY} icon={Users} label="Directory" />
                <NavItem view={ViewState.EVENTS} icon={Calendar} label="Events" />

                <div className="pt-6 pb-2 px-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Personal</p>
                </div>
                <NavItem view={ViewState.PROFILE} icon={UserCircle} label="My Profile" />
                <NavItem view={ViewState.MEMBERSHIP} icon={CreditCard} label="Membership" />
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
