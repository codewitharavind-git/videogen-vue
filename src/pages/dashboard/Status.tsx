import { useState } from "react";
import { Eye, Clock, CheckCircle, XCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for video jobs
const mockJobs = [
  {
    id: "1",
    title: "Marketing Presentation 2024",
    status: "completed",
    createdAt: "2024-01-15",
    thumbnail: "/placeholder-video.jpg",
    duration: "15:32",
    clipsGenerated: 5,
  },
  {
    id: "2", 
    title: "Product Demo - New Features",
    status: "processing",
    createdAt: "2024-01-14",
    thumbnail: "/placeholder-video.jpg",
    duration: "8:45",
    clipsGenerated: 0,
  },
  {
    id: "3",
    title: "Team Meeting Recording",
    status: "pending",
    createdAt: "2024-01-14",
    thumbnail: "/placeholder-video.jpg", 
    duration: "32:18",
    clipsGenerated: 0,
  },
  {
    id: "4",
    title: "Customer Testimonials",
    status: "rejected",
    createdAt: "2024-01-13",
    thumbnail: "/placeholder-video.jpg",
    duration: "12:05",
    clipsGenerated: 0,
  },
  {
    id: "5",
    title: "Webinar: AI in Business",
    status: "completed",
    createdAt: "2024-01-12",
    thumbnail: "/placeholder-video.jpg",
    duration: "45:30",
    clipsGenerated: 8,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed
        </Badge>
      );
    case "processing":
      return (
        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
          <Clock className="w-3 h-3 mr-1" />
          Processing
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="bg-muted text-muted-foreground">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
          <XCircle className="w-3 h-3 mr-1" />
          Rejected
        </Badge>
      );
    default:
      return null;
  }
};

const Status = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const completedJobs = mockJobs.filter(job => job.status === "completed").length;
  const processingJobs = mockJobs.filter(job => job.status === "processing").length;
  const totalClips = mockJobs.reduce((sum, job) => sum + job.clipsGenerated, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Video Status</h1>
        <p className="text-muted-foreground mt-2">
          Track the progress of your video processing jobs
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Videos</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedJobs}</div>
            <p className="text-xs text-muted-foreground">
              Ready for download
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingJobs}</div>
            <p className="text-xs text-muted-foreground">
              Currently processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clips</CardTitle>
            <Play className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClips}</div>
            <p className="text-xs text-muted-foreground">
              Generated clips
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Video Jobs</CardTitle>
          <CardDescription>
            Monitor all your video processing jobs in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Video</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Clips</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-muted/50 transition-fast">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 rounded-md">
                        <AvatarImage src={job.thumbnail} alt={job.title} />
                        <AvatarFallback className="rounded-md bg-muted">
                          <Play className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Video #{job.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(job.status)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {job.duration}
                  </TableCell>
                  <TableCell>
                    {job.clipsGenerated > 0 ? (
                      <span className="font-medium">{job.clipsGenerated}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedJob(job.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Status;