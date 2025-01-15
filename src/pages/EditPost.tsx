import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not found");

        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Post not found");

        setTitle(data.title);
        setExcerpt(data.excerpt);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching post");
        navigate("/");
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const { error } = await supabase
        .from("posts")
        .update({
          title,
          excerpt,
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success("Post updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Error updating post");
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl">
        <h1 className="text-3xl font-bold text-secondary mb-8">Edit Post</h1>
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
              Update Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;