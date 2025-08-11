import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Settings, 
  Share2, 
  MoreHorizontal, 
  MapPin, 
  Link as LinkIcon, 
  Calendar,
  Play,
  Users,
  Heart,
  Bookmark,
  Grid3X3,
  Video,
  Radio,
  MessageCircle,
  Edit3,
  Camera,
  Eye,
  Lock,
  Unlock,
  UserPlus,
  UserMinus,
  Pin,
  Twitter,
  Instagram,
  Youtube,
  Linkedin
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import VideoCard from '@/components/Video/VideoCard';
import { useVideos } from '@/hooks/useVideos';

export default function EnhancedUserProfile() {
  const { user, updateUser } = useAuth();
  const { videos } = useVideos();
  const [activeTab, setActiveTab] = useState('uploads');
  const [isEditing, setIsEditing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  
  // Profile edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    location: '',
    website: '',
    twitter: '',
    instagram: '',
    youtube: '',
    linkedin: ''
  });

  // File input refs
  const profilePhotoRef = useRef<HTMLInputElement>(null);
  const coverPhotoRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const userVideos = videos.filter(video => video.userId === user.id);
  const shortVideos = userVideos.filter(video => video.isShort);
  const longVideos = userVideos.filter(video => !video.isShort);
  const likedVideos = videos.filter(video => video.likes > 0);

  // Enhanced stats
  const stats = {
    followers: user.followers || 0,
    following: user.following || 0,
    totalViews: user.totalViews || 0,
    totalUploads: user.totalUploads || userVideos.length,
    watchTime: 0,
    topVideoViews: Math.max(...userVideos.map(v => v.views), 0),
    monthlyGrowth: 12.5
  };

  // Pinned content
  const pinnedContent = user.pinnedContentId ? {
    id: user.pinnedContentId,
    type: 'video',
    title: 'Featured Video',
    thumbnailUrl: userVideos[0]?.thumbnailUrl,
    url: userVideos[0]?.url,
    isActive: true
  } : null;

  const handleProfilePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        updateUser({ profilePicture: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        updateUser({ coverPhoto: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    setEditForm({
      name: user.name,
      bio: user.bio || '',
      location: user.location || '',
      website: user.website || '',
      twitter: user.socialLinks?.twitter || '',
      instagram: user.socialLinks?.instagram || '',
      youtube: user.socialLinks?.youtube || '',
      linkedin: user.socialLinks?.linkedin || ''
    });
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    updateUser({
      name: editForm.name,
      bio: editForm.bio,
      location: editForm.location,
      website: editForm.website,
      socialLinks: {
        twitter: editForm.twitter,
        instagram: editForm.instagram,
        youtube: editForm.youtube,
        linkedin: editForm.linkedin
      }
    });
    setIsEditing(false);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-0">
          {/* Cover Photo */}
          <div className="relative h-64 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 overflow-hidden">
            {user.coverPhoto ? (
              <img 
                src={user.coverPhoto} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
            )}
            
            {/* Cover Photo Upload Button */}
            <div className="absolute top-4 right-4">
              <input
                ref={coverPhotoRef}
                type="file"
                accept="image/*"
                onChange={handleCoverPhotoUpload}
                className="hidden"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => coverPhotoRef.current?.click()}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
              >
                <Camera className="h-4 w-4 mr-2" />
                Change Cover
              </Button>
            </div>
            
            {/* Profile Picture */}
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={user.profilePicture} alt={user.name} />
                  <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                {/* Profile Photo Upload Button */}
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                  onClick={() => profilePhotoRef.current?.click()}
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <input
                  ref={profilePhotoRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 px-8 pb-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4 flex-1">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    {user.isVerified && (
                      <Badge className="bg-blue-500 text-white">✓ Verified</Badge>
                    )}
                    {user.isPrivate && (
                      <Badge variant="secondary">Private</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-lg">@{user.username}</p>
                </div>

                {/* Bio */}
                {user.bio && (
                  <p className="text-gray-800 max-w-2xl text-lg">{user.bio}</p>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  {user.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user.location}
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center">
                      <LinkIcon className="h-4 w-4 mr-1" />
                      <a href={user.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        Website
                      </a>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                </div>

                {/* Social Links */}
                {user.socialLinks && Object.values(user.socialLinks).some(link => link) && (
                  <div className="flex items-center space-x-3">
                    {user.socialLinks.twitter && (
                      <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {user.socialLinks.instagram && (
                      <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-600">
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                    {user.socialLinks.youtube && (
                      <a href={user.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-600">
                        <Youtube className="h-5 w-5" />
                      </a>
                    )}
                    {user.socialLinks.linkedin && (
                      <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                )}

                {/* Enhanced Stats */}
                <div className="grid grid-cols-4 gap-6 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.followers.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.following.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{stats.totalViews.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{stats.totalUploads.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Uploads</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 ml-6">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                
                <Button 
                  variant={isFollowing ? "outline" : "default"}
                  size="sm"
                  onClick={toggleFollow}
                >
                  {isFollowing ? (
                    <>
                      <UserMinus className="h-4 w-4 mr-2" />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>

                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Profile Options</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => setShowPrivacySettings(true)}>
                        <Settings className="h-4 w-4 mr-2" />
                        Privacy Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Pin className="h-4 w-4 mr-2" />
                        Pin Content
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600" onClick={handleEditProfile}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pinned Content */}
      {pinnedContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Pin className="h-5 w-5 mr-2 text-orange-500" />
              Pinned Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
              <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                {pinnedContent.thumbnailUrl ? (
                  <img src={pinnedContent.thumbnailUrl} alt={pinnedContent.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Play className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{pinnedContent.title}</h3>
                <p className="text-gray-600">Featured content from {user.name}</p>
              </div>
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4 mr-2" />
                Play
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b px-6 py-4">
              <TabsList className="grid w-full max-w-2xl grid-cols-6">
                <TabsTrigger value="uploads" className="flex items-center">
                  <Grid3X3 className="h-4 w-4 mr-1" />
                  Uploads
                </TabsTrigger>
                <TabsTrigger value="shorts" className="flex items-center">
                  <Play className="h-4 w-4 mr-1" />
                  Shorts
                </TabsTrigger>
                <TabsTrigger value="liked" className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  Liked
                </TabsTrigger>
                <TabsTrigger value="playlists" className="flex items-center">
                  <Bookmark className="h-4 w-4 mr-1" />
                  Playlists
                </TabsTrigger>
                <TabsTrigger value="live" className="flex items-center">
                  <Radio className="h-4 w-4 mr-1" />
                  Live
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  About
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="uploads" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
                {userVideos.length === 0 && (
                  <div className="text-center py-12">
                    <Grid3X3 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No uploads yet</h3>
                    <p className="text-gray-500">Share your first video to get started!</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="shorts" className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {shortVideos.map((video) => (
                    <VideoCard key={video.id} video={video} isShort={true} />
                  ))}
                </div>
                {shortVideos.length === 0 && (
                  <div className="text-center py-12">
                    <Play className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No shorts yet</h3>
                    <p className="text-gray-500">Create your first short video!</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="liked" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {likedVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
                {likedVideos.length === 0 && (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No liked content yet</h3>
                    <p className="text-gray-500">Like some videos to see them here!</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="playlists" className="mt-0">
                <div className="text-center py-12">
                  <Bookmark className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No playlists yet</h3>
                  <p className="text-gray-500">Create playlists to organize your favorite content!</p>
                </div>
              </TabsContent>

              <TabsContent value="live" className="mt-0">
                <div className="text-center py-12">
                  <Radio className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No live streams yet</h3>
                  <p className="text-gray-500 mb-4">Connect with your audience in real-time!</p>
                  <Button className="bg-red-500 hover:bg-red-600 text-white">
                    <Radio className="h-4 w-4 mr-2" />
                    Start Live Stream
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="about" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About {user.name}</h3>
                    <p className="text-gray-700 leading-relaxed">{user.bio || "No bio available."}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Personal Information</h4>
                      <div className="space-y-2 text-sm">
                        {user.location && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            {user.location}
                          </div>
                        )}
                        {user.website && (
                          <div className="flex items-center">
                            <LinkIcon className="h-4 w-4 mr-2 text-gray-500" />
                            <a href={user.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                              {user.website}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Creator Analytics</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total Views:</span>
                          <span className="font-medium">{stats.totalViews.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Top Video Views:</span>
                          <span className="font-medium">{stats.topVideoViews.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Growth:</span>
                          <span className="font-medium text-green-600">+{stats.monthlyGrowth}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                placeholder="Tell us about yourself"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                placeholder="Enter your location"
              />
            </div>
            
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={editForm.website}
                onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                placeholder="https://yourwebsite.com"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={editForm.twitter}
                  onChange={(e) => setEditForm({ ...editForm, twitter: e.target.value })}
                  placeholder="@username"
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={editForm.instagram}
                  onChange={(e) => setEditForm({ ...editForm, instagram: e.target.value })}
                  placeholder="@username"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  value={editForm.youtube}
                  onChange={(e) => setEditForm({ ...editForm, youtube: e.target.value })}
                  placeholder="Channel URL"
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={editForm.linkedin}
                  onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                  placeholder="Profile URL"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Settings Dialog */}
      <Dialog open={showPrivacySettings} onOpenChange={setShowPrivacySettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Privacy Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Profile Visibility</Label>
              <Select defaultValue={user.privacySettings?.profileVisibility || 'public'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="friends">Friends Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Bio Visibility</Label>
              <Select defaultValue={user.privacySettings?.bioVisibility || 'public'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="friends">Friends Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Location Visibility</Label>
              <Select defaultValue={user.privacySettings?.locationVisibility || 'public'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="friends">Friends Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button onClick={() => setShowPrivacySettings(false)}>
                Save Privacy Settings
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


