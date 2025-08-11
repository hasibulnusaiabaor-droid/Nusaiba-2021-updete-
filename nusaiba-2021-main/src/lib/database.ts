import { User, Video, Comment, LiveStream } from '@/types';

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'voice';
  timestamp: Date;
  isRead: boolean;
}

interface Chat {
  id: string;
  participants: string[];
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}

interface UserCredentials {
  userId: string;
  email: string;
  passwordHash: string;
  provider?: 'google' | 'facebook' | 'apple' | 'local';
}

const DB_KEYS = {
  USERS: 'nusaiba_users',
  VIDEOS: 'nusaiba_videos',
  COMMENTS: 'nusaiba_comments',
  LIVE_STREAMS: 'nusaiba_live_streams',
  MESSAGES: 'nusaiba_messages',
  CHATS: 'nusaiba_chats',
  CURRENT_USER: 'nusaiba_current_user',
  CREDENTIALS: 'nusaiba_credentials',
};

class DatabaseService {
  private getData<T>(key: string): T[] {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private setData<T>(key: string, data: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      hash = (hash << 5) - hash + password.charCodeAt(i);
      hash |= 0;
    }
    return String(hash);
  }

  // Current user helpers
  getCurrentUserId(): string | null {
    try {
      return localStorage.getItem(DB_KEYS.CURRENT_USER);
    } catch {
      return null;
    }
  }

  setCurrentUserId(userId: string): void {
    try {
      localStorage.setItem(DB_KEYS.CURRENT_USER, userId);
    } catch (error) {
      console.warn('Failed to set current user ID:', error);
    }
  }

  clearCurrentUserId(): void {
    try {
      localStorage.removeItem(DB_KEYS.CURRENT_USER);
    } catch (error) {
      console.warn('Failed to clear current user ID:', error);
    }
  }

