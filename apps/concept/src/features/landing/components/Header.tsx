import React from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
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
            <Logo 
              size={isScrolled ? 'lg' : 'xl'} 
              className={!isScrolled ? 'md:!w-24 md:!h-24 transition-all duration-300' : 'transition-all duration-300'} 
            />
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

          {/* Desktop Menu - Glass Pill Right Aligned */}
          <div className="hidden md:flex items-center">
            <div className={`flex items-center gap-1 pl-6 pr-1.5 py-1.5 rounded-full backdrop-blur-xl border shadow-lg shadow-black/5 transition-all duration-300 ${
              isScrolled 
                ? 'bg-white/80 border-gray-200/60 ring-1 ring-gray-900/5' 
                : 'bg-brand-950/20 border-white/10 ring-1 ring-white/5'
            }`}>
              
              {/* Navigation Items */}
              <div className="flex items-center gap-6 mr-6">
                  <NavDropdown
                    label="About"
                    navTextColor={navTextColor}
                    navHoverColor={isScrolled ? "hover:text-brand-600" : "hover:text-amber-200"}
                    isActive={true} // Hardcoded for this view as per request
                    onClick={() => onNavigate(ViewState.ABOUT)}
                    isScrolled={isScrolled}
                  />
                  <NavDropdown
                    label="Gallery"
                    navTextColor={navTextColor}
                    navHoverColor={isScrolled ? "hover:text-brand-600" : "hover:text-amber-200"}
                    onClick={() => scrollToSection('gallery-section')}
                    isScrolled={isScrolled}
                  />
                  <NavDropdown
                    label="Stories"
                    navTextColor={navTextColor}
                    navHoverColor={isScrolled ? "hover:text-brand-600" : "hover:text-amber-200"}
                    onClick={() => onNavigate(ViewState.STORIES)}
                    isScrolled={isScrolled}
                  />
                  <NavDropdown
                    label="Events"
                    navTextColor={navTextColor}
                    navHoverColor={isScrolled ? "hover:text-brand-600" : "hover:text-amber-200"}
                    onClick={() => onNavigate(ViewState.EVENTS)}
                    isScrolled={isScrolled}
                  />

                {/* Engage Dropdown */}
                <div className="relative group">
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 cursor-pointer ${navTextColor} ${isScrolled ? 'hover:text-brand-600' : 'hover:text-amber-200'}`}
                  >
                    Engage
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70" />
                  </button>
                  <div className="absolute top-full right-0 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-1.5 ring-1 ring-black/5">
                      <DropdownItem onClick={() => onNavigate(ViewState.DONATE)}>
                        Donate
                      </DropdownItem>
                      <DropdownItem onClick={() => onNavigate(ViewState.VOLUNTEER)}>
                        Volunteer
                      </DropdownItem>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button Inside Pill */}
              <Button
                onClick={onLoginClick}
                className="rounded-full px-6 h-10 text-sm font-semibold text-white bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-900/20 border border-blue-500/20 transition-all duration-300"
              >
                Join Network
              </Button>
            </div>
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
            <MobileEngageLink onClick={() => handleNavigate(ViewState.DONATE)}>
              Donate
            </MobileEngageLink>
            <MobileEngageLink onClick={() => handleNavigate(ViewState.VOLUNTEER)}>
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
              className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 rounded-full font-semibold"
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
  navTextColor: string;
  navHoverColor: string;
  onClick: () => void;
  hasDropdown?: boolean;
  isActive?: boolean;
  isScrolled: boolean;
}

const NavDropdown: React.FC<NavDropdownProps> = ({
  label,
  navTextColor,
  navHoverColor,
  onClick,
  hasDropdown = false,
  isActive = false,
  isScrolled,
}) => {
  // Determine active styles based on scroll state for proper contrast
  // When scrolled: use brand colors (darker, more prominent on white bg)
  // When not scrolled: use amber colors (visible on dark bg)
  const activeTextColor = isScrolled
    ? 'text-brand-600'
    : 'text-amber-300';
  const activeUnderlineColor = isScrolled
    ? 'bg-brand-500'
    : 'bg-amber-400/80';
  const activeUnderlineShadow = isScrolled
    ? 'shadow-[0_0_8px_rgba(37,99,235,0.5)]'
    : 'shadow-[0_0_8px_rgba(251,191,36,0.5)]';

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-1.5 text-sm font-medium transition-colors py-2 cursor-pointer ${
        isActive ? activeTextColor : navTextColor
      } ${navHoverColor} group`}
    >
      {label}
      {hasDropdown && (
        <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70" />
      )}
      {isActive && (
        <span className={`absolute bottom-0 left-0 w-full h-0.5 ${activeUnderlineColor} rounded-full ${activeUnderlineShadow}`} />
      )}
    </button>
  );
};

interface DropdownItemProps {
  onClick: () => void;
  children: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-600 rounded-lg transition-colors cursor-pointer"
  >
    {children}
  </button>
);

interface MobileNavLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="text-left py-3 font-serif text-2xl font-medium text-gray-900 border-b border-gray-50 cursor-pointer"
  >
    {children}
  </button>
);

interface MobileEngageLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

const MobileEngageLink: React.FC<MobileEngageLinkProps> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="text-left w-full py-2 font-serif text-xl font-medium text-gray-900 cursor-pointer"
  >
    {children}
  </button>
);
