import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Video, 
  Smile, 
  Paperclip, 
  Mic, 
  MicOff,
  Users,
  Plus,
  Search,
  MoreHorizontal,
  Heart,
  UserPlus,
  Clock
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'voice' | 'video' | 'image';
  isRead: boolean;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isGroup: boolean;
  members?: number;
}

interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  mediaUrl: string;
  timestamp: Date;
  isViewed: boolean;
}

export default function MessagingSystem() {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: '/images/avatar.jpg',
      isOnline: true,
      lastMessage: 'Hey! How are you doing?',
      lastMessageTime: new Date(Date.now() - 300000),
      unreadCount: 2,
      isGroup: false,
    },
    {
      id: '2',
      name: 'Creative Squad',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=40&h=40&fit=crop',
      isOnline: false,
      lastMessage: 'Alex shared a video',
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 5,
      isGroup: true,
      members: 8,
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      senderName: 'Sarah Johnson',
      senderAvatar: '/images/Profile.jpg',
      content: 'Hey! How are you doing?',
      timestamp: new Date(Date.now() - 300000),
      type: 'text',
      isRead: true,
    },
  ]);

  const [stories] = useState<Story[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Sarah',
      userAvatar: '/images/avatar.jpg',
      mediaUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=350&fit=crop',
      timestamp: new Date(Date.now() - 1800000),
      isViewed: false,
    },
  ]);

  const [friendRequests] = useState([
    {
      id: '1',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      mutualFriends: 12,
    },
  ]);

  const sendMessage = () => {
    if (message.trim() && activeChat) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'current',
        senderName: 'You',
        senderAvatar: user?.profilePicture || '',
        content: message,
        timestamp: new Date(),
        type: 'text',
        isRead: false,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return date.toLocaleDateString();
  };

  return (
    <div className="w-full max-w-7xl mx-auto h-[calc(100vh-100px)]">
      <Tabs defaultValue="chats" className="h-full flex flex-col">
        <div className="p-4 border-b">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="chats">
              <MessageCircle className="h-4 w-4 mr-1" />
              Chats
            </TabsTrigger>
            <TabsTrigger value="stories">
              <Clock className="h-4 w-4 mr-1" />
              Stories
            </TabsTrigger>
            <TabsTrigger value="groups">
              <Users className="h-4 w-4 mr-1" />
              Groups
            </TabsTrigger>
            <TabsTrigger value="requests">
              <UserPlus className="h-4 w-4 mr-1" />
              Requests
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 flex">
          {/* Chats Tab */}
          <TabsContent value="chats" className="flex-1 flex m-0">
            {/* Chat List */}
            <div className="w-80 border-r flex flex-col">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        activeChat === chat.id ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={chat.avatar} alt={chat.name} />
                            <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {chat.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                            <span className="text-xs text-gray-500">{formatTime(chat.lastMessageTime)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                            {chat.unreadCount > 0 && (
                              <Badge className="bg-purple-500 text-white text-xs min-w-[20px] h-5">
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={chats.find(c => c.id === activeChat)?.avatar} />
                          <AvatarFallback>{chats.find(c => c.id === activeChat)?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{chats.find(c => c.id === activeChat)?.name}</h3>
                          <p className="text-sm text-gray-500">Online</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.senderId === 'current' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                            msg.senderId === 'current' ? 'bg-purple-600 text-white' : 'bg-gray-100'
                          }`}>
                            <p className="text-sm">{msg.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={sendMessage} className="bg-purple-600">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Select a chat to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Other tabs content simplified for space */}
          <TabsContent value="stories" className="flex-1 m-0 p-6">
            <h2 className="text-xl font-semibold mb-4">Stories</h2>
            <div className="text-center py-8">
              <Clock className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Stories feature coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="groups" className="flex-1 m-0 p-6">
            <h2 className="text-xl font-semibold mb-4">Groups</h2>
            <div className="text-center py-8">
              <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Group chat feature coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="flex-1 m-0 p-6">
            <h2 className="text-xl font-semibold mb-4">Friend Requests</h2>
            <div className="space-y-4">
              {friendRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{request.name}</h3>
                          <p className="text-sm text-gray-500">{request.mutualFriends} mutual friends</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Decline</Button>
                        <Button className="bg-purple-600" size="sm">Accept</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}