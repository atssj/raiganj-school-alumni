import { AlumniProfile, EventItem, StoryItem, GalleryPhoto, ArchiveDocument } from '../shared/types';

export const MOCK_ALUMNI: AlumniProfile[] = [
  { id: '1', name: 'Dr. Arindam Bose', batch: 1998, location: 'Kolkata, WB', profession: 'Cardiologist', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop' },
  { id: '2', name: 'Sneha Roy', batch: 2005, location: 'Bangalore, KA', profession: 'Product Designer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
  { id: '3', name: 'Rahul Chatterjee', batch: 2010, location: 'London, UK', profession: 'Fintech Consultant', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: '4', name: 'Priya Mondal', batch: 2015, location: 'Raiganj, WB', profession: 'School Teacher', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  { id: '5', name: 'Amitav Ghosh', batch: 1990, location: 'Delhi, NCR', profession: 'Civil Servant', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  { id: '6', name: 'Debjani Sen', batch: 2018, location: 'Pune, MH', profession: 'Software Engineer', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' },
  { id: '7', name: 'Vikram Singh', batch: 2002, location: 'Mumbai, MH', profession: 'Investment Banker', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
  { id: '8', name: 'Anjali Das', batch: 2012, location: 'Hyderabad, TS', profession: 'Data Scientist', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' },
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Grand Bijoya Sammilani',
    date: 'Oct 12',
    location: 'Raiganj High School Auditorium',
    description: 'Celebrate the festive spirit post-Durga Puja with your old friends. Traditional lunch, cultural program performed by alumni, and endless adda.',
    image: 'https://picsum.photos/800/400?event=1',
    goingCount: 142,
  },
];

export const MOCK_STORIES: StoryItem[] = [
  {
    id: '1',
    title: 'The Tiffin Break at Banyan Tree',
    author: 'Sudipto Ghosh',
    batch: 2005,
    date: '2 days ago',
    content: 'I still remember the afternoons spent under the massive banyan tree near the chemistry lab. We used to trade our homemade luchis for canteen singaras. The laughter, the arguments over cricket matches, and the fear of getting caught by the Headmaster - those were the golden days.',
    likes: 24,
    hasLiked: false,
  },
  {
    id: '2',
    title: 'Cycling to School in the Rain',
    author: 'Priya Dutta',
    batch: 2012,
    date: '1 week ago',
    content: 'Monsoons in Raiganj were chaotic but beautiful. My cycle chain would slip every time I crossed the bridge, but my friends would always wait. We would arrive soaked, only to be sent to the drying room by our class teacher. The smell of wet earth still reminds me of those mornings.',
    likes: 45,
    hasLiked: true,
  },
];

export const MOCK_GALLERY: GalleryPhoto[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&fit=crop', caption: 'Morning Assembly, Main Ground', category: 'Campus', year: 1998 },
  { id: '2', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&fit=crop', caption: 'Batch of 2010 Farewell', category: 'Reunion', year: 2010 },
  { id: '3', url: 'https://images.unsplash.com/photo-1526725702345-bdda2b97ef73?w=800&fit=crop', caption: 'Inter-School Football Final', category: 'Sports', year: 2005 },
  { id: '4', url: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&fit=crop', caption: 'Old Chemistry Lab', category: 'Old Days', year: 1992 },
  { id: '5', url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&fit=crop', caption: 'Saraswati Puja Celebration', category: 'Campus', year: 2015 },
  { id: '6', url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&fit=crop', caption: 'Winter Reunion Dinner', category: 'Reunion', year: 2022 },
];

export const MOCK_ARCHIVE: ArchiveDocument[] = [
  { id: '1', title: 'The Raiganj Chronicle', type: 'Yearbook', year: 1995, coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&fit=crop', size: '12 MB' },
  { id: '2', title: 'Annual Sports Report', type: 'Document', year: 2002, coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&fit=crop', size: '2.5 MB' },
  { id: '3', title: 'Golden Jubilee Magazine', type: 'Magazine', year: 2002, coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&fit=crop', size: '45 MB' },
  { id: '4', title: 'Class X Batch List', type: 'Document', year: 1988, coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&fit=crop', size: '1 MB' },
];
