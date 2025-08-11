import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RefreshCw, Filter, TrendingUp } from 'lucide-react';
import { useVideos } from '@/hooks/useVideos';
import VideoCard from '@/components/Video/VideoCard';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function VideoFeed() {
  const { videos, fetchVideos, isLoading } = useVideos();
  const [activeTab, setActiveTab] = useState('for-you');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchVideos();
    setRefreshing(false);
  };

  const shortsVideos = videos.filter(video => video.isShort);
  const longVideos = videos.filter(video => !video.isShort);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Feed Header */}
      <div className="sticky top-16 bg-white/80 backdrop-blur-md border-b border-gray-200 z-40">
        <div className="flex items-center justify-between p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-auto grid-cols-4">
                <TabsTrigger value="for-you">For You</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="trending">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="live">Live</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Feed Content */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="for-you" className="mt-0">
            <div className="space-y-6">
              {/* Shorts Section */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full mr-3"></div>
                  Shorts
                </h2>
                <ScrollArea className="w-full">
                  <div className="flex space-x-4 pb-4">
                    {shortsVideos.map((video) => (
                      <div key={video.id} className="flex-shrink-0">
                        <VideoCard video={video} isShort={true} />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Long Videos Section */}
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-3"></div>
                  Recommended Videos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {longVideos.map((video) => (
                    <VideoCard key={video.id} video={video} isShort={false} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="following" className="mt-0">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">Follow creators to see their content</h3>
              <p className="text-gray-500 mb-4">Discover amazing creators and never miss their updates</p>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                Explore Creators
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-0">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">🔥 What's Trending</h2>
                <p className="text-pink-100">Discover the hottest content on Nusaiba</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} isShort={false} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="live" className="mt-0">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">No Live Streams Right Now</h3>
              <p className="text-gray-500 mb-4">Be the first to go live and connect with your audience</p>
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                Start Live Stream
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin text-purple-600" />
        </div>
      )}
    </div>
  );
}