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
