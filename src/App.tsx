import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Set the basename here for GitHub Pages */}
        <BrowserRouter basename="/blog-platform">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Index />
                ) : isAuthenticated === false ? (
                  <Navigate to="/login" />
                ) : null
              }
            />
            <Route
              path="/create"
              element={
                isAuthenticated ? (
                  <CreatePost />
                ) : isAuthenticated === false ? (
                  <Navigate to="/login" />
                ) : null
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" /> : <Login />
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? <Navigate to="/login" /> : <Signup />
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
