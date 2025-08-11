import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ExplorePage from './pages/ExplorePage';
import TrendingPage from './pages/TrendingPage';
import FollowingPage from './pages/FollowingPage';
import LivePage from './pages/LivePage';
import NotFound from './pages/NotFound';
import ProjectRunnerPage from './pages/ProjectRunnerPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/following" element={<FollowingPage />} />
          <Route path="/live" element={<LivePage />} />
          <Route path="/runner" element={<ProjectRunnerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
