import { Home, Compass, Users, Bookmark, TrendingUp, Radio, Settings, HelpCircle, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Explore', href: '/explore', icon: Compass },
  { name: 'Trending', href: '/trending', icon: TrendingUp },
  { name: 'Following', href: '/following', icon: Users },
  { name: 'Live', href: '/live', icon: Radio },
  { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  { name: 'Runner', href: '/runner', icon: PlayCircle },
];

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export default function Sidebar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) return null;

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16">
      <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
        <ScrollArea className="flex-1 px-4 py-4">
          {/* Main Navigation */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start h-12"
                  onClick={() => navigate(item.href)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Button>
              );
            })}
          </nav>

          <Separator className="my-6" />

          {/* Suggested Creators */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">Suggested for you</h3>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Creator {i}
                  </p>
                  <p className="text-xs text-gray-500">1.2M followers</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  Follow
                </Button>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Trending Hashtags */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">Trending Hashtags</h3>
            {['#viral', '#dance', '#ai', '#tech', '#funny'].map((tag) => (
              <Button key={tag} variant="ghost" className="w-full justify-start h-8 text-sm text-gray-600">
                {tag}
              </Button>
            ))}
          </div>
        </ScrollArea>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-200">
          <nav className="space-y-1">
            {bottomNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start h-10"
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.name}
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}