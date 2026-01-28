
import React from 'react';
import { ViewState, AlumniProfile } from '../types';
import { Directory } from './Directory';
import { ReconnectionAssistant } from './ReconnectionAssistant';
import { Events } from './Events';
import { Membership } from './Membership';
import { Stories } from './Stories';
import { Profile } from './Profile';
import { Donate } from './Donate';
import { Volunteer } from './Volunteer';
import { Gallery } from './Gallery';
import { About } from './About';
import { Menu, X, Home, Users, Calendar, Sparkles, CreditCard, BookOpen, UserCircle, LogOut, Heart, HandHeart, Image, Landmark } from 'lucide-react';
import { Sidebar } from './dashboard/Sidebar';
import { Overview } from './dashboard/Overview';

interface DashboardProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onLogout: () => void;
  currentUser: AlumniProfile;
  onUpdateUser: (user: AlumniProfile) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentView, onChangeView, onLogout, currentUser, onUpdateUser }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Mobile Nav Helper
  const NavItem = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => (
    <button
      onClick={() => {
        onChangeView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
        currentView === view 
          ? 'bg-brand-50 text-brand-700 font-semibold' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon className={`w-5 h-5 ${currentView === view ? 'text-brand-600 stroke-[2.5px]' : 'text-gray-400'}`} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentView={currentView} 
        onChangeView={onChangeView} 
        currentUser={currentUser} 
        onLogout={onLogout} 
      />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white z-30 border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
        <span className="font-serif text-lg font-bold text-gray-900">বিদ্যাচক্র প্রাক্তনী সমিতি</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2 text-gray-700">
            {isMobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="absolute top-0 right-0 w-[80%] max-w-sm h-full bg-white shadow-2xl flex flex-col pt-16 animate-fade-in">
                 <div className="flex-1 overflow-y-auto p-4">
                    <nav className="space-y-1">
                        <NavItem view={ViewState.DASHBOARD_HOME} icon={Home} label="Overview" />
                        
                        <div className="pt-6 pb-2 px-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">The Institute</p>
                        </div>
                        <NavItem view={ViewState.ABOUT} icon={Landmark} label="About & Vision" />

                        <div className="pt-6 pb-2 px-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Connect</p>
                        </div>
                        <NavItem view={ViewState.DIRECTORY} icon={Users} label="Directory" />
                        <NavItem view={ViewState.AI_ASSISTANT} icon={Sparkles} label="AI Ice Breaker" />

                        <div className="pt-6 pb-2 px-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Campus Life</p>
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
                    <button onClick={onLogout} className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                 </div>
            </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto min-h-[calc(100vh-6rem)]">
            {currentView === ViewState.DASHBOARD_HOME && <Overview currentUser={currentUser} onChangeView={onChangeView} />}
            {currentView === ViewState.DIRECTORY && <Directory />}
            {currentView === ViewState.EVENTS && <Events />}
            {currentView === ViewState.GALLERY && <Gallery />}
            {currentView === ViewState.STORIES && <Stories />}
            {currentView === ViewState.AI_ASSISTANT && <ReconnectionAssistant />}
            {currentView === ViewState.MEMBERSHIP && <Membership />}
            {currentView === ViewState.DONATE && <Donate />}
            {currentView === ViewState.VOLUNTEER && <Volunteer />}
            {currentView === ViewState.PROFILE && <Profile user={currentUser} onUpdate={onUpdateUser} />}
            {currentView === ViewState.ABOUT && <About />}
        </div>
      </main>
    </div>
  );
};
