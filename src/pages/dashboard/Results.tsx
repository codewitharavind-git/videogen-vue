import { useState } from "react";
import { Download, Trash2, Play, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Mock data for generated clips
const mockClips = [
  {
    id: "1",
    title: "Key Marketing Insights",
    duration: "0:45",
    thumbnail: "/placeholder-video.jpg",
    videoTitle: "Marketing Presentation 2024",
    createdAt: "2024-01-15",
    downloads: 12,
    size: "8.2 MB",
  },
  {
    id: "2",
    title: "Product Demo Highlight", 
    duration: "1:30",
    thumbnail: "/placeholder-video.jpg",
    videoTitle: "Product Demo - New Features",
    createdAt: "2024-01-15",
    downloads: 5,
    size: "15.7 MB",
  },
  {
    id: "3",
    title: "Customer Success Story",
    duration: "0:35",
    thumbnail: "/placeholder-video.jpg", 
    videoTitle: "Customer Testimonials",
    createdAt: "2024-01-13",
    downloads: 18,
    size: "6.1 MB",
  },
  {
    id: "4",
    title: "AI Business Benefits",
    duration: "1:15",
    thumbnail: "/placeholder-video.jpg",
    videoTitle: "Webinar: AI in Business", 
    createdAt: "2024-01-12",
    downloads: 25,
    size: "12.3 MB",
  },
  {
    id: "5",
    title: "ROI Statistics",
    duration: "0:50",
    thumbnail: "/placeholder-video.jpg",
    videoTitle: "Marketing Presentation 2024",
    createdAt: "2024-01-15",
    downloads: 8,
    size: "9.5 MB",
  },
  {
    id: "6", 
    title: "Feature Walkthrough",
    duration: "2:10",
    thumbnail: "/placeholder-video.jpg",
    videoTitle: "Product Demo - New Features",
    createdAt: "2024-01-14",
    downloads: 3,
    size: "18.9 MB",
  },
];

const Results = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const { toast } = useToast();

  const handleDownload = (clipId: string, title: string) => {
    toast({
      title: "Download started",
      description: `Downloading "${title}"`,
    });
  };

  const handleDelete = (clipId: string, title: string) => {
    toast({
      title: "Clip deleted",
      description: `"${title}" has been removed`,
      variant: "destructive",
    });
  };

  const filteredClips = mockClips.filter(clip => {
    const matchesSearch = clip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         clip.videoTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const sortedClips = [...filteredClips].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "downloads":
        return b.downloads - a.downloads;
      case "duration":
        return a.duration.localeCompare(b.duration);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Generated Clips</h1>
        <p className="text-muted-foreground mt-2">
          Download and manage your AI-generated short clips
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search clips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="transition-fast"
          />
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="downloads">Most downloaded</SelectItem>
            <SelectItem value="duration">Duration</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All clips</SelectItem>
            <SelectItem value="recent">Recent (7 days)</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{mockClips.length}</div>
            <p className="text-xs text-muted-foreground">Total clips</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {mockClips.reduce((sum, clip) => sum + clip.downloads, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total downloads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {(mockClips.reduce((sum, clip) => sum + parseFloat(clip.size), 0)).toFixed(1)} MB
            </div>
            <p className="text-xs text-muted-foreground">Total size</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {Math.round(mockClips.reduce((sum, clip) => sum + parseInt(clip.duration.split(':')[1]), 0) / 60)}m
            </div>
            <p className="text-xs text-muted-foreground">Total duration</p>
          </CardContent>
        </Card>
      </div>

      {/* Clips Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedClips.map((clip) => (
          <Card key={clip.id} className="group hover:shadow-lg transition-smooth">
            <CardContent className="p-0">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute bottom-3 left-3 z-20">
                  <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    {clip.duration}
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>
                <img 
                  src={clip.thumbnail} 
                  alt={clip.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold line-clamp-2 mb-1">{clip.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    From: {clip.videoTitle}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{clip.downloads} downloads</span>
                  <span>{clip.size}</span>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="gradient" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDownload(clip.id, clip.title)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(clip.id, clip.title)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClips.length === 0 && (
        <div className="text-center py-12">
          <Play className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No clips found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? "Try adjusting your search terms" : "Upload a video to generate your first clips"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Results;