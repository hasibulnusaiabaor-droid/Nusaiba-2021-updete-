import { create } from 'zustand';
import { database } from '@/lib/database';
import { useAuth } from './useAuth';

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

interface MessagingStore {
  chats: Chat[];
  currentChat: Chat | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  fetchChats: () => Promise<void>;
  createChat: (participantIds: string[]) => Promise<Chat>;
  sendMessage: (chatId: string, content: string, type?: 'text' | 'image' | 'video' | 'voice') => Promise<void>;
  fetchMessages: (chatId: string) => Promise<void>;
  markMessagesAsRead: (chatId: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  blockUser: (userId: string) => Promise<void>;
}

export const useMessaging = create<MessagingStore>((set, get) => ({
  chats: [],
  currentChat: null,
  messages: [],
  isLoading: false,
  error: null,

  fetchChats: async () => {
    set({ isLoading: true, error: null });
    try {
      const { user } = useAuth.getState();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const chats = await database.getUserChats(user.id);
      set({ chats, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch chats', isLoading: false });
    }
  },

  createChat: async (participantIds: string[]) => {
    try {
      const { user } = useAuth.getState();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const allParticipants = [user.id, ...participantIds];
      const newChat = await database.createChat(allParticipants);
      
      set(state => ({
        chats: [newChat, ...state.chats]
      }));

      return newChat;
    } catch (error) {
      set({ error: 'Failed to create chat' });
      throw error;
    }
  },

  sendMessage: async (chatId: string, content: string, type: 'text' | 'image' | 'video' | 'voice' = 'text') => {
    try {
      const { user } = useAuth.getState();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const newMessage = await database.createMessage({
        chatId,
        senderId: user.id,
        content,
        type,
      });

      // Add message to current messages if we're in the right chat
      if (get().currentChat?.id === chatId) {
        set(state => ({
          messages: [...state.messages, newMessage]
        }));
      }

      // Update chat's last message
      set(state => ({
        chats: state.chats.map(chat => 
          chat.id === chatId 
            ? { ...chat, lastMessage: newMessage, updatedAt: new Date() }
            : chat
        )
      }));
    } catch (error) {
      set({ error: 'Failed to send message' });
    }
  },

  fetchMessages: async (chatId: string) => {
    set({ isLoading: true, error: null });
    try {
      const messages = await database.getChatMessages(chatId);
      const chat = get().chats.find(c => c.id === chatId);
      
      set({ 
        messages, 
        currentChat: chat || null,
        isLoading: false 
      });

      // Mark messages as read
      await get().markMessagesAsRead(chatId);
    } catch (error) {
      set({ error: 'Failed to fetch messages', isLoading: false });
    }
  },

  markMessagesAsRead: async (chatId: string) => {
    try {
      const { user } = useAuth.getState();
      if (!user) return;

      await database.markMessagesAsRead(chatId, user.id);
      
      // Update local messages
      set(state => ({
        messages: state.messages.map(msg => 
          msg.chatId === chatId && msg.senderId !== user.id
            ? { ...msg, isRead: true }
            : msg
        )
      }));
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  },

  deleteMessage: async (messageId: string) => {
    try {
      // Remove message from local state
      set(state => ({
        messages: state.messages.filter(msg => msg.id !== messageId)
      }));
      
      // In a real app, you would also delete from the database
      console.log('Message deleted:', messageId);
    } catch (error) {
      set({ error: 'Failed to delete message' });
    }
  },

  blockUser: async (userId: string) => {
    try {
      // In a real app, you would add the user to a blocked list
      console.log('User blocked:', userId);
      
      // Remove chats with blocked user
      set(state => ({
        chats: state.chats.filter(chat => 
          !chat.participants.includes(userId)
        )
      }));
    } catch (error) {
      set({ error: 'Failed to block user' });
    }
  },
}));
