import { Navigation } from "@/components/Navigation";
import { BlogPost as BlogPostCard } from "@/components/BlogPost";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*, categories(name)")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ["relatedPosts", post?.category_id],
    enabled: !!post?.category_id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("category_id", post.category_id)
        .neq("id", id)
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          Loading...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          Post not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600 mb-8">
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
            {post.categories?.name && (
              <>
                <span className="mx-2">•</span>
                <span>{post.categories.name}</span>
              </>
            )}
          </div>
          <div className="prose max-w-none">
            {post.content}
          </div>
        </article>

        {relatedPosts && relatedPosts.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard
                  key={relatedPost.id}
                  id={relatedPost.id}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt}
                  author={relatedPost.author}
                  date={new Date(relatedPost.created_at).toLocaleDateString()}
                  likes={relatedPost.likes || 0}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;