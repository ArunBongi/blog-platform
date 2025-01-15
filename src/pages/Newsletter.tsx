import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);

      if (error) throw error;

      toast.success("Successfully subscribed to the newsletter!");
      setEmail("");
    } catch (error) {
      toast.error("Error subscribing to newsletter");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Newsletter Signup</h1>
          <p className="text-gray-600 mb-8">
            Stay updated with our latest blog posts, news, and updates delivered directly
            to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your.email@example.com"
                className="w-full"
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;