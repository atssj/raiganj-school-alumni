import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Target,
  Image as ImageIcon,
  BookOpen,
  Calendar,
  Heart,
  HandHeart,
  LogIn,
} from 'lucide-react';
import { Button, Logo } from '../../../shared/components';
import { useScrollHeader } from '../../../shared/hooks';

interface HeaderProps {
  variant?: 'transparent' | 'solid';
}

export const Header: React.FC<HeaderProps> = ({ variant = 'transparent' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isScrolled } = useScrollHeader(20);

  // If variant is solid, always show solid background and dark text
  const isSolid = variant === 'solid' || isScrolled;

  const navTextColor = isSolid ? 'text-gray-900' : 'text-white';
  const logoSubtext = isSolid ? 'text-gray-500' : 'text-gray-300';
  const menuIconColor = isSolid ? 'text-gray-900' : 'text-white';

  return (
    <>
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isSolid
          ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100/50 py-2 shadow-sm'
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo
              size={isSolid ? 'lg' : 'xl'}
              className={
                !isSolid ? 'md:!w-24 md:!h-24 transition-all duration-300' : 'transition-all duration-300'
              }
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
          </Link>

          {/* Desktop Menu - Glass Pill Right Aligned */}
          <div className="hidden md:flex items-center">
            <div
              className={`flex items-center gap-1 pl-6 pr-1.5 py-1.5 rounded-full backdrop-blur-xl border shadow-lg shadow-black/5 transition-all duration-300 ${
                isSolid
                  ? 'bg-white/80 border-gray-200/60 ring-1 ring-gray-900/5'
                  : 'bg-brand-950/20 border-white/10 ring-1 ring-white/5'
              }`}
            >
              {/* Navigation Items */}
              <div className="flex items-center gap-6 mr-6">
                <NavDropdown
                  label="About"
                  navTextColor={navTextColor}
                  navHoverColor={isSolid ? 'hover:text-brand-600' : 'hover:text-amber-200'}
                  isActive={true}
                  isScrolled={isSolid}
                />
                <NavDropdown
                  label="Gallery"
                  navTextColor={navTextColor}
                  navHoverColor={isSolid ? 'hover:text-brand-600' : 'hover:text-amber-200'}
                  to="/gallery"
                  isScrolled={isSolid}
                />
                <NavDropdown
                  label="Stories"
                  navTextColor={navTextColor}
                  navHoverColor={isSolid ? 'hover:text-brand-600' : 'hover:text-amber-200'}
                  to="/stories"
                  isScrolled={isSolid}
                />
                <NavDropdown
                  label="Events"
                  navTextColor={navTextColor}
                  navHoverColor={isSolid ? 'hover:text-brand-600' : 'hover:text-amber-200'}
                  to="/events"
                  isScrolled={isSolid}
                />

                {/* Engage Dropdown */}
                <div className="relative group">
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 cursor-pointer ${navTextColor} ${
                      isSolid ? 'hover:text-brand-600' : 'hover:text-amber-200'
                    }`}
                  >
                    Engage
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-70" />
                  </button>
                  <div className="absolute top-full right-0 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden p-1.5 ring-1 ring-black/5">
                      <DropdownItem to="/donate">Donate</DropdownItem>
                      <DropdownItem to="/volunteer">Volunteer</DropdownItem>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button Inside Pill */}
              <Link to="/login">
                <Button className="rounded-full px-6 h-10 text-sm font-semibold text-white bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-900/20 border border-blue-500/20 transition-all duration-300">
                  Join Network
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 transition-colors z-50 relative ${
              isMobileMenuOpen ? 'text-gray-900' : menuIconColor
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile Menu Backdrop & Drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMobileMenuOpen ? 'visible' : 'invisible delay-300'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl transition-transform duration-300 ease-out transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Mobile Header in Drawer */}
            <div className="px-6 py-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <Logo size="md" />
                <div className="flex flex-col">
                  <span className="font-bengali text-lg font-bold text-gray-900 leading-none">
                    রায়গঞ্জ বিদ্যাচক্র
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-brand-600 font-bold mt-1">
                    Alumni Network
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 py-6 px-4 space-y-1">
              <MobileNavLink to="/about" icon={Target} color="text-blue-600" bgColor="bg-blue-50">
                Vision & Mission
              </MobileNavLink>

              <MobileNavLink to="/gallery" icon={ImageIcon} color="text-purple-600" bgColor="bg-purple-50">
                Gallery
              </MobileNavLink>

              <MobileNavLink to="/stories" icon={BookOpen} color="text-amber-600" bgColor="bg-amber-50">
                Stories
              </MobileNavLink>

              <MobileNavLink to="/events" icon={Calendar} color="text-pink-600" bgColor="bg-pink-50">
                Events
              </MobileNavLink>

              <div className="my-6 border-t border-gray-100" />

              <div className="px-4 mb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Engage</span>
              </div>

              <MobileNavLink to="/donate" icon={Heart} color="text-rose-600" bgColor="bg-rose-50">
                Donate
              </MobileNavLink>

              <MobileNavLink to="/volunteer" icon={HandHeart} color="text-emerald-600" bgColor="bg-emerald-50">
                Volunteer
              </MobileNavLink>
            </div>

            {/* Footer Area */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
              <Link to="/login">
                <Button
                  size="lg"
                  className="w-full justify-center bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/20 rounded-xl font-semibold h-12 text-base"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Join Network
                </Button>
              </Link>
              <p className="text-center text-xs text-gray-400">
                © {new Date().getFullYear()} Raiganj Vidya Chakra Alumni
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface NavDropdownProps {
  label: string;
  navTextColor: string;
  navHoverColor: string;
  to?: string;
  onClick?: () => void;
  isActive?: boolean;
  isScrolled: boolean;
}

const NavDropdown: React.FC<NavDropdownProps> = ({
  label,
  navTextColor,
  navHoverColor,
  to,
  onClick,
  isActive = false,
  isScrolled,
}) => {
  const activeTextColor = isScrolled ? 'text-brand-600' : 'text-amber-300';
  const activeUnderlineColor = isScrolled ? 'bg-brand-500' : 'bg-amber-400/80';
  const activeUnderlineShadow = isScrolled
    ? 'shadow-[0_0_8px_rgba(37,99,235,0.5)]'
    : 'shadow-[0_0_8px_rgba(251,191,36,0.5)]';

  const content = (
    <>
      {label}
      {isActive && (
        <span
          className={`absolute bottom-0 left-0 w-full h-0.5 ${activeUnderlineColor} rounded-full ${activeUnderlineShadow}`}
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={`relative flex items-center gap-1.5 text-sm font-medium transition-colors py-2 ${
          isActive ? activeTextColor : navTextColor
        } ${navHoverColor} group`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-1.5 text-sm font-medium transition-colors py-2 cursor-pointer ${
        isActive ? activeTextColor : navTextColor
      } ${navHoverColor} group`}
    >
      {content}
    </button>
  );
};

interface DropdownItemProps {
  to: string;
  children: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ to, children }) => (
  <Link
    to={to}
    className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-600 rounded-lg transition-colors"
  >
    {children}
  </Link>
);

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, children, icon: Icon, color, bgColor }) => (
  <Link
    to={to}
    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 hover:bg-gray-100 group"
    onClick={() => {}}
  >
    <div
      className={`p-2.5 rounded-lg ${bgColor} ${color} group-hover:scale-110 transition-transform duration-200`}
    >
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900">{children}</span>
    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
      <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
    </div>
  </Link>
);
