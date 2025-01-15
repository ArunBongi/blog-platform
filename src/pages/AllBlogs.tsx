import { BlogPost } from "@/components/BlogPost";
import { Navigation } from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const AllBlogs = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["all-posts"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const { data, error } = await supabase
        .from("posts")
        .select("*, categories(name)")
        .neq('user_id', user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Community Posts</h1>
        
        {isLoading ? (
          <div className="text-center">Loading posts...</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts?.map((post) => (
              <BlogPost
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                date={new Date(post.created_at).toLocaleDateString()}
                likes={post.likes || 0}
                canEdit={false}
              />
            ))}
            {posts?.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No posts found from other users.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;