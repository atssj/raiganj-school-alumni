import React, { memo, useCallback } from "react";
import { MapPin, Facebook, Linkedin, Youtube } from "lucide-react";
import { ViewState } from "../../../shared/types";
import { Credits } from "./Credits";
import { Logo, Copyright } from "../../../shared/components";
import { cn } from "../../../shared/lib/utils";

interface FooterProps {
  onNavigate: (view: ViewState) => void;
  onLoginClick: () => void;
  onAdminLogin: () => void;
}

// ============================================
// Constants & Configuration
// ============================================

/**
 * Centralized style constants for maintainability.
 * Using 'as const' ensures type safety and prevents accidental mutations.
 */
const STYLES = {
  footer: "bg-gradient-to-b from-brand-900 via-brand-950 to-black text-primary-foreground py-12 md:py-20 mt-auto",
  container: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8",
} as const;

/**
 * Quick links configuration with proper type discrimination.
 * Using a union type with 'type' discriminator for type-safe handling.
 */
type QuickLink =
  | { type: "action"; label: string; action: "login" | "admin" }
  | { type: "navigate"; label: string; view: ViewState };

const QUICK_LINKS: QuickLink[] = [
  { type: "action", label: "Member Login", action: "login" },
  { type: "action", label: "Admin Login", action: "admin" },
  { type: "navigate", label: "Events", view: ViewState.EVENTS },
  { type: "navigate", label: "Donate", view: ViewState.DONATE },
  { type: "navigate", label: "Volunteer", view: ViewState.VOLUNTEER },
] as const;

/**
 * Social links configuration with accessibility labels.
 */
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

/**
 * Memoized SocialLink component to prevent unnecessary re-renders.
 * Uses cn() utility for cleaner className composition.
 */
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

interface FooterLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

/**
 * Memoized FooterLink component with proper button semantics.
 */
const FooterLink = memo<FooterLinkProps>(({ onClick, children }) => (
  <button
    onClick={onClick}
    className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 rounded-sm cursor-pointer"
  >
    {children}
  </button>
));

FooterLink.displayName = "FooterLink";

// ============================================
// Main Component
// ============================================

/**
 * Footer component - Main footer for the landing page.
 *
 * Performance optimizations:
 * - Wrapped with React.memo to prevent re-renders when props haven't changed
 * - useMemo for currentYear calculation
 * - useCallback for event handlers
 * - Sub-components are memoized
 *
 * Accessibility:
 * - Proper heading hierarchy
 * - ARIA labels for social links
 * - Focus indicators for interactive elements
 */
export const Footer: React.FC<FooterProps> = memo(({
  onNavigate,
  onLoginClick,
  onAdminLogin,
}) => {


  /**
   * Type-safe handler for quick link clicks.
   * Uses discriminated union pattern for exhaustiveness checking.
   */
  const handleQuickLinkClick = useCallback((link: QuickLink) => {
    switch (link.type) {
      case "action":
        if (link.action === "login") {
          onLoginClick();
        } else {
          onAdminLogin();
        }
        break;
      case "navigate":
        onNavigate(link.view);
        break;
      default:
        // Exhaustiveness check - TypeScript will error if a case is missing
        const _exhaustiveCheck: never = link;
        console.error("Unhandled link type:", _exhaustiveCheck);
    }
  }, [onLoginClick, onAdminLogin, onNavigate]);

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
                  <FooterLink onClick={() => handleQuickLinkClick(link)}>
                    {link.label}
                  </FooterLink>
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
          <Copyright className="text-primary-foreground/60 text-sm" />
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
