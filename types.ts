
export type UserRole = 'CLIENT' | 'FREELANCER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type GigStatus = 'OPEN' | 'ASSIGNED' | 'COMPLETED';

export interface Gig {
  id: string;
  title: string;
  description: string;
  budget: number;
  clientId: string;
  clientName: string;
  status: GigStatus;
  createdAt: string;
  hiredFreelancerId?: string;
}

export type BidStatus = 'PENDING' | 'HIRED' | 'REJECTED';

export interface Bid {
  id: string;
  gigId: string;
  freelancerId: string;
  freelancerName: string;
  amount: number;
  message: string;
  status: BidStatus;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
