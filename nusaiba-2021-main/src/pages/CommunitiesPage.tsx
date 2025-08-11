import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Plus, 
  Search, 
  Settings, 
  Shield, 
  Pin, 
  Calendar,
  Star,
  Crown,
  MessageCircle,
  Heart,
  Share2,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Users2,
  Hash,
  BookOpen,
  Flag,
  Ban,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Lock,
  Globe
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Community interface
interface Community {
  id: string;
  name: string;
  description: string;
  avatar: string;
  coverImage: string;
  memberCount: number;
  postCount: number;
  category: string;
  privacy: 'public' | 'private' | 'restricted';
  isJoined: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  rules: string[];
  tags: string[];
  createdAt: string;
  lastActive: string;
  pinnedPosts: string[];
  upcomingEvents: Event[];
}

// Event interface
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  attendees: number;
  maxAttendees?: number;
  isRSVP: boolean;
}

// Post interface
interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  authorRole: 'member' | 'moderator' | 'admin';
  content: string;
  media?: string;
  likes: number;
  comments: number;
  timestamp: string;
  isPinned: boolean;
  isApproved: boolean;
  tags: string[];
}

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([
    {
      id: '1',
      name: 'Digital Artists Collective',
      description: 'A community for digital artists to share work, get feedback, and collaborate on projects.',
      avatar: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=64&h=64&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=200&fit=crop',
      memberCount: 1247,
      postCount: 89,
      category: 'Art & Design',
      privacy: 'public',
      isJoined: true,
      isAdmin: false,
      isModerator: false,
      rules: ['Be respectful', 'No spam', 'Share original work'],
      tags: ['digital-art', 'design', 'collaboration'],
      createdAt: '2024-01-15',
      lastActive: '2 hours ago',
      pinnedPosts: ['post1', 'post2'],
      upcomingEvents: [
        {
          id: '1',
          title: 'Digital Art Workshop',
          description: 'Learn advanced techniques in digital painting',
          date: '2024-02-15',
          time: '2:00 PM',
          attendees: 45,
          maxAttendees: 50,
          isRSVP: true,
        }
      ],
    },
    {
      id: '2',
      name: 'Tech Innovators',
      description: 'Discussing the latest in technology, startups, and innovation.',
      avatar: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=64&h=64&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop',
      memberCount: 2891,
      postCount: 156,
      category: 'Technology',
      privacy: 'public',
      isJoined: false,
      isAdmin: false,
      isModerator: false,
      rules: ['Stay on topic', 'No self-promotion', 'Respect others'],
      tags: ['technology', 'startups', 'innovation'],
      createdAt: '2023-11-20',
      lastActive: '1 hour ago',
      pinnedPosts: ['post3'],
      upcomingEvents: [],
    },
    {
      id: '3',
      name: 'Fitness Enthusiasts',
      description: 'Share workout routines, nutrition tips, and fitness motivation.',
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
      memberCount: 567,
      postCount: 234,
      category: 'Health & Fitness',
      privacy: 'public',
      isJoined: true,
      isAdmin: true,
      isModerator: true,
      rules: ['Be supportive', 'No medical advice', 'Share progress'],
      tags: ['fitness', 'health', 'motivation'],
      createdAt: '2024-01-01',
      lastActive: '30 minutes ago',
      pinnedPosts: ['post4', 'post5', 'post6'],
      upcomingEvents: [
        {
          id: '2',
          title: 'Group Workout Session',
          description: 'Virtual group workout with certified trainer',
          date: '2024-02-10',
          time: '7:00 AM',
          attendees: 23,
          maxAttendees: 30,
          isRSVP: false,
        }
      ],
    },
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Sarah Martinez',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c6a8?w=40&h=40&fit=crop&crop=face',
      authorRole: 'member',
      content: 'Just finished this digital painting! What do you think? 🎨',
      media: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=200&fit=crop',
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago',
      isPinned: true,
      isApproved: true,
      tags: ['digital-art', 'painting'],
    },
    {
      id: '2',
      author: 'David Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      authorRole: 'moderator',
      content: 'Community reminder: Please tag your posts appropriately and follow our guidelines.',
      likes: 12,
      comments: 3,
      timestamp: '1 day ago',
      isPinned: true,
      isApproved: true,
      tags: ['announcement', 'guidelines'],
    },
    {
      id: '3',
      author: 'Maya Patel',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      authorRole: 'member',
      content: 'Looking for feedback on my latest design project. Any suggestions?',
      media: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
      likes: 18,
      comments: 12,
      timestamp: '3 hours ago',
      isPinned: false,
      isApproved: true,
      tags: ['design', 'feedback'],
    },
  ]);

  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const categories = ['all', 'Art & Design', 'Technology', 'Health & Fitness', 'Music', 'Gaming', 'Education', 'Business', 'Lifestyle'];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const joinCommunity = (communityId: string) => {
    setCommunities(prev => prev.map(community => 
      community.id === communityId 
        ? { ...community, isJoined: true }
        : community
    ));
  };

  const leaveCommunity = (communityId: string) => {
    setCommunities(prev => prev.map(community => 
      community.id === communityId 
        ? { ...community, isJoined: false }
        : community
    ));
  };

  const toggleRSVP = (eventId: string) => {
    // Toggle RSVP for event
    console.log(`Toggling RSVP for event ${eventId}`);
  };

  const formatCount = (count: number) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case 'public':
        return <Globe className="h-4 w-4 text-green-500" />;
      case 'private':
        return <Lock className="h-4 w-4 text-yellow-500" />;
      case 'restricted':
        return <Shield className="h-4 w-4 text-red-500" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800"><Crown className="h-3 w-3 mr-1" />Admin</Badge>;
      case 'moderator':
        return <Badge className="bg-blue-100 text-blue-800"><Shield className="h-3 w-3 mr-1" />Mod</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Users className="h-8 w-8 mr-3 text-purple-600" />
              Communities
            </h1>
            <p className="text-gray-600 mt-2">Connect with people who share your interests</p>
          </div>
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Community
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create a New Community</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Community Name</label>
                  <Input placeholder="Enter community name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea placeholder="Describe your community" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Privacy</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select privacy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="restricted">Restricted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <Input placeholder="Enter tags separated by commas" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Create Community
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="my-communities">My Communities</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tab Content */}
      <TabsContent value="discover" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => (
            <Card key={community.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-32 bg-gradient-to-br from-purple-400 to-pink-400">
                <img 
                  src={community.coverImage} 
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  {getPrivacyIcon(community.privacy)}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={community.avatar} alt={community.name} />
                    <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{community.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{community.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                      <span>{formatCount(community.memberCount)} members</span>
                      <span>{formatCount(community.postCount)} posts</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {community.category}
                      </Badge>
                      <Button
                        size="sm"
                        variant={community.isJoined ? "outline" : "default"}
                        onClick={() => community.isJoined ? leaveCommunity(community.id) : joinCommunity(community.id)}
                      >
                        {community.isJoined ? 'Leave' : 'Join'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="my-communities" className="space-y-6">
        <div className="text-center py-8">
          <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Your communities will appear here</p>
        </div>
      </TabsContent>

      <TabsContent value="events" className="space-y-6">
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Upcoming events will appear here</p>
        </div>
      </TabsContent>

      <TabsContent value="moderation" className="space-y-6">
        <div className="text-center py-8">
          <Shield className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Moderation tools will appear here</p>
        </div>
      </TabsContent>
    </div>
  );
}