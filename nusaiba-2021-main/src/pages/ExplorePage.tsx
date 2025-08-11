import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { 
  Search, 
  Hash, 
  TrendingUp, 
  Users, 
  Crown, 
  Play,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Filter,
  Clock,
  Globe,
  MapPin
} from 'lucide-react';

interface TrendingHashtag {
  id: string;
  name: string;
  posts: number;
  trend: 'up' | 'down' | 'stable';
}

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  isVerified: boolean;
  category: string;
}

interface HeroCarouselItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  creator: string;
  views: number;
  likes: number;
  duration: string;
  isNew?: boolean;
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('for-you');

  const categories = [
    { id: 'for-you', label: 'For You', icon: '⭐' },
    { id: 'trending', label: 'Trending', icon: '🔥' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'love-story', label: 'Love Story', icon: '💕' },
    { id: 'tech', label: 'Tech', icon: '💻' },
    { id: 'comedy', label: 'Comedy', icon: '😂' },
    { id: 'dance', label: 'Dance', icon: '💃' },
    { id: 'food', label: 'Food', icon: '🍕' },
  ];

  const heroCarouselItems: HeroCarouselItem[] = [
    {
      id: '1',
      title: 'Amazing Dance Performance',
      description: 'Watch this incredible dance routine that went viral!',
      thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=500&fit=crop',
      creator: 'Sarah Martinez',
      views: 2500000,
      likes: 450000,
      duration: '2:34',
      isNew: true,
    },
    {
      id: '2',
      title: 'Funny Cat Compilation',
      description: 'The most hilarious cat moments you\'ll see today!',
      thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=500&fit=crop',
      creator: 'David Chen',
      views: 1800000,
      likes: 320000,
      duration: '1:45',
    },
    {
      id: '3',
      title: 'Digital Art Time-lapse',
      description: 'From sketch to masterpiece in minutes',
      thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop',
      creator: 'Maya Patel',
      views: 1200000,
      likes: 180000,
      duration: '3:12',
    },
  ];

  const trendingHashtags: TrendingHashtag[] = [
    { id: '1', name: 'nusaiba', posts: 125000, trend: 'up' },
    { id: '2', name: 'viral', posts: 89000, trend: 'up' },
    { id: '3', name: 'comedy', posts: 76000, trend: 'stable' },
    { id: '4', name: 'music', posts: 65000, trend: 'down' },
    { id: '5', name: 'dance', posts: 54000, trend: 'up' },
    { id: '6', name: 'art', posts: 43000, trend: 'stable' },
  ];

  const topCreators: Creator[] = [
    {
      id: '1',
      name: 'Sarah Martinez',
      username: '@sarah_creates',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c6a8?w=64&h=64&fit=crop&crop=face',
      followers: 2500000,
      isVerified: true,
      category: 'Comedy',
    },
    {
      id: '2',
      name: 'David Chen',
      username: '@davidmusic',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      followers: 1800000,
      isVerified: true,
      category: 'Music',
    },
    {
      id: '3',
      name: 'Maya Patel',
      username: '@maya_art',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      followers: 1200000,
      isVerified: true,
      category: 'Art',
    },
    {
      id: '4',
      name: 'Alex Johnson',
      username: '@alexdance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      followers: 950000,
      isVerified: false,
      category: 'Dance',
    },
  ];

  const trendingVideos = [
    {
      id: '1',
      title: 'Amazing Dance Performance',
      thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=300&h=400&fit=crop',
      creator: 'Sarah Martinez',
      views: 2500000,
      likes: 450000,
    },
    {
      id: '2',
      title: 'Funny Cat Compilation',
      thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop',
      creator: 'David Chen',
      views: 1800000,
      likes: 320000,
    },
    {
      id: '3',
      title: 'Digital Art Time-lapse',
      thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=400&fit=crop',
      creator: 'Maya Patel',
      views: 1200000,
      likes: 180000,
    },
    {
      id: '4',
      title: 'Street Photography Tips',
      thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=400&fit=crop',
      creator: 'Alex Johnson',
      views: 950000,
      likes: 125000,
    },
  ];

  const formatCount = (count: number) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-3 w-3 text-red-500 transform rotate-180" />;
      default:
        return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:pl-64">
          <div className="pt-16">
            <div className="w-full max-w-6xl mx-auto p-6">
              {/* Search Header */}
              <div className="mb-8">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search users, hashtags, or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 py-4 text-lg rounded-full border-2 focus:border-purple-500"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Category Chips */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      className={`whitespace-nowrap ${selectedCategory === category.id ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Hero Carousel */}
              <div className="mb-8">
                <div className="relative h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative h-full flex items-center justify-center">
                    <div className="text-center text-white z-10">
                      <h2 className="text-4xl font-bold mb-4">Discover Amazing Content</h2>
                      <p className="text-xl mb-6">Explore trending videos, creators, and hashtags</p>
                      <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                        Start Exploring
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="mb-8 flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Duration: All</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Region: Global</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Upload: Recent</span>
                </div>
              </div>

              <Tabs defaultValue="trending" className="w-full">
                <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
                  <TabsTrigger value="trending">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trending
                  </TabsTrigger>
                  <TabsTrigger value="hashtags">
                    <Hash className="h-4 w-4 mr-2" />
                    Hashtags
                  </TabsTrigger>
                  <TabsTrigger value="creators">
                    <Crown className="h-4 w-4 mr-2" />
                    Creators
                  </TabsTrigger>
                  <TabsTrigger value="videos">
                    <Play className="h-4 w-4 mr-2" />
                    Videos
                  </TabsTrigger>
                </TabsList>

                {/* Trending Tab */}
                <TabsContent value="trending" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-1">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                          <Hash className="h-5 w-5 mr-2 text-purple-600" />
                          Top Hashtags
                        </h3>
                        <div className="space-y-3">
                          {trendingHashtags.slice(0, 6).map((hashtag, index) => (
                            <div key={hashtag.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                              <div className="flex items-center space-x-3">
                                <span className="text-sm font-bold text-gray-400 w-6">#{index + 1}</span>
                                <div>
                                  <p className="font-semibold text-purple-600">#{hashtag.name}</p>
                                  <p className="text-sm text-gray-500">{formatCount(hashtag.posts)} posts</p>
                                </div>
                              </div>
                              {getTrendIcon(hashtag.trend)}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-2 gap-4">
                        {trendingVideos.map((video) => (
                          <Card key={video.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                            <CardContent className="p-0">
                              <div className="relative aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden">
                                <img 
                                  src={video.thumbnail} 
                                  alt={video.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="absolute bottom-2 left-2 right-2">
                                  <div className="flex items-center justify-between text-white">
                                    <div className="flex items-center space-x-2 text-xs">
                                      <Heart className="h-3 w-3" />
                                      <span>{formatCount(video.likes)}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-xs">
                                      <span>{formatCount(video.views)} views</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="p-3">
                                <h4 className="font-semibold text-sm mb-1 line-clamp-2">{video.title}</h4>
                                <p className="text-xs text-gray-500">@{video.creator}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Hashtags Tab */}
                <TabsContent value="hashtags" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trendingHashtags.map((hashtag, index) => (
                      <Card key={hashtag.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-gray-300">#{index + 1}</span>
                              {getTrendIcon(hashtag.trend)}
                            </div>
                            <Button variant="outline" size="sm">Follow</Button>
                          </div>
                          <h3 className="text-xl font-bold text-purple-600 mb-2">#{hashtag.name}</h3>
                          <p className="text-gray-600">{formatCount(hashtag.posts)} posts</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Creators Tab */}
                <TabsContent value="creators" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {topCreators.map((creator, index) => (
                      <Card key={creator.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="relative">
                                <Avatar className="w-16 h-16">
                                  <AvatarImage src={creator.avatar} alt={creator.name} />
                                  <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {index < 3 && (
                                  <div className="absolute -top-1 -right-1">
                                    <Crown className="h-5 w-5 text-yellow-500" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-bold text-lg">{creator.name}</h3>
                                  {creator.isVerified && (
                                    <Badge className="bg-blue-500 text-white text-xs">✓</Badge>
                                  )}
                                </div>
                                <p className="text-gray-600">{creator.username}</p>
                                <div className="flex items-center space-x-4 mt-1">
                                  <span className="text-sm text-gray-500">{formatCount(creator.followers)} followers</span>
                                  <Badge variant="secondary" className="text-xs">{creator.category}</Badge>
                                </div>
                              </div>
                            </div>
                            <Button className="bg-purple-600 hover:bg-purple-700">Follow</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Videos Tab */}
                <TabsContent value="videos" className="mt-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {trendingVideos.map((video) => (
                      <Card key={video.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                          <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="absolute bottom-2 left-2 right-2">
                              <h4 className="text-white text-sm font-semibold line-clamp-2 mb-1">{video.title}</h4>
                              <div className="flex items-center justify-between text-white/80 text-xs">
                                <span>@{video.creator}</span>
                                <div className="flex items-center space-x-1">
                                  <Heart className="h-3 w-3" />
                                  <span>{formatCount(video.likes)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}