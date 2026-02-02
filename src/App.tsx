import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RiskSignals from "./pages/RiskSignals";
import AlertGenerator from "./pages/AlertGenerator";
import PendingApprovals from "./pages/PendingApprovals";
import SentAlerts from "./pages/SentAlerts";
import Regions from "./pages/Regions";
import UsersRoles from "./pages/UsersRoles";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/risk-signals" element={<RiskSignals />} />
          <Route path="/alert-generator" element={<AlertGenerator />} />
          <Route path="/pending-approvals" element={<PendingApprovals />} />
          <Route path="/sent-alerts" element={<SentAlerts />} />
          <Route path="/regions" element={<Regions />} />
          <Route path="/users" element={<UsersRoles />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
