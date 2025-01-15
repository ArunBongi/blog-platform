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
import EditPost from "./pages/EditPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Categories from "./pages/Categories";
import Archive from "./pages/Archive";
import AllBlogs from "./pages/AllBlogs";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Newsletter from "./pages/Newsletter";
import Profile from "./pages/Profile";
import BlogPost from "./pages/BlogPost";
import Search from "./pages/Search";
import Help from "./pages/Help";
import Author from "./pages/Author";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((event, session) => {
  //     setIsAuthenticated(!!session);
  //   });
  // }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/blog-platform">
          <Routes>
            {/* <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Index />
                ) : isAuthenticated === false ? (
                  <Navigate to="/login" />
                ) : null
              }
            /> */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Index />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/all-blogs"
              element={
                isAuthenticated ? (
                  <AllBlogs />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/create"
              element={
                isAuthenticated ? (
                  <CreatePost />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/edit/:id"
              element={
                isAuthenticated ? (
                  <EditPost />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/categories"
              element={
                isAuthenticated ? (
                  <Categories />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/about"
              element={
                isAuthenticated ? (
                  <About />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/contact"
              element={
                isAuthenticated ? (
                  <Contact />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/archive"
              element={
                isAuthenticated ? (
                  <Archive />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/privacy"
              element={
                isAuthenticated ? (
                  <Privacy />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/terms"
              element={
                isAuthenticated ? (
                  <Terms />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/newsletter"
              element={
                isAuthenticated ? (
                  <Newsletter />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <Profile />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/post/:id"
              element={
                isAuthenticated ? (
                  <BlogPost />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/search"
              element={
                isAuthenticated ? (
                  <Search />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/help"
              element={
                isAuthenticated ? (
                  <Help />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/author/:id"
              element={
                isAuthenticated ? (
                  <Author />
                ) : (
                  <Navigate to="/login" />
                )
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
