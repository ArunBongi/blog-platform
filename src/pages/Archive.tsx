import { Navigation } from "@/components/Navigation";
import { BlogPost } from "@/components/BlogPost";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  created_at: string;
  likes: number;
}

const Archive = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["archived-posts"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq('user_id', user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Post[];
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Archive</h1>
        
        {isLoading ? (
          <div className="text-center">Loading archived posts...</div>
        ) : (
          <div className="space-y-6">
            {posts?.map((post) => (
              <BlogPost
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                author={post.author}
                date={new Date(post.created_at).toLocaleDateString()}
                likes={post.likes || 0}
                canEdit={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;