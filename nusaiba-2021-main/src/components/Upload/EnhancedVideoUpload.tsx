import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Upload, 
  Video, 
  Image, 
  FileText, 
  Play, 
  Pause, 
  X, 
  Check,
  Camera,
  Mic,
  Hash,
  Users,
  Globe,
  Lock,
  UserCheck,
  Clock
} from 'lucide-react';
import { database } from '@/lib/database';
import { useAuth } from '@/hooks/useAuth';

interface UploadFile {
  id: string;
  file: File;
  type: 'video' | 'image' | 'gif' | 'story';
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview: string;
}

export default function EnhancedVideoUpload({ onClose }: { onClose: () => void }) {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [uploadData, setUploadData] = useState({
    caption: '',
    hashtags: '',
    audience: 'public',
    allowComments: true,
    allowDuets: true,
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadType, setUploadType] = useState<'video' | 'image' | 'gif' | 'story'>('video');
  const { user } = useAuth();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach((file) => {
      const id = Date.now() + Math.random().toString();
      const preview = URL.createObjectURL(file);
      
      const uploadFile: UploadFile = {
        id,
        file,
        type: uploadType,
        progress: 0,
        status: 'uploading',
        preview,
      };
      
      setUploadFiles(prev => [...prev, uploadFile]);
      simulateUpload(id);
    });
  };

  const simulateUpload = (id: string) => {
    const interval = setInterval(() => {
      setUploadFiles(prev => prev.map(file => {
        if (file.id === id) {
          const newProgress = Math.min(file.progress + Math.random() * 15, 100);
          return {
            ...file,
            progress: newProgress,
            status: newProgress === 100 ? 'completed' : 'uploading'
          };
        }
        return file;
      }));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploadFiles(prev => prev.map(file => {
        if (file.id === id) {
          return { ...file, progress: 100, status: 'completed' };
        }
        return file;
      }));
    }, 3000);
  };

  const removeFile = (id: string) => {
    setUploadFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleUpload = async () => {
    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      if (!user) throw new Error('You must be logged in to upload');
      // Save uploaded items to local database
      const now = new Date();
      for (const file of uploadFiles) {
        if (file.type === 'video' || file.type === 'story') {
          const objectUrl = file.preview; // already created via URL.createObjectURL
          await database.createVideo({
            userId: user.id,
            title: uploadData.caption || file.file.name,
            description: uploadData.caption || '',
            url: objectUrl,
            thumbnailUrl: objectUrl,
            duration: 0,
            isShort: file.type === 'story',
            hashtags: uploadData.hashtags
              .split(' ')
              .map(tag => tag.replace(/^#/, ''))
              .filter(Boolean),
          });
        } else if (file.type === 'image' || file.type === 'gif') {
          await database.saveMediaItems([
            { type: file.type, url: file.preview, userId: user.id, createdAt: now },
          ]);
        }
      }
    } catch (e) {
      console.error(e);
    }

    setIsUploading(false);
    onClose();
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5" />;
      case 'image': return <Image className="h-5 w-5" />;
      case 'gif': return <FileText className="h-5 w-5" />;
      case 'story': return <Clock className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const audienceOptions = [
    { value: 'public', label: 'Public', icon: Globe, description: 'Anyone can view' },
    { value: 'friends', label: 'Friends', icon: UserCheck, description: 'Friends only' },
    { value: 'private', label: 'Private', icon: Lock, description: 'Only you can view' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-6 w-6 mr-2 text-purple-600" />
            Upload Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Type Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Content Type</Label>
            <div className="grid grid-cols-4 gap-3">
              {[
                { type: 'video', label: 'Video', icon: Video },
                { type: 'image', label: 'Photo', icon: Image },
                { type: 'gif', label: 'GIF', icon: FileText },
                { type: 'story', label: 'Story', icon: Clock },
              ].map(({ type, label, icon: Icon }) => (
                <Button
                  key={type}
                  variant={uploadType === type ? 'default' : 'outline'}
                  className={`h-16 flex-col space-y-1 ${
                    uploadType === type ? 'bg-purple-600 hover:bg-purple-700' : ''
                  }`}
                  onClick={() => setUploadType(type as 'video' | 'image' | 'gif' | 'story')}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* File Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop your {uploadType} here or click to browse
            </p>
            <p className="text-sm text-gray-500">
              {uploadType === 'video' && 'Supports MP4, MOV, AVI up to 1GB'}
              {uploadType === 'image' && 'Supports JPG, PNG, WEBP up to 10MB'}
              {uploadType === 'gif' && 'Supports GIF up to 50MB'}
              {uploadType === 'story' && 'Supports MP4, JPG, PNG (24h duration)'}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept={
                uploadType === 'video' ? 'video/*' :
                uploadType === 'image' ? 'image/*' :
                uploadType === 'gif' ? 'image/gif' :
                'video/*, image/*'
              }
              onChange={handleFileSelect}
            />
          </div>

          {/* Upload Progress */}
          {uploadFiles.length > 0 && (
            <div className="space-y-3">
              <Label className="text-base font-medium">Upload Progress</Label>
              {uploadFiles.map((file) => (
                <div key={file.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {file.type === 'video' || file.type === 'story' ? (
                      <video
                        src={file.preview}
                        className="w-16 h-16 object-cover rounded"
                        muted
                      />
                    ) : (
                      <img
                        src={file.preview}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getFileIcon(file.type)}
                        <span className="text-sm font-medium truncate">{file.file.name}</span>
                        <Badge variant={file.status === 'completed' ? 'default' : 'secondary'}>
                          {file.status === 'completed' ? 'Done' : 'Uploading'}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="flex-shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Progress value={file.progress} className="flex-1" />
                      <span className="text-xs text-gray-500 w-12">{Math.round(file.progress)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Content Details */}
          {uploadFiles.length > 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  placeholder="Write a caption for your content..."
                  value={uploadData.caption}
                  onChange={(e) => setUploadData({ ...uploadData, caption: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="hashtags">Hashtags</Label>
                <Input
                  id="hashtags"
                  placeholder="#trending #viral #nusaiba"
                  value={uploadData.hashtags}
                  onChange={(e) => setUploadData({ ...uploadData, hashtags: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Separate hashtags with spaces</p>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Audience</Label>
                <div className="grid grid-cols-1 gap-2">
                  {audienceOptions.map(({ value, label, icon: Icon, description }) => (
                    <Button
                      key={value}
                      variant={uploadData.audience === value ? 'default' : 'outline'}
                      className={`justify-start h-auto p-3 ${
                        uploadData.audience === value ? 'bg-purple-600 hover:bg-purple-700' : ''
                      }`}
                      onClick={() => setUploadData({ ...uploadData, audience: value })}
                    >
                      <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                      <div className="text-left">
                        <div className="font-medium">{label}</div>
                        <div className="text-xs opacity-75">{description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Allow Comments</Label>
                  <input
                    type="checkbox"
                    checked={uploadData.allowComments}
                    onChange={(e) => setUploadData({ ...uploadData, allowComments: e.target.checked })}
                    className="w-4 h-4"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Allow Duets/Remixes</Label>
                  <input
                    type="checkbox"
                    checked={uploadData.allowDuets}
                    onChange={(e) => setUploadData({ ...uploadData, allowDuets: e.target.checked })}
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={uploadFiles.length === 0 || isUploading || uploadFiles.some(f => f.status === 'uploading')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isUploading ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}