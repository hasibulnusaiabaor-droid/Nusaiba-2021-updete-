import { create } from 'zustand';
import { Video } from '@/types';

interface VideoStore {
  videos: Video[];
  currentVideo: Video | null;
  isLoading: boolean;
  error: string | null;
  fetchVideos: () => Promise<void>;
  likeVideo: (videoId: string) => void;
  shareVideo: (videoId: string) => void;
  uploadVideo: (videoData: { title: string; description: string; file: File }) => Promise<void>;
}

// Mock video data
const mockVideos: Video[] = [
  {
    id: '1',
    userId: '1',
    user: {
      id: '1',
      username: 'creator1',
      name: 'Amazing Creator',
      email: 'creator1@example.com',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b332c6a8?w=50&h=50&fit=crop&crop=face',
      gender: 'female',
      isVerified: true,
      isPrivate: false,
      followers: 10500,
      following: 234,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    title: 'Amazing Dance Performance',
    description: 'Check out this incredible dance routine! 💃✨',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop',
    duration: 120,
    views: 15420,
    likes: 1240,
    comments: 89,
    shares: 156,
    isShort: true,
    hashtags: ['dance', 'performance', 'viral'],
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: '2',
    user: {
      id: '2',
      username: 'techguru',
      name: 'Tech Guru',
      email: 'tech@example.com',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      gender: 'male',
      isVerified: true,
      isPrivate: false,
      followers: 45600,
      following: 567,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    title: 'AI Revolution in 2024',
    description: 'Exploring the latest AI trends and how they will change our world',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    duration: 480,
    views: 89320,
    likes: 3450,
    comments: 234,
    shares: 890,
    isShort: false,
    hashtags: ['ai', 'technology', 'future'],
    createdAt: new Date(Date.now() - 7200000),
    updatedAt: new Date(),
  },
  {
    id: '3',
    userId: '3',
    user: {
      id: '3',
      username: 'travelvlogger',
      name: 'Travel Vlogger',
      email: 'travel@example.com',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      gender: 'male',
      isVerified: false,
      isPrivate: false,
      followers: 12300,
      following: 456,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    title: 'Beautiful Sunset in Bali',
    description: 'Capturing the magical moments of sunset in paradise 🌅',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    duration: 180,
    views: 23400,
    likes: 890,
    comments: 67,
    shares: 123,
    isShort: true,
    hashtags: ['travel', 'bali', 'sunset', 'paradise'],
    createdAt: new Date(Date.now() - 10800000),
    updatedAt: new Date(),
  },
  {
    id: '4',
    userId: '4',
    user: {
      id: '4',
      username: 'cookingmaster',
      name: 'Cooking Master',
      email: 'cooking@example.com',
      profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      gender: 'female',
      isVerified: true,
      isPrivate: false,
      followers: 67800,
      following: 123,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    title: 'Easy Pasta Recipe in 10 Minutes',
    description: 'Learn to make delicious pasta in just 10 minutes! 🍝',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop',
    duration: 600,
    views: 45600,
    likes: 2100,
    comments: 189,
    shares: 456,
    isShort: false,
    hashtags: ['cooking', 'pasta', 'recipe', 'quick'],
    createdAt: new Date(Date.now() - 14400000),
    updatedAt: new Date(),
  },
];

export const useVideos = create<VideoStore>((set, get) => ({
  videos: [],
  currentVideo: null,
  isLoading: false,
  error: null,

  fetchVideos: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ videos: mockVideos, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch videos', isLoading: false });
    }
  },

  likeVideo: (videoId: string) => {
    set(state => ({
      videos: state.videos.map(video => 
        video.id === videoId 
          ? { ...video, likes: video.likes + 1 }
          : video
      )
    }));
  },

  shareVideo: (videoId: string) => {
    set(state => ({
      videos: state.videos.map(video => 
        video.id === videoId 
          ? { ...video, shares: video.shares + 1 }
          : video
      )
    }));
  },

  uploadVideo: async (videoData: { title: string; description: string; file: File }) => {
    set({ isLoading: true, error: null });
    try {
      // Mock upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      // In real app, this would upload to cloud storage and create video record
      set({ isLoading: false });
    } catch (error) {
      set({ error: 'Upload failed', isLoading: false });
    }
  },
}));