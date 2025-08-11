import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Play, Volume2, VolumeX, PlayCircle } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';


import { Video } from '@/types';
import { useVideos } from '@/hooks/useVideos';

interface VideoCardProps {
  video: Video;
  isShort?: boolean;
}

export default function VideoCard({ video, isShort = false }: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);


  const { likeVideo, shareVideo } = useVideos();


  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      likeVideo(video.id);
    }
  };

  const handleShare = () => {
    shareVideo(video.id);
    // In real app, this would open share dialog
  };

  const formatCount = (count: number) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isShort) {
    // Short video format (TikTok-style)
    return (
      <Card className="relative w-full max-w-sm mx-auto aspect-[9/16] bg-black rounded-xl overflow-hidden group">
        {/* Video background */}
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={() => setShowVideoPlayer(true)}
        >
          <img 
            src={video.thumbnailUrl} 
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full w-16 h-16 bg-white/20 backdrop-blur-sm hover:bg-white/30 hover:scale-110 transition-transform duration-200"
            onClick={() => setShowVideoPlayer(true)}
          >
            <Play className="h-8 w-8 text-white ml-1" />
          </Button>
        </div>

        {/* Right side actions */}
        <div className="absolute right-3 bottom-20 space-y-4">
          <div className="flex flex-col items-center space-y-1">
            <Button
              size="sm"
              variant="ghost"
              className={`rounded-full w-12 h-12 ${isLiked ? 'text-red-500' : 'text-white'} bg-black/20 backdrop-blur-sm`}
              onClick={handleLike}
            >
              <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <span className="text-xs text-white font-medium">{formatCount(video.likes)}</span>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full w-12 h-12 text-white bg-black/20 backdrop-blur-sm"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <span className="text-xs text-white font-medium">{formatCount(video.comments)}</span>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full w-12 h-12 text-white bg-black/20 backdrop-blur-sm"
              onClick={handleShare}
            >
              <Share2 className="h-6 w-6" />
            </Button>
            <span className="text-xs text-white font-medium">{formatCount(video.shares)}</span>
          </div>

          <Button
            size="sm"
            variant="ghost"
            className={`rounded-full w-12 h-12 ${isBookmarked ? 'text-yellow-500' : 'text-white'} bg-black/20 backdrop-blur-sm`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={`h-6 w-6 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-16 p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src={video.user.profilePicture} alt={video.user.name} />
              <AvatarFallback>{video.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-sm">{video.user.username}</span>
            {video.user.isVerified && (
              <Badge className="bg-blue-500 text-white text-xs p-1">✓</Badge>
            )}
          </div>
          <p className="text-sm mb-2 line-clamp-2">{video.description}</p>
          <div className="flex flex-wrap gap-1">
            {video.hashtags.map((tag) => (
              <span key={tag} className="text-xs text-blue-200">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Mute/Unmute button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-4 right-4 rounded-full w-8 h-8 text-white bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>

        <VideoPlayer 
          video={video}
          isOpen={showVideoPlayer}
          onClose={() => setShowVideoPlayer(false)}
        />
      </Card>
    );
  }

  // Regular video format (YouTube-style)
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Video thumbnail */}
      <div 
        className="relative aspect-video bg-gray-100 cursor-pointer"
        onClick={() => setShowVideoPlayer(true)}
      >
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200 flex items-center justify-center group">
          <Button
            size="lg"
            variant="secondary"
            className="rounded-full w-16 h-16 bg-black/60 backdrop-blur-sm hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
            onClick={() => setShowVideoPlayer(true)}
          >
            <Play className="h-8 w-8 text-white ml-1" />
          </Button>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
          {formatDuration(video.duration)}
        </div>
      </div>

      {/* Video content */}
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={video.user.profilePicture} alt={video.user.name} />
            <AvatarFallback>{video.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
              {video.title}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-gray-600">{video.user.username}</span>
              {video.user.isVerified && (
                <Badge className="bg-blue-500 text-white text-xs">✓</Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{formatCount(video.views)} views</span>
              <span>•</span>
              <span>{new Date(video.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={isLiked ? 'text-red-500' : 'text-gray-500'}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              {formatCount(video.likes)}
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-500">
              <MessageCircle className="h-4 w-4 mr-1" />
              {formatCount(video.comments)}
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-1" />
              {formatCount(video.shares)}
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className={isBookmarked ? 'text-yellow-500' : 'text-gray-500'}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <VideoPlayer 
          video={video}
          isOpen={showVideoPlayer}
          onClose={() => setShowVideoPlayer(false)}
        />
      </div>
    </Card>
  );
}