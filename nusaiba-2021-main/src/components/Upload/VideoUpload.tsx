import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Upload, Video, Image, X, Calendar, Sparkles } from 'lucide-react';
import { useVideos } from '@/hooks/useVideos';

export default function VideoUpload() {
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    hashtags: '',
    isShort: false,
    scheduled: false,
    scheduleDate: '',
    file: null as File | null,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  
  const { uploadVideo, isLoading } = useVideos();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (videoFile) {
      setUploadData({ ...uploadData, file: videoFile });
    }
  }, [uploadData]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadData({ ...uploadData, file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.file) return;

    // Mock upload progress
    setUploadProgress(0);
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await uploadVideo({
        title: uploadData.title,
        description: uploadData.description,
        file: uploadData.file,
      });
      setUploadProgress(100);
      // Reset form
      setUploadData({
        title: '',
        description: '',
        hashtags: '',
        isShort: false,
        scheduled: false,
        scheduleDate: '',
        file: null,
      });
    } catch (error) {
      clearInterval(progressInterval);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="h-5 w-5 mr-2" />
          Upload Video
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploadData.file ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <Video className="h-12 w-12 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold">{uploadData.file.name}</h3>
                  <p className="text-sm text-gray-500">{formatFileSize(uploadData.file.size)}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setUploadData({ ...uploadData, file: null })}
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <Upload className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Drop your video here</h3>
                  <p className="text-sm text-gray-500">or click to browse</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Supports MP4, MOV, AVI up to 4K resolution
                  </p>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Upload Progress</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {/* Video Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Give your video a catchy title"
                value={uploadData.title}
                onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell viewers about your video"
                rows={4}
                value={uploadData.description}
                onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hashtags">Hashtags</Label>
              <Input
                id="hashtags"
                placeholder="Add hashtags separated by spaces (e.g., #dance #viral #fun)"
                value={uploadData.hashtags}
                onChange={(e) => setUploadData({ ...uploadData, hashtags: e.target.value })}
              />
            </div>
          </div>

          {/* Upload Options */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Short Video (under 60s)</Label>
                <p className="text-xs text-gray-500">
                  Short videos get more visibility
                </p>
              </div>
              <Switch
                checked={uploadData.isShort}
                onCheckedChange={(checked) => setUploadData({ ...uploadData, isShort: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Schedule Upload</Label>
                <p className="text-xs text-gray-500">
                  Publish your video at a specific time
                </p>
              </div>
              <Switch
                checked={uploadData.scheduled}
                onCheckedChange={(checked) => setUploadData({ ...uploadData, scheduled: checked })}
              />
            </div>

            {uploadData.scheduled && (
              <div className="space-y-2">
                <Label htmlFor="scheduleDate">Schedule Date & Time</Label>
                <Input
                  id="scheduleDate"
                  type="datetime-local"
                  value={uploadData.scheduleDate}
                  onChange={(e) => setUploadData({ ...uploadData, scheduleDate: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* AI Enhancement Options */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center mb-3">
              <Sparkles className="h-5 w-5 text-purple-600 mr-2" />
              <h3 className="font-semibold text-purple-800">AI Enhancements</h3>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="mr-2">Auto Captions</Badge>
              <Badge variant="outline" className="mr-2">Smart Thumbnails</Badge>
              <Badge variant="outline" className="mr-2">Content Analysis</Badge>
            </div>
            <p className="text-xs text-purple-600 mt-2">
              These features will be automatically applied to improve your video's reach
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={!uploadData.file || !uploadData.title || isLoading}
          >
            {isLoading ? 'Uploading...' : uploadData.scheduled ? 'Schedule Upload' : 'Upload Video'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}