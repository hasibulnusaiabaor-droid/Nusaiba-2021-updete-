import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Radio, 
  Play, 
  Heart, 
  MessageCircle, 
  Share2,
  Gift,
  Users,
  Camera,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Settings
} from 'lucide-react';

export default function LivePage() {
  const [isLive, setIsLive] = useState(false);
  const [comment, setComment] = useState('');

  const liveStreams = [
    {
      id: '1',
      creator: 'Sarah Martinez',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c6a8?w=64&h=64&fit=crop&crop=face',
      title: 'Dance Practice Session 💃',
      viewers: 2450,
      thumbnail: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=300&fit=crop',
      category: 'Dance',
      duration: '1h 23m',
      likes: 1250,
    },
    {
      id: '2',
      creator: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      title: 'Music Production Live 🎵',
      viewers: 1890,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      category: 'Music',
      duration: '2h 5m',
      likes: 890,
    },
    {
      id: '3',
      creator: 'Maya Patel',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      title: 'Digital Art Tutorial 🎨',
      viewers: 1200,
      thumbnail: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
      category: 'Art',
      duration: '45m',
      likes: 650,
    },
    {
      id: '4',
      creator: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      title: 'Gaming Stream - New Release! 🎮',
      viewers: 3200,
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      category: 'Gaming',
      duration: '3h 12m',
      likes: 1580,
    },
    {
      id: '5',
      creator: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?w=64&h=64&fit=crop&crop=face',
      title: 'Cooking Show Live 🍳',
      viewers: 980,
      thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      category: 'Cooking',
      duration: '1h 15m',
      likes: 420,
    },
    {
      id: '6',
      creator: 'James Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face',
      title: 'Fitness Training Session 💪',
      viewers: 1450,
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      category: 'Fitness',
      duration: '1h 30m',
      likes: 780,
    },
  ];

  const categories = [
    { name: 'All', count: liveStreams.length, active: true },
    { name: 'Gaming', count: 1, active: false },
    { name: 'Music', count: 1, active: false },
    { name: 'Dance', count: 1, active: false },
    { name: 'Art', count: 1, active: false },
    { name: 'Cooking', count: 1, active: false },
    { name: 'Fitness', count: 1, active: false },
  ];

  const formatCount = (count: number) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  const startLive = () => {
    setIsLive(true);
    // Start live streaming logic here
  };

  const stopLive = () => {
    setIsLive(false);
    // Stop live streaming logic here
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Radio className="h-8 w-8 mr-3 text-red-500" />
              Live Streams
            </h1>
            <p className="text-gray-600 mt-2">Watch and broadcast live content</p>
          </div>
          
          <div className="flex space-x-3">
            {!isLive ? (
              <Button 
                onClick={startLive}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3"
              >
                <Camera className="h-4 w-4 mr-2" />
                Go Live
              </Button>
            ) : (
              <Button 
                onClick={stopLive}
                variant="destructive"
                className="px-6 py-3"
              >
                Stop Live
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Live Setup Panel (when going live) */}
      {isLive && (
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-red-600">You're Live!</span>
                <Badge className="bg-red-500 text-white">0 viewers</Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-black aspect-video rounded-lg mb-4 flex items-center justify-center">
              <div className="text-white text-center">
                <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="opacity-75">Your live stream preview</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Input placeholder="Add a title for your live stream..." className="flex-1" />
              <Button variant="outline">Save</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Filters */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={category.active ? "default" : "outline"}
              size="sm"
              className={`flex-shrink-0 ${category.active ? 'bg-red-500 hover:bg-red-600' : ''}`}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Live Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveStreams.map((stream) => (
          <Card key={stream.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                <img 
                  src={stream.thumbnail} 
                  alt={stream.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Live Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-500 text-white text-xs animate-pulse">
                    <Radio className="h-3 w-3 mr-1" />
                    LIVE
                  </Badge>
                </div>
                
                {/* Duration */}
                <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
                  {stream.duration}
                </div>
                
                {/* Viewer Count */}
                <div className="absolute bottom-3 left-3 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {formatCount(stream.viewers)}
                </div>
                
                {/* Category */}
                <div className="absolute bottom-3 right-3">
                  <Badge variant="secondary" className="text-xs">
                    {stream.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src={stream.avatar} alt={stream.creator} />
                    <AvatarFallback>{stream.creator.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-1">{stream.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">@{stream.creator}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{formatCount(stream.likes)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{formatCount(stream.viewers)}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="text-xs">
                        Join
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Chat Simulation (for demo) */}
      {isLive && (
        <Card className="mt-8 max-w-md mx-auto">
          <CardContent className="p-4">
            <h3 className="font-bold mb-4 flex items-center">
              <MessageCircle className="h-4 w-4 mr-2" />
              Live Chat
            </h3>
            
            <div className="h-40 bg-gray-50 rounded p-3 mb-3 overflow-y-auto">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-purple-600">viewer123:</span>
                  <span>Great stream! 👏</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-blue-600">musicfan:</span>
                  <span>Love this song!</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-green-600">artlover:</span>
                  <span>Amazing talent ✨</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Input 
                placeholder="Say something..." 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" className="bg-red-500 hover:bg-red-600">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">
                <Gift className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}