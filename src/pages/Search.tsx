import { Navigation } from "@/components/Navigation";
import { BlogPost } from "@/components/BlogPost";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["search", searchTerm],
    enabled: searchTerm.length > 2,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <Input
            type="search"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {searchTerm.length > 2 && (
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <p>Searching...</p>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6">
                  {posts?.length || 0} results found
                </h2>
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
        )}
      </div>
    </div>
  );
};

export default Search;