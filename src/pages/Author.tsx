import { Navigation } from "@/components/Navigation";
import { BlogPost } from "@/components/BlogPost";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Author = () => {
  const { id } = useParams();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["authorPosts", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <p>Loading author's posts...</p>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-8">
                Posts by {posts?.[0]?.author || "Author"}
              </h1>
              <div className="grid gap-6">
                {posts?.map((post) => (
                  <BlogPost
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    author={post.author}
                    date={new Date(post.created_at).toLocaleDateString()}
                    likes={post.likes || 0}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Author;