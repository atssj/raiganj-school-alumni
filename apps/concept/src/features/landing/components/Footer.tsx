import React from "react";
import { MapPin, Facebook, Linkedin, Youtube } from "lucide-react";
import { ViewState } from "../../../shared/types";
import { Logo } from "../../../shared/components";

interface FooterProps {
  onNavigate: (view: ViewState) => void;
  onLoginClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onLoginClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-white py-12 md:py-20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-brand-900 pb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Logo size="xl" />
              </div>
              <div className="flex flex-col">
                <span className="font-bengali text-2xl font-bold text-white tracking-tight leading-none">
                  রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand-200/80 mt-1">
                  Alumni Network
                </span>
              </div>
            </div>
            <p className="text-brand-200/80 max-w-sm leading-relaxed mb-8 text-sm">
              Connecting generations of learners from the heart of North
              Dinajpur. <br /> Established 1952.
            </p>
            <div className="flex gap-4">
              <SocialLink
                href="https://facebook.com"
                icon={Facebook}
                color="hover:bg-[#1877F2]"
              />
              <SocialLink
                href="https://linkedin.com"
                icon={Linkedin}
                color="hover:bg-[#0A66C2]"
              />
              <SocialLink
                href="https://youtube.com"
                icon={Youtube}
                color="hover:bg-[#FF0000]"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-brand-400">
              Quick Links
            </h4>
            <ul className="space-y-4 text-brand-200/80 text-sm">
              <li>
                <FooterLink onClick={onLoginClick}>Member Login</FooterLink>
              </li>
              <li>
                <FooterLink onClick={() => onNavigate(ViewState.EVENTS)}>
                  Events
                </FooterLink>
              </li>
              <li>
                <FooterLink onClick={() => onNavigate(ViewState.DONATE)}>
                  Donate
                </FooterLink>
              </li>
              <li>
                <FooterLink onClick={() => onNavigate(ViewState.VOLUNTEER)}>
                  Volunteer
                </FooterLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-brand-400">
              Contact
            </h4>
            <ul className="space-y-4 text-brand-200/80 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-400 mt-0.5" />
                <span>
                  College Para, Raiganj,
                  <br />
                  North Dinajpur, West Bengal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center text-brand-400">
                  @
                </div>
                contact@raiganjalumni.org
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-300/60 text-sm text-center md:text-left">
          <p className="font-bengali">
            &copy; {currentYear} রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sub-components
interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  color: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center ${color} transition-colors cursor-pointer text-white group`}
  >
    <Icon className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
  </a>
);

interface FooterLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ onClick, children }) => (
  <button onClick={onClick} className="hover:text-white transition-colors">
    {children}
  </button>
);
