import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Moon, 
  Sun, 
  Shield, 
  Bell, 
  UserX, 
  Globe, 
  DollarSign,
  MessageCircle,
  Eye,
  Lock,
  Coins
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function SettingsPage() {
  const { user, updateUser } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    contentVisibility: 'everyone',
    messagePermissions: 'everyone',
    showOnlineStatus: true,
  });
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    messages: true,
    liveStreams: true,
    emailNotifications: false,
  });

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const privacyOptions = [
    { value: 'everyone', label: 'Everyone' },
    { value: 'friends', label: 'Friends Only' },
    { value: 'nobody', label: 'Nobody' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Settings className="h-8 w-8 mr-3" />
          Settings & Privacy
        </h1>
        <p className="text-gray-600 mt-2">Manage your account preferences and privacy settings</p>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="appearance">Theme</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="blocked">Blocked</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
          <TabsTrigger value="monetization">Creator</TabsTrigger>
        </TabsList>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {darkMode ? <Moon className="h-5 w-5 mr-2" /> : <Sun className="h-5 w-5 mr-2" />}
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode" className="text-base font-medium">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-gray-600">Switch between light and dark themes</p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={handleThemeToggle}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-base font-medium">Theme Customization</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center cursor-pointer hover:scale-105 transition-transform">
                    <div className="w-8 h-8 bg-white rounded-full mx-auto mb-2"></div>
                    <p className="text-sm">Nusaiba</p>
                  </div>
                  <div className="p-4 rounded-lg border bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center cursor-pointer hover:scale-105 transition-transform">
                    <div className="w-8 h-8 bg-white rounded-full mx-auto mb-2"></div>
                    <p className="text-sm">Ocean</p>
                  </div>
                  <div className="p-4 rounded-lg border bg-gradient-to-r from-green-500 to-teal-500 text-white text-center cursor-pointer hover:scale-105 transition-transform">
                    <div className="w-8 h-8 bg-white rounded-full mx-auto mb-2"></div>
                    <p className="text-sm">Nature</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Profile Visibility</Label>
                  <p className="text-sm text-gray-600 mb-3">Who can see your profile information</p>
                  <Select 
                    value={privacy.profileVisibility} 
                    onValueChange={(value) => setPrivacy({...privacy, profileVisibility: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {privacyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">Content Visibility</Label>
                  <p className="text-sm text-gray-600 mb-3">Who can see your posts and videos</p>
                  <Select 
                    value={privacy.contentVisibility} 
                    onValueChange={(value) => setPrivacy({...privacy, contentVisibility: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {privacyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">Message Permissions</Label>
                  <p className="text-sm text-gray-600 mb-3">Who can send you direct messages</p>
                  <Select 
                    value={privacy.messagePermissions} 
                    onValueChange={(value) => setPrivacy({...privacy, messagePermissions: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {privacyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Show Online Status</Label>
                    <p className="text-sm text-gray-600">Let others see when you're online</p>
                  </div>
                  <Switch
                    checked={privacy.showOnlineStatus}
                    onCheckedChange={(checked) => setPrivacy({...privacy, showOnlineStatus: checked})}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Lock className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-900">End-to-End Encryption</span>
                  </div>
                  <p className="text-sm text-blue-700">Your messages and videos are protected with military-grade encryption</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Likes</Label>
                    <p className="text-sm text-gray-600">When someone likes your content</p>
                  </div>
                  <Switch
                    checked={notifications.likes}
                    onCheckedChange={(checked) => setNotifications({...notifications, likes: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Comments</Label>
                    <p className="text-sm text-gray-600">When someone comments on your posts</p>
                  </div>
                  <Switch
                    checked={notifications.comments}
                    onCheckedChange={(checked) => setNotifications({...notifications, comments: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">New Followers</Label>
                    <p className="text-sm text-gray-600">When someone follows you</p>
                  </div>
                  <Switch
                    checked={notifications.follows}
                    onCheckedChange={(checked) => setNotifications({...notifications, follows: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Messages</Label>
                    <p className="text-sm text-gray-600">New direct messages</p>
                  </div>
                  <Switch
                    checked={notifications.messages}
                    onCheckedChange={(checked) => setNotifications({...notifications, messages: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Live Streams</Label>
                    <p className="text-sm text-gray-600">When someone you follow goes live</p>
                  </div>
                  <Switch
                    checked={notifications.liveStreams}
                    onCheckedChange={(checked) => setNotifications({...notifications, liveStreams: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blocked Users */}
        <TabsContent value="blocked">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserX className="h-5 w-5 mr-2" />
                Blocked Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <UserX className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No blocked users</h3>
                <p className="text-gray-500">Users you block will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language & Region */}
        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Language & Region
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Display Language</Label>
                <p className="text-sm text-gray-600 mb-3">Choose your preferred language</p>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="ur">اردو (Urdu)</SelectItem>
                    <SelectItem value="ar">العربية (Arabic)</SelectItem>
                    <SelectItem value="es">Español (Spanish)</SelectItem>
                    <SelectItem value="fr">Français (French)</SelectItem>
                    <SelectItem value="de">Deutsch (German)</SelectItem>
                    <SelectItem value="zh">中文 (Chinese)</SelectItem>
                    <SelectItem value="ja">日本語 (Japanese)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-medium">Region</Label>
                <p className="text-sm text-gray-600 mb-3">Your location for relevant content</p>
                <Select defaultValue="global">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global</SelectItem>
                    <SelectItem value="bd">Bangladesh</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="pk">Pakistan</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Globe className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium text-green-900">AI Translation</span>
                </div>
                <p className="text-sm text-green-700">Content is automatically translated to your preferred language</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Creator Economy */}
        <TabsContent value="monetization">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coins className="h-5 w-5 mr-2" />
                Creator Economy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <div className="flex items-center mb-3">
                  <DollarSign className="h-6 w-6 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-purple-900">Monetization Status</h3>
                </div>
                <p className="text-purple-700 mb-4">You're eligible for creator monetization!</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Total Earnings</p>
                    <p className="text-xl font-bold text-green-600">$245.50</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-xl font-bold text-blue-600">$89.20</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Revenue Streams</h4>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="font-medium">Donations</Label>
                    <p className="text-sm text-gray-600">Accept tips from viewers</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="font-medium">Membership Subscriptions</Label>
                    <p className="text-sm text-gray-600">Exclusive content for subscribers</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="font-medium">Marketplace</Label>
                    <p className="text-sm text-gray-600">Sell your merchandise</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label className="font-medium">Ad Revenue Share</Label>
                    <p className="text-sm text-gray-600">Earn from ads on your content</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                Set Up Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}