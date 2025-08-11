import { Search, Bell, MessageCircle, User, Upload, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Nusaiba
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Redefining Connection</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search videos, users, hashtags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Upload */}
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" onClick={() => (window.location.href = '/explore')}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>

                {/* Notifications */}
                <div className="relative">
                  <Button variant="ghost" size="sm">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs">
                    3
                  </Badge>
                </div>

                {/* Messages */}
                <div className="relative">
                  <Button variant="ghost" size="sm" onClick={() => (window.location.href = '/messages')}>
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-500 text-xs">
                    2
                  </Badge>
                </div>

                {/* Profile */}
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profilePicture} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <User className="h-4 w-4 mr-1" />
                    Profile
                  </Button>
                </div>
              </>
            ) : null}

            {/* Mobile menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}