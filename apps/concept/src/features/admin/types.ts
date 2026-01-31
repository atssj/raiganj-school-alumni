export interface DonationWorkReport {
  id: string;
  title: string;
  description: string;
  date: string;
  amountSpent: number;
  category: 'Infrastructure' | 'Education' | 'Medical' | 'Community' | 'Other';
  images: string[];
  beneficiaries: number;
  location: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  createdAt: string;
  updatedAt: string;
}

export interface DonationStats {
  totalDonations: number;
  totalSpent: number;
  totalProjects: number;
  beneficiariesHelped: number;
  pendingProjects: number;
  completedProjects: number;
}

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  batch: number;
  role: 'admin' | 'moderator' | 'member';
  status: 'active' | 'inactive' | 'pending';
  joinedAt: string;
  lastLogin: string;
  donationAmount: number;
}

export interface VolunteerRequest {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  batch: number;
  roleId: 'mentor' | 'speaker' | 'organizer' | 'content';
  roleTitle: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
}
