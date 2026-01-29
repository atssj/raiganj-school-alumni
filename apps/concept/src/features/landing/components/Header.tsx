import React from 'react';
import { Menu, X, ChevronDown, Heart, HandHeart, Landmark, Image, BookOpen, Calendar } from 'lucide-react';
import { ViewState } from '../../../shared/types';
import { Button, Logo } from '../../../shared/components';
import { useScrollHeader } from '../../../shared/hooks';
import { scrollToSection } from '../../../shared/lib/utils';

interface HeaderProps {
  onNavigate: (view: ViewState) => void;
  onLoginClick: () => void;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  onMobileMenuClose: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onLoginClick,
  isMobileMenuOpen,
  onMobileMenuToggle,
  onMobileMenuClose,
}) => {
  const { isScrolled } = useScrollHeader(20);

  const navTextColor = isScrolled ? 'text-gray-900' : 'text-white';
  const navHoverColor = isScrolled ? 'hover:text-brand-600' : 'hover:text-brand-200';
  const logoSubtext = isScrolled ? 'text-gray-500' : 'text-gray-300';
  const menuIconColor = isScrolled ? 'text-gray-900' : 'text-white';

  const handleNavigate = (view: ViewState) => {
    onNavigate(view);
    onMobileMenuClose();
  };

  const handleScrollToGallery = () => {
    scrollToSection('gallery-section');
    onMobileMenuClose();
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100/50 py-2 shadow-sm'
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo size={isScrolled ? 'lg' : '3xl'} />
            <div className="flex flex-col">
              <span
                className={`font-bengali text-lg md:text-xl font-bold tracking-tight leading-none transition-colors ${navTextColor}`}
              >
                রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি
              </span>
              <span
                className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${logoSubtext}`}
              >
                Alumni Network
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <NavDropdown
              label="Vision & Mission"
              icon={Landmark}
              navTextColor={navTextColor}
              navHoverColor={navHoverColor}
              onClick={() => onNavigate(ViewState.ABOUT)}
            />
            <NavDropdown
              label="Gallery"
              icon={Image}
              navTextColor={navTextColor}
              navHoverColor={navHoverColor}
              onClick={() => scrollToSection('gallery-section')}
            />
            <NavDropdown
              label="Stories"
              icon={BookOpen}
              navTextColor={navTextColor}
              navHoverColor={navHoverColor}
              onClick={() => onNavigate(ViewState.STORIES)}
            />
            <NavDropdown
              label="Events"
              icon={Calendar}
              navTextColor={navTextColor}
              navHoverColor={navHoverColor}
              onClick={() => onNavigate(ViewState.EVENTS)}
            />

            {/* Engage Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 ${navTextColor} ${navHoverColor}`}
              >
                Engage
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full right-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-1.5 ring-1 ring-black/5">
                  <DropdownItem icon={Heart} onClick={() => onNavigate(ViewState.DONATE)}>
                    Donate
                  </DropdownItem>
                  <DropdownItem icon={HandHeart} onClick={() => onNavigate(ViewState.VOLUNTEER)}>
                    Volunteer
                  </DropdownItem>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={onLoginClick}
              variant={isScrolled ? 'primary' : 'white'}
              className={`rounded-full px-6 transition-all duration-300 border-none ${
                isScrolled ? 'bg-brand-950 hover:bg-black' : ''
              }`}
            >
              Join Network
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 transition-colors ${menuIconColor}`}
            onClick={onMobileMenuToggle}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-6 space-y-4 h-screen bg-white pb-32 overflow-y-auto">
          <MobileNavLink onClick={() => handleNavigate(ViewState.ABOUT)}>Vision & Mission</MobileNavLink>
          <MobileNavLink onClick={handleScrollToGallery}>Gallery</MobileNavLink>
          <MobileNavLink onClick={() => handleNavigate(ViewState.STORIES)}>Stories</MobileNavLink>
          <MobileNavLink onClick={() => handleNavigate(ViewState.EVENTS)}>Events</MobileNavLink>

          <div className="py-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
              Engage
            </span>
            <MobileEngageLink icon={Heart} onClick={() => handleNavigate(ViewState.DONATE)}>
              Donate
            </MobileEngageLink>
            <MobileEngageLink icon={HandHeart} onClick={() => handleNavigate(ViewState.VOLUNTEER)}>
              Volunteer
            </MobileEngageLink>
          </div>

          <div className="pt-8 flex flex-col gap-4">
            <Button
              size="lg"
              onClick={() => {
                onLoginClick();
                onMobileMenuClose();
              }}
              className="w-full justify-center"
            >
              Join Network
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Sub-components
interface NavDropdownProps {
  label: string;
  icon: React.ElementType;
  navTextColor: string;
  navHoverColor: string;
  onClick: () => void;
  hasDropdown?: boolean;
}

const NavDropdown: React.FC<NavDropdownProps> = ({
  label,
  icon: Icon,
  navTextColor,
  navHoverColor,
  onClick,
  hasDropdown = false,
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 text-sm font-medium transition-colors py-2 ${navTextColor} ${navHoverColor} group`}
  >
    <Icon className="w-4 h-4" />
    {label}
    {hasDropdown && (
      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70" />
    )}
  </button>
);

interface DropdownItemProps {
  icon: React.ElementType;
  onClick: () => void;
  children: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ icon: Icon, onClick, children }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-600 rounded-lg transition-colors flex items-center gap-3"
  >
    <Icon className="w-4 h-4 text-brand-500" /> {children}
  </button>
);

interface MobileNavLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="text-left py-3 font-serif text-2xl font-medium text-gray-900 border-b border-gray-50"
  >
    {children}
  </button>
);

interface MobileEngageLinkProps {
  icon: React.ElementType;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileEngageLink: React.FC<MobileEngageLinkProps> = ({ icon: Icon, onClick, children }) => (
  <button
    onClick={onClick}
    className="text-left w-full py-2 font-serif text-xl font-medium text-gray-900 flex items-center gap-3"
  >
    <Icon className="w-5 h-5 text-brand-500" /> {children}
  </button>
);
