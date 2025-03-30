
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Capture from "./pages/Capture";
import Opportunities from "./pages/Opportunities";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ActionPlan from "./pages/ActionPlan";
import AffiliatePrograms from "./pages/AffiliatePrograms";
import AITools from "./pages/AITools";
import Login from "./pages/Login";
import MemberArea from "./pages/MemberArea";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/capture" element={<Capture />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/action-plan" element={<ActionPlan />} />
            <Route path="/tools" element={<AITools />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/affiliate-programs" element={<AffiliatePrograms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/espace-membre" element={<MemberArea />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
