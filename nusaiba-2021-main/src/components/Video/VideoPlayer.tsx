import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Send,
  X,
  PlayCircle,
  Menu,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Video, Comment } from '@/types';
import { useVideos } from '@/hooks/useVideos';


interface VideoPlayerProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoPlayer({ video, isOpen, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showChat, setShowChat] = useState(false); // Start with chat collapsed
  const [bufferingProgress, setBufferingProgress] = useState(0);
  const [isCinemaMode, setIsCinemaMode] = useState(true); // Enable cinema mode by default
  const [showTopControls, setShowTopControls] = useState(false);
  const [showCommentsOverlay, setShowCommentsOverlay] = useState(false);
  const [showFloatingControls, setShowFloatingControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { likeVideo, shareVideo } = useVideos();

  const togglePlay = () => {
    console.log('togglePlay called, isPlaying:', isPlaying, 'videoRef:', videoRef.current);
    if (videoRef.current) {
      if (isPlaying) {
        console.log('Pausing video');
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        console.log('Playing video');
        videoRef.current.play().then(() => {
          console.log('Video play successful in togglePlay');
          setIsPlaying(true);
        }).catch((error) => {
          console.error('Error playing video:', error);
          // Fallback: try to play without user interaction
          videoRef.current?.play().then(() => {
            console.log('Fallback play successful');
            setIsPlaying(true);
          }).catch((fallbackError) => {
            console.error('Fallback play failed:', fallbackError);
          });
        });
      }
    } else {
      console.log('Video ref is null');
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Auto-play video when player opens
  useEffect(() => {
    console.log('VideoPlayer useEffect - isOpen:', isOpen, 'video:', video);
    if (isOpen && video && videoRef.current) {
      console.log('Attempting to play video:', video.url);
      // Small delay to ensure the video element is ready
      const timer = setTimeout(() => {
        if (videoRef.current) {
          console.log('Video element ready, attempting to play');
          videoRef.current.play().then(() => {
            console.log('Video play successful');
            setIsPlaying(true);
          }).catch((error) => {
            console.log('Auto-play failed (this is normal in some browsers):', error);
          });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, video]);

  // Prevent video interruptions when window loses focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current && isPlaying) {
        // Pause video when tab becomes hidden to prevent interruptions
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleBlur = () => {
      if (videoRef.current && isPlaying) {
        // Pause video when window loses focus
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isPlaying]);

  // Update progress bar
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  // Close quality menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.quality-menu')) {
        setShowQualityMenu(false);
      }
      // Close quality settings panel when clicking outside
      if (!target.closest('.quality-settings-panel')) {
        setShowQualitySettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts and prevent interruptions
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (event.code) {
        case 'Space':
          event.preventDefault();
          togglePlay();
          break;
        case 'KeyM':
          event.preventDefault();
          toggleMute();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
          }
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (videoRef.current) {
            videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
          }
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, togglePlay, toggleMute, onClose]);

  // Mock comments and live chat
  useEffect(() => {
    if (video) {
      setComments([
        {
          id: '1',
          userId: '2',
          user: {
            id: '2',
            username: 'viewer1',
            name: 'Amazing Viewer',
            email: 'viewer@example.com',
            profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
            gender: 'male',
            isVerified: false,
            isPrivate: false,
            followers: 150,
            following: 89,
            totalViews: 1200,
            totalUploads: 45,
            privacySettings: {
              profileVisibility: 'public',
              bioVisibility: 'public',
              locationVisibility: 'public',
              websiteVisibility: 'public',
            },
            socialLinks: {},
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          videoId: video.id,
          content: 'This is incredible! 🔥',
          likes: 12,
          replies: [],
          createdAt: new Date(Date.now() - 3600000),
        },
        {
          id: '2',
          userId: '3',
          user: {
            id: '3',
            username: 'fan_account',
            name: 'Super Fan',
            email: 'fan@example.com',
            profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b332c6a8?w=32&h=32&fit=crop&crop=face',
            gender: 'female',
            isVerified: false,
            isPrivate: false,
            followers: 89,
            following: 234,
            totalViews: 800,
            totalUploads: 23,
            privacySettings: {
              profileVisibility: 'public',
              bioVisibility: 'public',
              locationVisibility: 'public',
              websiteVisibility: 'public',
            },
            socialLinks: {},
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          videoId: video.id,
          content: 'Love your content! Keep it up! 💕',
          likes: 8,
          replies: [],
          createdAt: new Date(Date.now() - 1800000),
        },
        {
          id: '3',
          userId: '4',
          user: {
            id: '4',
            username: 'live_chatter',
            name: 'Live Chatter',
            email: 'live@example.com',
            profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
            gender: 'female',
            isVerified: false,
            isPrivate: false,
            followers: 45,
            following: 67,
            totalViews: 300,
            totalUploads: 12,
            privacySettings: {
              profileVisibility: 'public',
              bioVisibility: 'public',
              locationVisibility: 'public',
              websiteVisibility: 'public',
            },
            socialLinks: {},
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          videoId: video.id,
          content: 'Watching live! This is amazing! 🎉',
          likes: 3,
          replies: [],
          createdAt: new Date(Date.now() - 300000),
        },
        {
          id: '4',
          userId: '5',
          user: {
            id: '5',
            username: 'tech_enthusiast',
            name: 'Tech Enthusiast',
            email: 'tech@example.com',
            profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
            gender: 'male',
            isVerified: true,
            isPrivate: false,
            followers: 1200,
            following: 89,
            totalViews: 15000,
            totalUploads: 89,
            privacySettings: {
              profileVisibility: 'public',
              bioVisibility: 'public',
              locationVisibility: 'public',
              websiteVisibility: 'public',
            },
            socialLinks: {},
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          videoId: video.id,
          content: 'The quality is perfect! HD looks great! 📺',
          likes: 15,
          replies: [],
          createdAt: new Date(Date.now() - 120000),
        },
      ]);
    }
  }, [video]);

  const handleLike = () => {
    if (video) {
      setIsLiked(!isLiked);
      if (!isLiked) {
        likeVideo(video.id);
      }
    }
  };

  const handleShare = () => {
    if (video) {
      shareVideo(video.id);
      navigator.share?.({
        title: video.title,
        text: video.description,
        url: window.location.href,
      }).catch(() => {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      });
    }
  };

  const sendComment = () => {
    if (comment.trim() && video) {
      const newComment: Comment = {
        id: Date.now().toString(),
        userId: 'current_user',
        user: {
          id: 'current_user',
          username: 'you',
          name: 'You',
          email: 'you@example.com',
          profilePicture: '',
          gender: 'other',
          isVerified: false,
          isPrivate: false,
          followers: 0,
          following: 0,
          totalViews: 0,
          totalUploads: 0,
          privacySettings: {
            profileVisibility: 'public',
            bioVisibility: 'public',
            locationVisibility: 'public',
            websiteVisibility: 'public',
          },
          socialLinks: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        videoId: video.id,
        content: comment,
        likes: 0,
        replies: [],
        createdAt: new Date(),
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const formatCount = (count: number) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[95vh] p-0 bg-black">
        <div className="flex h-full relative">
          {/* Main Video Section - Centered */}
          <div className="flex-1 bg-black relative flex items-center justify-center">
                    {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading video...</p>
              <div className="mt-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>Buffering...</span>
                </div>
              </div>
            </div>
          </div>
        )}

            {/* Error State */}
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-white text-center">
                  <div className="text-red-400 mb-4">⚠️</div>
                  <p className="mb-2">Failed to load video</p>
                  <p className="text-sm text-gray-400">Please try again later</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 text-white border-white hover:bg-white hover:text-black"
                    onClick={() => {
                      setHasError(false);
                      setIsLoading(true);
                      if (videoRef.current) {
                        videoRef.current.load();
                      }
                    }}
                  >
                    Retry
                  </Button>
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              className="w-full h-full object-contain cursor-pointer"
              poster={video.thumbnailUrl}
              onClick={togglePlay}
              controls={false}
              preload="auto"
              playsInline
              webkit-playsinline="true"
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  setIsLoading(false);
                }
              }}
              onLoadStart={() => setIsLoading(true)}
              onCanPlay={() => setIsLoading(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onProgress={() => {
                if (videoRef.current && videoRef.current.buffered.length > 0) {
                  const buffered = videoRef.current.buffered;
                  const currentTime = videoRef.current.currentTime;
                  let bufferedEnd = 0;
                  
                  for (let i = 0; i < buffered.length; i++) {
                    if (currentTime >= buffered.start(i) && currentTime <= buffered.end(i)) {
                      bufferedEnd = buffered.end(i);
                      break;
                    }
                  }
                  
                  if (videoRef.current.duration) {
                    setBufferingProgress((bufferedEnd / videoRef.current.duration) * 100);
                  }
                }
              }}
              onError={(e) => {
                console.error('Video error:', e);
                console.error('Video URL:', video.url);
                setHasError(true);
                setIsLoading(false);
              }}
            >
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200 flex items-center justify-center group">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full w-16 h-16 bg-black/60 backdrop-blur-sm hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-8 w-8 text-white" /> : <Play className="h-8 w-8 text-white ml-1" />}
              </Button>
            </div>

            {/* Video Progress Bar */}
            <div className="absolute bottom-16 left-4 right-4">
              {/* Buffering Progress */}
              <div className="w-full bg-black/20 rounded-full h-1 mb-1">
                <div 
                  className="bg-gray-400 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${bufferingProgress}%` }}
                />
              </div>
              {/* Playback Progress */}
              <div className="w-full bg-black/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {/* Time Display */}
              <div className="text-white text-xs mt-2 text-center bg-black/40 px-2 py-1 rounded backdrop-blur-sm inline-block">
                {videoRef.current ? 
                  `${Math.floor(videoRef.current.currentTime / 60)}:${String(Math.floor(videoRef.current.currentTime % 60)).padStart(2, '0')} / ${Math.floor(videoRef.current.duration / 60)}:${String(Math.floor(videoRef.current.duration % 60)).padStart(2, '0')}` 
                  : '0:00 / 0:00'
                }
              </div>
            </div>

            {/* Cinema Mode Floating Control Bar */}
            <div 
              className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md rounded-full px-6 py-3 flex items-center space-x-4 transition-all duration-300 ${
                showFloatingControls ? 'opacity-100' : 'opacity-0'
              }`}
              onMouseEnter={() => setShowFloatingControls(true)}
              onMouseLeave={() => setShowFloatingControls(false)}
            >
              {/* Play/Pause */}
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              {/* Volume */}
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>

              {/* Like */}
              <Button
                size="sm"
                variant="ghost"
                className={`hover:bg-white/20 ${isLiked ? 'text-red-500' : 'text-white'}`}
                onClick={handleLike}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>

              {/* Share */}
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>

              {/* Comments */}
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => setShowCommentsOverlay(!showCommentsOverlay)}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>

              {/* Fullscreen */}
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>

            {/* Hover area to show floating controls */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-24 cursor-pointer"
              onMouseEnter={() => setShowFloatingControls(true)}
              onMouseLeave={() => setShowFloatingControls(false)}
            />

            {/* Cinema Mode Top Controls - Hidden by default */}
            <div 
              className={`absolute top-4 right-4 flex items-center space-x-2 transition-all duration-300 ${
                showTopControls ? 'opacity-100' : 'opacity-0'
              }`}
              onMouseEnter={() => setShowTopControls(true)}
              onMouseLeave={() => setShowTopControls(false)}
            >
              {/* Menu Button */}
              <Button
                size="sm"
                variant="ghost"
                className="text-white bg-black/40 backdrop-blur-sm hover:bg-black/60"
                onClick={() => setShowCommentsOverlay(!showCommentsOverlay)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              
              {/* Close Button */}
              <Button
                size="sm"
                variant="ghost"
                className="text-white bg-black/20 backdrop-blur-sm hover:bg-black/40"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Hover area to show top controls */}
            <div 
              className="absolute top-0 right-0 w-32 h-16 cursor-pointer"
              onMouseEnter={() => setShowTopControls(true)}
              onMouseLeave={() => setShowTopControls(false)}
            />




          </div>

          {/* Cinema Mode Collapsible Side Drawer */}
          <div className={`${showChat ? 'w-80' : 'w-12'} bg-white/95 backdrop-blur-md border-l border-white/20 flex flex-col transition-all duration-300`}>
            {/* Toggle Button */}
            <div className="p-2 border-b border-white/20">
              <Button
                size="sm"
                variant="ghost"
                className="w-full h-8 text-gray-600 hover:text-gray-800 hover:bg-white/50"
                onClick={() => setShowChat(!showChat)}
              >
                {showChat ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* Video Info */}
            <div className={`${showChat ? 'p-4' : 'p-2'} border-b border-white/20`}>
              <div className="flex items-start space-x-3 mb-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={video.user.profilePicture} alt={video.user.name} />
                  <AvatarFallback>{video.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold">{video.user.username}</span>
                    {video.user.isVerified && (
                      <Badge className="bg-blue-500 text-white text-xs">✓</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatCount(video.user.followers)} followers
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  Follow
                </Button>
              </div>

              <h2 className="font-semibold text-lg mb-2">{video.title}</h2>
              <p className="text-gray-600 text-sm mb-3">{video.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {video.hashtags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{formatCount(video.views)} views</span>
                <span>•</span>
                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={isLiked ? 'text-red-500' : 'text-gray-500'}
                    onClick={handleLike}
                  >
                    <Heart className={`h-5 w-5 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                    {formatCount(video.likes + (isLiked ? 1 : 0))}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <MessageCircle className="h-5 w-5 mr-1" />
                    {formatCount(comments.length)}
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className={isBookmarked ? 'text-yellow-500' : 'text-gray-500'}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Comments/Chat */}
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-semibold">{showChat ? 'Live Chat' : 'Comments'}</h3>
                {showChat && (
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">Live</span>
                  </div>
                )}
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={comment.user.profilePicture} alt={comment.user.name} />
                        <AvatarFallback className="text-xs">{comment.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-semibold">{comment.user.username}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800">{comment.content}</p>
                        <div className="flex items-center space-x-3 mt-2">
                          <Button variant="ghost" size="sm" className="text-xs text-gray-500 p-0 h-auto">
                            <Heart className="h-3 w-3 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs text-gray-500 p-0 h-auto">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Comment Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">Y</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex space-x-2">
                    <Input
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendComment()}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={sendComment} disabled={!comment.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}