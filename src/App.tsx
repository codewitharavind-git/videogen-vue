import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Upload from "./pages/dashboard/Upload";
import Status from "./pages/dashboard/Status";
import Results from "./pages/dashboard/Results";
import Settings from "./pages/dashboard/Settings";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard/upload" element={
            <DashboardLayout>
              <Upload />
            </DashboardLayout>
          } />
          <Route path="/dashboard/status" element={
            <DashboardLayout>
              <Status />
            </DashboardLayout>
          } />
          <Route path="/dashboard/results" element={
            <DashboardLayout>
              <Results />
            </DashboardLayout>
          } />
          <Route path="/dashboard/settings" element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          } />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
