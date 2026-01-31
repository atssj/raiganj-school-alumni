import { createHashRouter, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LandingPage } from "../features/landing";
import { PublicLayout } from "../features/landing/PublicLayout";
import { About } from "../features/about";
import { Gallery } from "../features/gallery";
import { Stories } from "../features/stories";
import { Events } from "../features/events";
import { Donate } from "../features/donation";
import { Volunteer } from "../features/volunteer";
import { LoginPage } from "../features/auth/LoginPage";
import { DashboardLayout } from "../features/dashboard/DashboardLayout";
import { Overview } from "../features/dashboard/components";
import { Directory } from "../features/directory";
import { ReconnectionAssistant } from "../features/ai-assistant";
import { Membership } from "../features/membership";
import { Profile } from "../features/profile";
import { Admin } from "../features/admin";
import { AdminMembers } from "../features/admin/AdminMembers";
import { DonationWorkReports } from "../features/admin/DonationWorkReports";
import { AdminEvents } from "../features/admin/AdminEvents";
import { AdminVolunteers } from "../features/admin/AdminVolunteers";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";
import { AdminRoute } from "../features/auth/components/AdminRoute";

// Scroll to top wrapper component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return <Outlet />;
};

// Lazy load heavy components
const GalleryLazy = Gallery;
const StoriesLazy = Stories;
const EventsLazy = Events;
const DonateLazy = Donate;
const VolunteerLazy = Volunteer;
const DirectoryLazy = Directory;
const ReconnectionAssistantLazy = ReconnectionAssistant;
const MembershipLazy = Membership;
const ProfileLazy = Profile;

export const router = createHashRouter([
  {
    element: <ScrollToTop />,
    children: [
      // Landing Page (separate layout)
      {
        path: "/",
        element: <LandingPage />,
      },

      // Public pages with standard layout
      {
        element: <PublicLayout />,
        children: [
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/gallery",
            element: <GalleryLazy />,
          },
          {
            path: "/stories",
            element: <StoriesLazy />,
          },
          {
            path: "/events",
            element: <EventsLazy />,
          },
          {
            path: "/donate",
            element: <DonateLazy />,
          },
          {
            path: "/volunteer",
            element: <VolunteerLazy />,
          },
        ],
      },

      {
        path: "/login",
        element: <LoginPage />,
      },

      // Protected member routes
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: "directory",
            element: <DirectoryLazy />,
          },
          {
            path: "events",
            element: <EventsLazy />,
          },
          {
            path: "gallery",
            element: <GalleryLazy />,
          },
          {
            path: "stories",
            element: <StoriesLazy />,
          },
          {
            path: "ai-assistant",
            element: <ReconnectionAssistantLazy />,
          },
          {
            path: "membership",
            element: <MembershipLazy />,
          },
          {
            path: "donate",
            element: <DonateLazy />,
          },
          {
            path: "volunteer",
            element: <VolunteerLazy />,
          },
          {
            path: "profile",
            element: <ProfileLazy />,
          },
        ],
      },

      // Admin routes
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <DashboardLayout isAdmin />
          </AdminRoute>
        ),
        children: [
          {
            index: true,
            element: <Admin />,
          },
          {
            path: "members",
            element: <AdminMembers />,
          },
          {
            path: "donations",
            element: <DonationWorkReports />,
          },
          {
            path: "events",
            element: <AdminEvents />,
          },
          {
            path: "volunteers",
            element: <AdminVolunteers />,
          },
          {
            path: "directory",
            element: <DirectoryLazy />,
          },
          {
            path: "gallery",
            element: <GalleryLazy />,
          },
          {
            path: "donate",
            element: <DonateLazy />,
          },
          {
            path: "community-events",
            element: <EventsLazy />,
          },
        ],
      },

      // Catch-all redirect to home
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
