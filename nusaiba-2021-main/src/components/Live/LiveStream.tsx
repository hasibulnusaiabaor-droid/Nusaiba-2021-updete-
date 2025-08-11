import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Radio, 
  Users, 
  Heart, 
  Gift, 
  MessageCircle, 
  Share2, 
  Settings, 
  Mic, 
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Sparkles
} from 'lucide-react';

export default function LiveStream() {
  const [isLive, setIsLive] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [likes, setLikes] = useState(0);
  const [message, setMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const mockMessages = [
    { id: 1, user: 'Creator1', message: 'Amazing stream! 🔥', timestamp: '2m ago' },
    { id: 2, user: 'Fan123', message: 'Love your content!', timestamp: '1m ago' },
    { id: 3, user: 'StreamWatcher', message: 'Can you do a dance? 💃', timestamp: '30s ago' },
  ];

  const mockGifts = [
    { name: 'Heart', icon: '❤️', cost: 1 },
    { name: 'Rose', icon: '🌹', cost: 5 },
    { name: 'Crown', icon: '👑', cost: 10 },
    { name: 'Diamond', icon: '💎', cost: 50 },
  ];

  const startStream = () => {
    setIsLive(true);
    setViewers(Math.floor(Math.random() * 1000) + 50);
  };

  const endStream = () => {
    setIsLive(false);
    setViewers(0);
  };

  const sendMessage = () => {
    if (message.trim()) {
      // In real app, this would send message to live chat
      setMessage('');
    }
  };

  if (!isLive) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* Stream Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Radio className="h-5 w-5 mr-2 text-red-500" />
              Go Live
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Preview Area */}
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-white text-center">
                <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Camera Preview</h3>
                <p className="text-gray-300">Your live stream will appear here</p>
              </div>
              
              {/* Controls Overlay */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <Button
                  size="sm"
                  variant={isMuted ? "destructive" : "secondary"}
                  className="rounded-full"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant={isVideoOff ? "destructive" : "secondary"}
                  className="rounded-full"
                  onClick={() => setIsVideoOff(!isVideoOff)}
                >
                  {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="secondary" className="rounded-full">
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="rounded-full">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stream Settings */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="streamTitle">Stream Title</Label>
                <Input
                  id="streamTitle"
                  placeholder="What are you streaming today?"
                  defaultValue="Live with Nusaiba! 🎉"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="streamCategory">Category</Label>
                <select className="w-full p-2 border border-gray-200 rounded-md">
                  <option>Just Chatting</option>
                  <option>Music</option>
                  <option>Gaming</option>
                  <option>Art</option>
                  <option>Cooking</option>
                  <option>Education</option>
                  <option>Sports</option>
                </select>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center mb-2">
                  <Sparkles className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-purple-800">AI Live Features</h3>
                </div>
                <div className="space-y-1 text-sm text-purple-700">
                  <p>• Real-time content moderation</p>
                  <p>• Automatic highlight clips</p>
                  <p>• Smart chat filtering</p>
                  <p>• Live translation for global audience</p>
                </div>
              </div>
            </div>

            <Button 
              onClick={startStream}
              className="w-full bg-red-500 hover:bg-red-600 text-white"
              size="lg"
            >
              <Radio className="h-5 w-5 mr-2" />
              Start Live Stream
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Stream View */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-0">
              {/* Live Video */}
              <div className="aspect-video bg-gray-900 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
                
                {/* Live Indicator */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <Badge className="bg-red-500 text-white px-3 py-1">
                    <Radio className="h-3 w-3 mr-1 animate-pulse" />
                    LIVE
                  </Badge>
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    <Users className="h-3 w-3 mr-1" />
                    {viewers.toLocaleString()}
                  </Badge>
                </div>

                {/* Stream Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="text-white">
                    <h2 className="text-xl font-bold">Live with Nusaiba! 🎉</h2>
                    <p className="text-gray-300">Just Chatting • Started 15 minutes ago</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="secondary" className="bg-black/50 text-white hover:bg-black/70">
                      <Heart className="h-4 w-4 mr-1" />
                      {likes}
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-black/50 text-white hover:bg-black/70">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stream Controls */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      size="sm"
                      variant={isMuted ? "destructive" : "outline"}
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant={isVideoOff ? "destructive" : "outline"}
                      onClick={() => setIsVideoOff(!isVideoOff)}
                    >
                      {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={endStream}
                    variant="destructive"
                    size="sm"
                  >
                    End Stream
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Chat & Gifts */}
        <div className="space-y-4">
          {/* Live Chat */}
          <Card className="h-96">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-full">
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-3">
                  {mockMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face`} />
                        <AvatarFallback className="text-xs">{msg.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-purple-600">{msg.user}</span>
                          <span className="text-xs text-gray-500">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-800">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Chat Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Say something..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={sendMessage}>
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Virtual Gifts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <Gift className="h-4 w-4 mr-2" />
                Send Gifts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {mockGifts.map((gift, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto"
                    onClick={() => setLikes(prev => prev + gift.cost)}
                  >
                    <span className="text-2xl mb-1">{gift.icon}</span>
                    <span className="text-xs font-semibold">{gift.name}</span>
                    <span className="text-xs text-gray-500">{gift.cost} coins</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}