  // User management
  async createUser(userData: Partial<User> & { password: string; provider?: UserCredentials['provider'] }): Promise<User> {
    const users = this.getData<User>(DB_KEYS.USERS);
    const credentials = this.getData<UserCredentials>(DB_KEYS.CREDENTIALS);
    
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Date.now().toString(),
      username: userData.username || '',
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone,
      profilePicture: userData.profilePicture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      coverPhoto: userData.coverPhoto,
      bio: userData.bio || '',
      website: userData.website,
      location: userData.location,
      gender: userData.gender || 'other',
      isVerified: false,
      isPrivate: false,
      followers: 0,
      following: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);
    this.setData(DB_KEYS.USERS, users);
    const passwordHash = await this.hashPassword(userData.password);
    const cred: UserCredentials = {
      userId: newUser.id,
      email: newUser.email,
      passwordHash,
      provider: userData.provider || 'local',
    };
    credentials.push(cred);
    this.setData(DB_KEYS.CREDENTIALS, credentials);
    
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const users = this.getData<User>(DB_KEYS.USERS);
    return users.find(u => u.email === email) || null;
  }

  async getUserById(id: string): Promise<User | null> {
    const users = this.getData<User>(DB_KEYS.USERS);
    return users.find(u => u.id === id) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const users = this.getData<User>(DB_KEYS.USERS);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date(),
    };

    this.setData(DB_KEYS.USERS, users);
    return users[userIndex];
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const users = this.getData<User>(DB_KEYS.USERS);
    const credentials = this.getData<UserCredentials>(DB_KEYS.CREDENTIALS);
    const user = users.find(u => u.email === email) || null;
    if (!user) return null;
    const cred = credentials.find(c => c.userId === user.id);
    if (!cred) return null;
    const passwordHash = await this.hashPassword(password);
    if (cred.passwordHash !== passwordHash) return null;
    return user;
  }

  async socialSignInOrRegister(profile: { email: string; name: string; username: string; profilePicture?: string; provider: NonNullable<UserCredentials['provider']> }): Promise<User> {
    const users = this.getData<User>(DB_KEYS.USERS);
    const credentials = this.getData<UserCredentials>(DB_KEYS.CREDENTIALS);
    const existingUser = users.find(u => u.email === profile.email);
    if (existingUser) {
      const hasCred = credentials.find(c => c.userId === existingUser.id);
      if (!hasCred) {
        credentials.push({ userId: existingUser.id, email: existingUser.email, passwordHash: '', provider: profile.provider });
        this.setData(DB_KEYS.CREDENTIALS, credentials);
      }
      return existingUser;
    }
    const newUser: User = {
      id: Date.now().toString(),
      username: profile.username,
      name: profile.name,
      email: profile.email,
      profilePicture: profile.profilePicture,
      gender: 'other',
      isVerified: false,
      isPrivate: false,
      followers: 0,
      following: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(newUser);
    this.setData(DB_KEYS.USERS, users);
    credentials.push({ userId: newUser.id, email: newUser.email, passwordHash: '', provider: profile.provider });
    this.setData(DB_KEYS.CREDENTIALS, credentials);
    return newUser;
  }

  // Video management
  async createVideo(videoData: {
    userId: string;
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
    duration: number;
    isShort: boolean;
    hashtags: string[];
  }): Promise<Video> {
    const videos = this.getData<Video>(DB_KEYS.VIDEOS);
    const user = await this.getUserById(videoData.userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    const newVideo: Video = {
      id: Date.now().toString(),
      userId: videoData.userId,
      user,
      title: videoData.title,
      description: videoData.description,
      url: videoData.url,
      thumbnailUrl: videoData.thumbnailUrl,
      duration: videoData.duration,
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      isShort: videoData.isShort,
      hashtags: videoData.hashtags,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    videos.push(newVideo);
    this.setData(DB_KEYS.VIDEOS, videos);
    
    return newVideo;
  }

  async getVideos(filters?: {
    userId?: string;
    isShort?: boolean;
    limit?: number;
  }): Promise<Video[]> {
    let videos = this.getData<Video>(DB_KEYS.VIDEOS);
    
    if (filters?.userId) {
      videos = videos.filter(v => v.userId === filters.userId);
    }
    
    if (filters?.isShort !== undefined) {
      videos = videos.filter(v => v.isShort === filters.isShort);
    }
    
    if (filters?.limit) {
      videos = videos.slice(0, filters.limit);
    }
    
    return videos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateVideo(id: string, updates: Partial<Video>): Promise<Video> {
    const videos = this.getData<Video>(DB_KEYS.VIDEOS);
    const videoIndex = videos.findIndex(v => v.id === id);
    
    if (videoIndex === -1) {
      throw new Error('Video not found');
    }

    videos[videoIndex] = {
      ...videos[videoIndex],
      ...updates,
      updatedAt: new Date(),
    };

    this.setData(DB_KEYS.VIDEOS, videos);
    return videos[videoIndex];
  }

  // Generic media storage (images/photos/gifs/stories)
  async saveMediaItems(items: Array<{ id?: string; type: 'image' | 'gif' | 'story'; url: string; userId: string; createdAt?: Date }>): Promise<void> {
    const key = 'nusaiba_media';
    const media = this.getData<{ id: string; type: 'image' | 'gif' | 'story'; url: string; userId: string; createdAt: Date }>(key);
    const toSave = items.map(item => ({
      id: item.id || Date.now().toString() + Math.random().toString().slice(2),
      ...item,
      createdAt: item.createdAt || new Date(),
    }));
    this.setData(key, [...media, ...toSave]);
  }

  // Message management
  async createMessage(messageData: {
    chatId: string;
    senderId: string;
    content: string;
    type: 'text' | 'image' | 'video' | 'voice';
  }): Promise<Message> {
    const messages = this.getData<Message>(DB_KEYS.MESSAGES);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      chatId: messageData.chatId,
      senderId: messageData.senderId,
      content: messageData.content,
      type: messageData.type,
      timestamp: new Date(),
      isRead: false,
    };

    messages.push(newMessage);
    this.setData(DB_KEYS.MESSAGES, messages);
    
    return newMessage;
  }

  async getChatMessages(chatId: string): Promise<Message[]> {
    const messages = this.getData<Message>(DB_KEYS.MESSAGES);
    return messages
      .filter(m => m.chatId === chatId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async markMessagesAsRead(chatId: string, userId: string): Promise<void> {
    const messages = this.getData<Message>(DB_KEYS.MESSAGES);
    let updated = false;
    const updatedMessages = messages.map(message => {
      if (message.chatId === chatId && message.senderId !== userId && !message.isRead) {
        updated = true;
        return { ...message, isRead: true };
      }
      return message;
    });
    if (updated) {
      this.setData(DB_KEYS.MESSAGES, updatedMessages);
    }
  }

  // Chat management
  async createChat(participants: string[]): Promise<Chat> {
    const chats = this.getData<Chat>(DB_KEYS.CHATS);
    
    const newChat: Chat = {
      id: Date.now().toString(),
      participants,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    chats.push(newChat);
    this.setData(DB_KEYS.CHATS, chats);
    
    return newChat;
  }

  async getUserChats(userId: string): Promise<Chat[]> {
    const chats = this.getData<Chat>(DB_KEYS.CHATS);
    return chats.filter(c => c.participants.includes(userId));
  }

  // Live stream management
  async createLiveStream(streamData: {
    userId: string;
    title: string;
    description: string;
    streamUrl: string;
  }): Promise<LiveStream> {
    const liveStreams = this.getData<LiveStream>(DB_KEYS.LIVE_STREAMS);
    const user = await this.getUserById(streamData.userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    const newStream: LiveStream = {
      id: Date.now().toString(),
      userId: streamData.userId,
      user,
      title: streamData.title,
      description: streamData.description,
      streamUrl: streamData.streamUrl,
      viewers: 0,
      isActive: true,
      startedAt: new Date(),
    };

    liveStreams.push(newStream);
    this.setData(DB_KEYS.LIVE_STREAMS, liveStreams);
    return newStream;
  }

  async getActiveLiveStreams(): Promise<LiveStream[]> {
    const liveStreams = this.getData<LiveStream>(DB_KEYS.LIVE_STREAMS);
    return liveStreams.filter(s => s.isActive);
  }

  // Search functionality
  async searchUsers(query: string): Promise<User[]> {
    const users = this.getData<User>(DB_KEYS.USERS);
    const lowercaseQuery = query.toLowerCase();
    
    return users.filter(user => 
      user.name.toLowerCase().includes(lowercaseQuery) ||
      user.username.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery)
    );
  }

  async searchVideos(query: string): Promise<Video[]> {
    const videos = this.getData<Video>(DB_KEYS.VIDEOS);
    const lowercaseQuery = query.toLowerCase();
    
    return videos.filter(video => 
      video.title.toLowerCase().includes(lowercaseQuery) ||
      video.description.toLowerCase().includes(lowercaseQuery) ||
      video.hashtags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
}

export const database = new DatabaseService();
export default database;


