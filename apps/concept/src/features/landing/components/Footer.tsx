import React, { memo } from "react";
import { Link } from "react-router-dom";
import { MapPin, Facebook, Linkedin, Youtube } from "lucide-react";
import { Credits } from "./Credits";
import { Logo } from "../../../shared/components";
import { cn } from "../../../shared/lib/utils";

// ============================================
// Constants & Configuration
// ============================================

const STYLES = {
  footer: "bg-gradient-to-b from-brand-900 via-brand-950 to-black text-primary-foreground py-12 md:py-20 mt-auto",
  container: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8",
} as const;

interface QuickLinkConfig {
  to: string;
  label: string;
}

const QUICK_LINKS: QuickLinkConfig[] = [
  { to: "/login", label: "Member Login" },
  { to: "/login?redirect=/admin", label: "Admin Login" },
  { to: "/events", label: "Events" },
  { to: "/donate", label: "Donate" },
  { to: "/volunteer", label: "Volunteer" },
] as const;

interface SocialLinkConfig {
  href: string;
  icon: React.ElementType;
  color: string;
  label: string;
}

const SOCIAL_LINKS: SocialLinkConfig[] = [
  { href: "https://facebook.com", icon: Facebook, color: "hover:bg-[#1877F2]", label: "Facebook" },
  { href: "https://linkedin.com", icon: Linkedin, color: "hover:bg-[#0A66C2]", label: "LinkedIn" },
  { href: "https://youtube.com", icon: Youtube, color: "hover:bg-[#FF0000]", label: "YouTube" },
] as const;

// ============================================
// Sub-components
// ============================================

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  color: string;
  label: string;
}

const SocialLink = memo<SocialLinkProps>(({ href, icon: Icon, color, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={cn(
      "w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center",
      "transition-colors cursor-pointer text-white group",
      color
    )}
  >
    <Icon className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
  </a>
));

SocialLink.displayName = "SocialLink";

// ============================================
// Main Component
// ============================================

export const Footer: React.FC = memo(() => {
  return (
    <footer className={STYLES.footer} role="contentinfo" aria-label="Site footer">
      <div className={STYLES.container}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-primary-foreground/20 pb-16">
          {/* Brand Section */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
                <Logo size="xl" />
              </div>
              <div className="flex flex-col">
                <span className="font-bengali text-2xl font-bold text-primary-foreground tracking-tight leading-none">
                  রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-primary-foreground/80 mt-1">
                  Alumni Network
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/80 max-w-sm leading-relaxed mb-8 text-sm">
              Connecting generations of learners from the heart of North
              Dinajpur. <br /> Established 1952.
            </p>
            <nav aria-label="Social media links" className="flex gap-4">
              {SOCIAL_LINKS.map((link) => (
                <SocialLink key={link.label} {...link} />
              ))}
            </nav>
          </div>

          {/* Quick Links Section */}
          <nav className="md:col-span-2 md:col-start-7" aria-label="Quick links">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary-foreground/60">
              Quick Links
            </h4>
            <ul className="space-y-4 text-primary-foreground/80 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Section */}
          <div className="md:col-span-3">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary-foreground/60">
              Contact
            </h4>
            <address className="not-italic">
              <ul className="space-y-4 text-primary-foreground/80 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-foreground/60 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    College Para, Raiganj,
                    <br />
                    North Dinajpur, West Bengal
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center text-primary-foreground/60 shrink-0" aria-hidden="true">
                    @
                  </div>
                  <a
                    href="mailto:contact@raiganjalumni.org"
                    className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 rounded-sm cursor-pointer"
                  >
                    contact@raiganjalumni.org
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-primary-foreground/60 text-sm text-center md:text-left">
          <p className="font-bengali text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} রায়গঞ্জ বিদ্যাচক্র প্রাক্তনী সমিতি
          </p>
          <nav aria-label="Legal links" className="flex gap-8">
            <a
              href="#"
              className="hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 rounded-sm cursor-pointer"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 rounded-sm cursor-pointer"
            >
              Terms of Service
            </a>
          </nav>
        </div>

        {/* Developer Credit Section */}
        <Credits />
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
