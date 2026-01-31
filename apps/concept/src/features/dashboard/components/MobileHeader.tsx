import React from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '../../../shared/components';

interface MobileHeaderProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ isMenuOpen, onMenuToggle }) => (
  <div className="md:hidden fixed top-0 left-0 w-full bg-white z-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
    <div className="flex items-center gap-2">
      <Logo size="sm" />
      <span className="font-bengali text-lg font-bold text-gray-900">
        রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি
      </span>
    </div>
    <button onClick={onMenuToggle} className="p-2 -mr-2 text-gray-700">
      {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  </div>
);
