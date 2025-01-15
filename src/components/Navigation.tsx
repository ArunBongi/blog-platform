import { Button } from "@/components/ui/button";
import { LogOut, Menu, Search, User, HelpCircle, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

export const Navigation = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            DevBlog
          </Link>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:text-primary"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/all-blogs" className="text-gray-600 hover:text-primary">
              Community
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-primary">
              Categories
            </Link>
            <Link to="/newsletter" className="text-gray-600 hover:text-primary">
              Newsletter
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary">
              Contact
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/search">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/help">
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              to="/all-blogs"
              className="block text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              to="/categories"
              className="block text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/newsletter"
              className="block text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Newsletter
            </Link>
            <Link
              to="/about"
              className="block text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/search"
              className="block text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Search
            </Link>
            <Link
              to="/help"
              className="block text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>
            <Link
              to="/profile"
              className="block text-gray-600 hover:text-primary py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};