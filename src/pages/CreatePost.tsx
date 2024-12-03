import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to create a post");
        return;
      }

      const { error } = await supabase.from("posts").insert({
        title,
        excerpt,
        author: user.email || "Anonymous",
        user_id: user.id
      });

      if (error) throw error;

      toast.success("Post created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create post");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl">
        <h1 className="text-3xl font-bold text-secondary mb-8">Create New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1"
              placeholder="Enter post title"
            />
          </div>
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary"
              rows={4}
              placeholder="Write your post content..."
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button type="submit">
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;