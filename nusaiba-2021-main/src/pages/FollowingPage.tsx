import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Play, 
  Heart, 
  MessageCircle, 
  Share2,
  Bell,
  BellOff,
  Radio,
  Video,
  Image,
  Clock,
  MoreHorizontal,
  CheckCircle2,
  Eye,
  EyeOff,
  MessageSquare,
  Filter,
  Bookmark,
  Download
} from 'lucide-react';
import VideoCard from '@/components/Video/VideoCard';
import { useVideos } from '@/hooks/useVideos';

// Content type enum
type ContentType = 'all' | 'videos' | 'shorts' | 'images' | 'live';

// Story interface
interface Story {
  id: string;
  creator: string;
  avatar: string;
  isViewed: boolean;
  isLive?: boolean;
}

// Enhanced post interface
interface Post {
  id: string;
  creator: string;
  creatorId: string;
  avatar: string;
  content: string;
  type: 'video' | 'short' | 'image' | 'live';
  thumbnail: string;
  videoUrl?: string;
  views: number;
  likes: number;
  comments: number;
  timestamp: string;
  isNew: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
}

export default function FollowingPage() {
  const { videos } = useVideos();
  const [activeTab, setActiveTab] = useState<ContentType>('all');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [showBatchActions, setShowBatchActions] = useState(false);
  const [quickReplyOpen, setQuickReplyOpen] = useState<string | null>(null);
  const [groupedPosts, setGroupedPosts] = useState<Record<string, Post[]>>({});

  // Stories data
  const [stories] = useState<Story[]>([
    {
      id: '1',
      creator: 'Sarah Martinez',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c6a8?w=64&h=64&fit=crop&crop=face',
      isViewed: false,
    },
    {
      id: '2',
      creator: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      isViewed: true,
      isLive: true,
    },
    {
      id: '3',
      creator: 'Maya Patel',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      isViewed: false,
    },
    {
      id: '4',
      creator: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      isViewed: true,
    },
  ]);

  // Enhanced posts data
  const [posts] = useState<Post[]>([
    {
      id: '1',
      creator: 'Sarah Martinez',
      creatorId: 'sarah_1',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c6a8?w=40&h=40&fit=crop&crop=face',
      content: 'New dance routine! 💃✨',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=300&h=200&fit=crop',
      videoUrl: 'https://example.com/video1.mp4',
      views: 1250,
      likes: 89,
      comments: 12,
      timestamp: '2 hours ago',
      isNew: true,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: '2',
      creator: 'Sarah Martinez',
      creatorId: 'sarah_1',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c6a8?w=40&h=40&fit=crop&crop=face',
      content: 'Behind the scenes 🎬',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
      views: 567,
      likes: 34,
      comments: 5,
      timestamp: '4 hours ago',
      isNew: false,
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: '3',
      creator: 'David Chen',
      creatorId: 'david_1',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      content: 'New beat drop 🎵',
      type: 'short',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
      videoUrl: 'https://example.com/video2.mp4',
      views: 890,
      likes: 67,
      comments: 8,
      timestamp: '6 hours ago',
      isNew: true,
      isLiked: false,
      isBookmarked: true,
    },
    {
      id: '4',
      creator: 'Maya Patel',
      creatorId: 'maya_1',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      content: 'Art process 🎨',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=300&h=200&fit=crop',
      views: 432,
      likes: 23,
      comments: 3,
      timestamp: '1 day ago',
      isNew: false,
      isLiked: false,
      isBookmarked: false,
    },
  ]);

  const [liveStreams, setLiveStreams] = useState([
    {
      id: '1',
      creator: 'Sarah Martinez',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c6a8?w=64&h=64&fit=crop&crop=face',
      title: 'Live Dance Session',
      viewers: 1250,
      thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=300&h=200&fit=crop',
      isFollowing: true,
    },
    {
      id: '2',
      creator: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      title: 'Music Production Live',
      viewers: 890,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop',
      isFollowing: true,
    },
  ]);

  const [followingUsers] = useState([
    {
      id: '1',
      name: 'Sarah Martinez',
      username: '@sarah_creates',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c6a8?w=40&h=40&fit=crop&crop=face',
      isLive: true,
      notifications: true,
    },
    {
      id: '2',
      name: 'David Chen',
      username: '@davidmusic',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      isLive: true,
      notifications: true,
    },
    {
      id: '3',
      name: 'Maya Patel',
      username: '@maya_art',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      isLive: false,
      notifications: false,
    },
  ]);

  // Group posts by creator
  useEffect(() => {
    const grouped = posts.reduce((acc, post) => {
      if (!acc[post.creatorId]) {
        acc[post.creatorId] = [];
      }
      acc[post.creatorId].push(post);
      return acc;
    }, {} as Record<string, Post[]>);
    setGroupedPosts(grouped);
  }, [posts]);

  // Filter posts based on active tab
  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    if (activeTab === 'videos') return post.type === 'video';
    if (activeTab === 'shorts') return post.type === 'short';
    if (activeTab === 'images') return post.type === 'image';
    if (activeTab === 'live') return post.type === 'live';
    return true;
  });

  // Filter videos from followed users only
  const followingVideos = videos.filter(video => 
    followingUsers.some(user => user.name === video.user.name)
  );

  const formatCount = (count: number) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  const toggleNotifications = (userId: string) => {
    console.log(`Toggling notifications for user ${userId}`);
  };

  const togglePostSelection = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const markAllAsRead = () => {
    console.log('Marking all posts as read');
    setSelectedPosts([]);
    setShowBatchActions(false);
  };

  const muteNotifications = () => {
    console.log('Muting notifications for selected posts');
    setSelectedPosts([]);
    setShowBatchActions(false);
  };

  const openQuickReply = (postId: string) => {
    setQuickReplyOpen(quickReplyOpen === postId ? null : postId);
  };

  const toggleLike = (postId: string) => {
    console.log(`Toggling like for post ${postId}`);
  };

  const toggleBookmark = (postId: string) => {
    console.log(`Toggling bookmark for post ${postId}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Users className="h-8 w-8 mr-3 text-purple-600" />
          Following
        </h1>
        <p className="text-gray-600 mt-2">Content from people you follow</p>
      </div>

      {/* Stories Bar */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center space-y-2 cursor-pointer group">
              <div className={`relative w-16 h-16 rounded-full p-1 ${
                story.isViewed 
                  ? 'bg-gray-200' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}>
                <Avatar className="w-full h-full">
                  <AvatarImage src={story.avatar} alt={story.creator} />
                  <AvatarFallback>{story.creator.charAt(0)}</AvatarFallback>
                </Avatar>
                {story.isLive && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                )}
              </div>
              <span className="text-xs text-gray-600 text-center max-w-16 truncate">
                {story.creator}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Type Tabs */}
      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ContentType)}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">All</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center space-x-2">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger value="shorts" className="flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">Shorts</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center space-x-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Images</span>
            </TabsTrigger>
            <TabsTrigger value="live" className="flex items-center space-x-2">
              <Radio className="h-4 w-4" />
              <span className="hidden sm:inline">Live</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Batch Actions */}
      {showBatchActions && selectedPosts.length > 0 && (
        <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-700">
              {selectedPosts.length} post{selectedPosts.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark Read
              </Button>
              <Button variant="outline" size="sm" onClick={muteNotifications}>
                <BellOff className="h-4 w-4 mr-2" />
                Mute Notifications
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowBatchActions(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Live Streams Section */}
      {activeTab === 'all' || activeTab === 'live' ? (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <Radio className="h-5 w-5 mr-2 text-red-500" />
              Live Now
            </h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {liveStreams.map((stream) => (
              <Card key={stream.id} className="flex-shrink-0 w-80 cursor-pointer hover:shadow-lg transition-shadow group">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                    <img 
                      src={stream.thumbnail} 
                      alt={stream.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    {/* Live Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-500 text-white text-xs animate-pulse">
                        <Radio className="h-3 w-3 mr-1" />
                        LIVE
                      </Badge>
                    </div>
                    
                    {/* Viewer Count */}
                    <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
                      {formatCount(stream.viewers)} watching
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={stream.avatar} alt={stream.creator} />
                        <AvatarFallback>{stream.creator.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{stream.title}</h3>
                        <p className="text-xs text-gray-500">@{stream.creator}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : null}

      {/* Content Feed with Aggregation */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Latest from Following</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowBatchActions(!showBatchActions)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Batch Actions
          </Button>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedPosts).map(([creatorId, creatorPosts]) => {
              const filteredCreatorPosts = creatorPosts.filter(post => {
                if (activeTab === 'all') return true;
                if (activeTab === 'videos') return post.type === 'video';
                if (activeTab === 'shorts') return post.type === 'short';
                if (activeTab === 'images') return post.type === 'image';
                if (activeTab === 'live') return post.type === 'live';
                return true;
              });

              if (filteredCreatorPosts.length === 0) return null;

              return (
                <Card key={creatorId} className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Creator Header */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={filteredCreatorPosts[0].avatar} alt={filteredCreatorPosts[0].creator} />
                            <AvatarFallback>{filteredCreatorPosts[0].creator.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{filteredCreatorPosts[0].creator}</h3>
                            <p className="text-sm text-gray-500">{filteredCreatorPosts[0].timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Posts Grid */}
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredCreatorPosts.map((post) => (
                          <div key={post.id} className="relative group">
                            {/* New Badge */}
                            {post.isNew && (
                              <Badge className="absolute top-2 left-2 z-10 bg-green-500 text-white text-xs">
                                NEW
                              </Badge>
                            )}

                            {/* Selection Checkbox */}
                            {showBatchActions && (
                              <div className="absolute top-2 right-2 z-10">
                                <input
                                  type="checkbox"
                                  checked={selectedPosts.includes(post.id)}
                                  onChange={() => togglePostSelection(post.id)}
                                  className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                                />
                              </div>
                            )}

                            {/* Content */}
                            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
                              {post.type === 'video' || post.type === 'short' ? (
                                <div className="relative">
                                  <img 
                                    src={post.thumbnail} 
                                    alt={post.content}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <Play className="h-8 w-8 text-white" />
                                  </div>
                                </div>
                              ) : (
                                <img 
                                  src={post.thumbnail} 
                                  alt={post.content}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>

                            {/* Content Info */}
                            <div className="mt-3">
                              <p className="text-sm text-gray-700 line-clamp-2">{post.content}</p>
                              
                              {/* Stats */}
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span className="flex items-center">
                                    <Eye className="h-3 w-3 mr-1" />
                                    {formatCount(post.views)}
                                  </span>
                                  <span className="flex items-center">
                                    <Heart className={`h-3 w-3 mr-1 ${post.isLiked ? 'text-red-500 fill-current' : ''}`} />
                                    {formatCount(post.likes)}
                                  </span>
                                  <span className="flex items-center">
                                    <MessageCircle className="h-3 w-3 mr-1" />
                                    {formatCount(post.comments)}
                                  </span>
                                </div>
                                
                                {/* Quick Actions */}
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleLike(post.id)}
                                    className={`h-8 w-8 p-0 ${post.isLiked ? 'text-red-500' : ''}`}
                                  >
                                    <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => openQuickReply(post.id)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <MessageSquare className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleBookmark(post.id)}
                                    className={`h-8 w-8 p-0 ${post.isBookmarked ? 'text-purple-500' : ''}`}
                                  >
                                    <Bookmark className={`h-4 w-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                                  </Button>
                                </div>
                              </div>

                              {/* Quick Reply Input */}
                              {quickReplyOpen === post.id && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                  <div className="flex space-x-2">
                                    <input
                                      type="text"
                                      placeholder="Quick reply..."
                                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                      Send
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No content yet</h3>
            <p className="text-gray-500 mb-4">
              Follow some creators to see their latest content here
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Discover Creators
            </Button>
          </Card>
        )}
      </div>

      {/* Following Management */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Manage Following</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {followingUsers.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {user.isLive && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                    <p className="text-xs text-gray-500">{user.username}</p>
                    {user.isLive && (
                      <Badge className="bg-red-100 text-red-800 text-xs mt-1">Live</Badge>
                    )}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleNotifications(user.id)}
                    className={user.notifications ? 'text-purple-600' : 'text-gray-400'}
                  >
                    {user.notifications ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}