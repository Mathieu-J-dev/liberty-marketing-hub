
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth"; // Import modifié
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";

// Chaque page est chargée à la demande pour alléger le bundle initial
const Capture = lazy(() => import("./pages/Capture"));
const Opportunities = lazy(() => import("./pages/Opportunities"));
const OpportunityDetail = lazy(() => import("./pages/OpportunityDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ActionPlan = lazy(() => import("./pages/ActionPlan"));
const AffiliatePrograms = lazy(() => import("./pages/AffiliatePrograms"));
const AITools = lazy(() => import("./pages/AITools"));
const Login = lazy(() => import("./pages/Login"));
const MemberArea = lazy(() => import("./pages/MemberArea"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Blog = lazy(() => import("./pages/Blog"));
const Webinars = lazy(() => import("./pages/Webinars"));
const Tutorials = lazy(() => import("./pages/Tutorials"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const StayInformed = lazy(() => import("./pages/StayInformed"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-liberty-blue" />
            </div>
          }>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/capture" element={<Capture />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/opportunities/:id" element={<OpportunityDetail />} />
            <Route path="/action-plan" element={<ActionPlan />} />
            <Route path="/tools" element={<AITools />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/affiliate-programs" element={<AffiliatePrograms />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/espace-membre" element={<MemberArea />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/stay-informed" element={<StayInformed />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
