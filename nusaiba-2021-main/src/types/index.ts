export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  coverPhoto?: string;
  bio?: string;
  website?: string;
  location?: string;
  gender: 'male' | 'female' | 'other';
  isVerified: boolean;
  isPrivate: boolean;
  followers: number;
  following: number;
  totalViews: number;
  totalUploads: number;
  pinnedContentId?: string;
  privacySettings: {
    profileVisibility: 'public' | 'friends' | 'private';
    bioVisibility: 'public' | 'friends' | 'private';
    locationVisibility: 'public' | 'friends' | 'private';
    websiteVisibility: 'public' | 'friends' | 'private';
  };
  socialLinks: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    linkedin?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Video {
  id: string;
  userId: string;
  user: User;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  isShort: boolean;
  hashtags: string[];
  isLive?: boolean;
  privacy: 'public' | 'private' | 'unlisted';
  allowComments: boolean;
  allowDuets: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  videoId: string;
  content: string;
  likes: number;
  replies: Comment[];
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface VideoUpload {
  file: File;
  title: string;
  description: string;
  hashtags: string[];
  isShort: boolean;
  scheduled?: Date;
}

export interface LiveStream {
  id: string;
  userId: string;
  user: User;
  title: string;
  description: string;
  streamUrl: string;
  viewers: number;
  isActive: boolean;
  startedAt: Date;
}

export interface ProfileStats {
  followers: number;
  following: number;
  totalViews: number;
  totalUploads: number;
  watchTime: number; // in minutes
  topVideoViews: number;
  monthlyGrowth: number;
}

export interface PinnedContent {
  id: string;
  type: 'video' | 'post' | 'live';
  title: string;
  thumbnailUrl?: string;
  url?: string;
  isActive?: boolean;
}