import { useState, useCallback } from "react";
import { Upload as UploadIcon, Youtube, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (videoFile) {
      setUploadedFile(videoFile);
      toast({
        title: "File ready",
        description: `${videoFile.name} is ready to upload`,
      });
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a video file",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload complete!",
            description: "Your video is being processed",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleYoutubeSubmit = () => {
    if (!youtubeUrl) return;
    
    toast({
      title: "YouTube link added",
      description: "Video is being processed from YouTube",
    });
    setYoutubeUrl("");
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Video</h1>
        <p className="text-muted-foreground mt-2">
          Upload your video file or paste a YouTube link to get started
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* File Upload */}
        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UploadIcon className="w-5 h-5" />
              File Upload
            </CardTitle>
            <CardDescription>
              Drag and drop your video file or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-fast cursor-pointer"
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <File className="w-8 h-8 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={removeFile}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {uploadProgress > 0 && (
                    <div className="space-y-2">
                      <Progress value={uploadProgress} className="w-full" />
                      <p className="text-sm text-muted-foreground">
                        {uploadProgress}% uploaded
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleUpload} 
                    disabled={isUploading}
                    variant="gradient"
                    className="w-full"
                  >
                    {isUploading ? "Uploading..." : "Start Upload"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <UploadIcon className="w-12 h-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">Drop your video here</p>
                    <p className="text-muted-foreground">or click to browse files</p>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* YouTube URL */}
        <Card className="transition-smooth hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-500" />
              YouTube Link
            </CardTitle>
            <CardDescription>
              Paste a YouTube URL to process the video directly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-url">YouTube URL</Label>
              <Input
                id="youtube-url"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="transition-fast"
              />
            </div>
            
            <Button 
              onClick={handleYoutubeSubmit}
              disabled={!youtubeUrl}
              variant="outline"
              className="w-full"
            >
              Process YouTube Video
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <p>Supported formats: MP4, MOV, AVI, MKV</p>
              <p>Max file size: 500MB</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;