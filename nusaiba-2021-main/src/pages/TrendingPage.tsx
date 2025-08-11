import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import { 
  TrendingUp, 
  Hash, 
  Play, 
  Heart, 
  MessageCircle, 
  Share2,
  Crown,
  Flame,
  Clock,
  MapPin,
  Globe,
  Filter,
  TrendingDown,
  Star
} from 'lucide-react';

interface TrendingVideo {
  id: string;
  title: string;
  thumbnail: string;
  creator: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    followers: number;
    isVerified: boolean;
  };
  views: number;
  likes: number;
  comments: number;
  shares: number;
  hashtags: string[];
  trendingScore: number;
  rank: number;
  watchTime: number;
  velocity: number;
  recency: number;
  trendingReason: string;
}

export default function TrendingPage() {
  const [timePeriod, setTimePeriod] = useState('today');
  const [contentType, setContentType] = useState('all');
  const [location, setLocation] = useState('global');

  const timePeriods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
  ];

  const contentTypes = [
    { id: 'all', label: 'All', icon: '🎬' },
    { id: 'video', label: 'Video', icon: '📹' },
    { id: 'shorts', label: 'Shorts', icon: '📱' },
    { id: 'live', label: 'Live', icon: '🔴' },
    { id: 'audio', label: 'Audio', icon: '🎵' },
  ];

  const locations = [
    { id: 'global', label: 'Global', icon: '🌍' },
    { id: 'country', label: 'Country', icon: '🏳️' },
    { id: 'city', label: 'City', icon: '🏙️' },
  ];

  const trendingVideos: TrendingVideo[] = [
    {
      id: '1',
      title: 'Epic Dance Battle Goes Viral!',
      thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=600&fit=crop',
      creator: {
        id: '1',
        name: 'DanceMaster',
        username: '@dancemaster',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
        followers: 3200000,
        isVerified: true,
      },
      views: 5200000,
      likes: 980000,
      comments: 45000,
      shares: 125000,
      hashtags: ['dance', 'viral', 'battle'],
      trendingScore: 98,
      rank: 1,
      watchTime: 85,
      velocity: 95,
      recency: 90,
      trendingReason: 'Spike in shares + Featured in #DanceChallenge',
    },
    {
      id: '2',
      title: 'Mind-Blowing Magic Trick Explained',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      creator: {
        id: '2',
        name: 'MagicPro',
        username: '@magicpro',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
        followers: 1800000,
        isVerified: true,
      },
      views: 3800000,
      likes: 720000,
      comments: 32000,
      shares: 89000,
      hashtags: ['magic', 'tutorial', 'mindblown'],
      trendingScore: 95,
      rank: 2,
      watchTime: 78,
      velocity: 88,
      recency: 85,
      trendingReason: 'High engagement rate + Trending hashtag',
    },
    {
      id: '3',
      title: 'Cooking Hack That Changes Everything',
      thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop',
      creator: {
        id: '3',
        name: 'ChefLife',
        username: '@cheflife',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c6a8?w=64&h=64&fit=crop&crop=face',
        followers: 2100000,
        isVerified: false,
      },
      views: 2900000,
      likes: 520000,
      comments: 28000,
      shares: 65000,
      hashtags: ['cooking', 'lifehack', 'food'],
      trendingScore: 89,
      rank: 3,
      watchTime: 72,
      velocity: 82,
      recency: 80,
      trendingReason: 'Viral on other platforms + High save rate',
    },
    {
      id: '4',
      title: 'Pet Reaction to New Toy is Hilarious',
      thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=600&fit=crop',
      creator: {
        id: '4',
        name: 'PetLover',
        username: '@petlover',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
        followers: 950000,
        isVerified: false,
      },
      views: 2100000,
      likes: 410000,
      comments: 18000,
      shares: 42000,
      hashtags: ['pets', 'funny', 'reaction'],
      trendingScore: 86,
      rank: 4,
      watchTime: 68,
      velocity: 75,
      recency: 75,
      trendingReason: 'High shareability + Trending pet content',
    },
  ];

  const formatCount = (count: number) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500 text-white">🥇 #1</Badge>;
    if (rank === 2) return <Badge className="bg-gray-400 text-white">🥈 #2</Badge>;
    if (rank === 3) return <Badge className="bg-amber-600 text-white">🥉 #3</Badge>;
    return <Badge variant="secondary">#{rank}</Badge>;
  };

  const getTrendingIcon = (score: number) => {
    if (score >= 95) return <Flame className="h-4 w-4 text-red-500" />;
    if (score >= 85) return <TrendingUp className="h-4 w-4 text-green-500" />;
    return <Star className="h-4 w-4 text-yellow-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:pl-64">
          <div className="pt-16">
            <div className="w-full max-w-6xl mx-auto p-6">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold flex items-center">
                  <Flame className="h-8 w-8 mr-3 text-red-500" />
                  Trending Now
                </h1>
                <p className="text-gray-600 mt-2">The hottest content on Nusaiba right now</p>
              </div>

              {/* Time Period Tabs */}
              <div className="mb-6">
                <Tabs value={timePeriod} onValueChange={setTimePeriod} className="w-full">
                  <TabsList className="grid w-full max-w-md grid-cols-3">
                    {timePeriods.map((period) => (
                      <TabsTrigger key={period.id} value={period.id}>
                        {period.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* Content Type & Location Filters */}
              <div className="mb-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Content:</span>
                  <div className="flex space-x-2">
                    {contentTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant={contentType === type.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setContentType(type.id)}
                        className="text-xs"
                      >
                        <span className="mr-1">{type.icon}</span>
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Location:</span>
                  <div className="flex space-x-2">
                    {locations.map((loc) => (
                      <Button
                        key={loc.id}
                        variant={location === loc.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setLocation(loc.id)}
                        className="text-xs"
                      >
                        <span className="mr-1">{loc.icon}</span>
                        {loc.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>

              {/* Trending Videos Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            
                            {/* Rank Badge */}
                            <div className="absolute top-2 left-2">
                              {getRankBadge(video.rank)}
                            </div>

                            {/* Trending Score */}
                            <div className="absolute top-2 right-2">
                              <div className="flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded text-xs">
                                {getTrendingIcon(video.trendingScore)}
                                <span>{video.trendingScore}</span>
                              </div>
                            </div>

                            {/* Video Info */}
                            <div className="absolute bottom-2 left-2 right-2">
                              <h4 className="text-white text-sm font-semibold line-clamp-2 mb-1">{video.title}</h4>
                              <div className="flex items-center justify-between text-white/80 text-xs">
                                <span>@{video.creator.username}</span>
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
                </div>

                {/* Sidebar - Creator Highlights & Trending Info */}
                <div className="space-y-6">
                  {/* Creator Highlight Panel */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center">
                        <Crown className="h-5 w-5 mr-2 text-yellow-500" />
                        Creator Spotlight
                      </h3>
                      <div className="space-y-4">
                        {trendingVideos.slice(0, 3).map((video) => (
                          <div key={video.creator.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={video.creator.avatar} alt={video.creator.name} />
                              <AvatarFallback>{video.creator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold text-sm">{video.creator.name}</h4>
                                {video.creator.isVerified && (
                                  <Badge className="bg-blue-500 text-white text-xs">✓</Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-500">{video.creator.username}</p>
                              <p className="text-xs text-gray-600">{formatCount(video.creator.followers)} followers</p>
                            </div>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              Follow
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trending Metrics */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                        Trending Metrics
                      </h3>
                      <div className="space-y-3">
                        {trendingVideos.slice(0, 3).map((video) => (
                          <div key={video.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">#{video.rank} {video.title.substring(0, 20)}...</span>
                              <span className="text-xs text-gray-500">{video.trendingScore} pts</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                              <div>
                                <span className="block">Watch Time</span>
                                <span className="font-medium">{video.watchTime}%</span>
                              </div>
                              <div>
                                <span className="block">Velocity</span>
                                <span className="font-medium">{video.velocity}%</span>
                              </div>
                              <div>
                                <span className="block">Recency</span>
                                <span className="font-medium">{video.recency}%</span>
                              </div>
                            </div>
                            <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                              <strong>Why trending:</strong> {video.trendingReason}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Promote CTA */}
                  <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-lg font-bold mb-2">Want to trend?</h3>
                      <p className="text-sm mb-4 opacity-90">Boost your content and reach more viewers</p>
                      <Button variant="secondary" className="w-full">
                        Promote Content
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}