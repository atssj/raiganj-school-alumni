
export enum ViewState {
  LANDING = 'LANDING',
  DASHBOARD_HOME = 'DASHBOARD_HOME',
  DIRECTORY = 'DIRECTORY',
  EVENTS = 'EVENTS',
  AI_ASSISTANT = 'AI_ASSISTANT',
  MEMBERSHIP = 'MEMBERSHIP',
  STORIES = 'STORIES',
  PROFILE = 'PROFILE',
  DONATE = 'DONATE',
  VOLUNTEER = 'VOLUNTEER',
  GALLERY = 'GALLERY',
  ABOUT = 'ABOUT',
}

export interface AlumniProfile {
  id: string;
  name: string;
  batch: number;
  location: string;
  profession: string;
  avatar: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  goingCount: number;
}

export interface StoryItem {
  id: string;
  title: string;
  author: string;
  batch: number;
  date: string;
  content: string;
  likes: number;
  hasLiked: boolean;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'Campus' | 'Reunion' | 'Sports' | 'Old Days';
  year: number;
}

export interface ArchiveDocument {
  id: string;
  title: string;
  type: 'Yearbook' | 'Magazine' | 'Document';
  year: number;
  coverImage: string;
  size: string;
}
