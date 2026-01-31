import { AlumniProfile, EventItem, StoryItem, GalleryPhoto, ArchiveDocument, DonationStats, DonationWorkReport } from '../shared/types';

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
  { id: '1', url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&fit=crop', caption: 'Saraswati Puja Celebration', category: 'Saraswati Puja', year: 2015 },
  { id: '2', url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&fit=crop', caption: 'Evening Science Exhibition', category: 'Exhibitions', year: 2018 },
  { id: '3', url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&fit=crop', caption: 'Career Guidance Seminar', category: 'Career Guidance', year: 2023 },
  { id: '4', url: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&fit=crop', caption: 'Saraswati Puja Anjali', category: 'Saraswati Puja', year: 2019 },
  { id: '5', url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&fit=crop', caption: 'Art & Craft Exhibition', category: 'Exhibitions', year: 2012 },
  { id: '6', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&fit=crop', caption: 'Alumni Career Mentorship', category: 'Career Guidance', year: 2024 },
];

export const MOCK_ARCHIVE: ArchiveDocument[] = [
  { id: '1', title: 'The Raiganj Chronicle', type: 'Yearbook', year: 1995, coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&fit=crop', size: '12 MB' },
  { id: '2', title: 'Annual Sports Report', type: 'Document', year: 2002, coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&fit=crop', size: '2.5 MB' },
  { id: '3', title: 'Golden Jubilee Magazine', type: 'Magazine', year: 2002, coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&fit=crop', size: '45 MB' },
  { id: '4', title: 'Class X Batch List', type: 'Document', year: 1988, coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&fit=crop', size: '1 MB' },
];

export const MOCK_FUND_STATS: DonationStats = {
  totalDonations: 1250000,
  totalSpent: 875000,
  totalProjects: 12,
  beneficiariesHelped: 450,
  pendingProjects: 3,
  completedProjects: 9,
};

export const MOCK_FUND_PROJECTS: DonationWorkReport[] = [
  {
    id: '1',
    title: 'School Library Renovation',
    description: 'Complete renovation of the school library including new furniture, books, and computer systems.',
    date: '2025-12-15',
    amountSpent: 250000,
    category: 'Education',
    images: ['https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&fit=crop'],
    beneficiaries: 200,
    location: 'Raiganj High School',
    status: 'Completed',
    createdAt: '2025-11-01',
    updatedAt: '2025-12-20',
  },
  {
    id: '2',
    title: 'Scholarship Program',
    description: 'Annual scholarship program providing financial assistance to 50 deserving students.',
    date: '2025-11-30',
    amountSpent: 150000,
    category: 'Education',
    images: ['https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&fit=crop'],
    beneficiaries: 50,
    location: 'Raiganj',
    status: 'Completed',
    createdAt: '2025-10-15',
    updatedAt: '2025-11-30',
  },
  {
    id: '3',
    title: 'Clean Drinking Water',
    description: 'Installation of RO water purifiers at multiple locations in the school campus.',
    date: '2026-03-15',
    amountSpent: 50000,
    category: 'Infrastructure',
    images: ['https://images.unsplash.com/photo-1538300642153-7c5ef8e9c5c2?w=800&fit=crop'],
    beneficiaries: 500,
    location: 'Raiganj High School',
    status: 'Planned',
    createdAt: '2026-01-20',
    updatedAt: '2026-01-20',
  },
];
