import { Navigation } from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Folder } from "lucide-react";
import { BlogPost } from "@/components/BlogPost";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  created_at: string;
  likes: number;
  user_id: string;
}

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Category[];
    },
  });

  const { data: posts, isLoading: loadingPosts } = useQuery({
    queryKey: ["category-posts", selectedCategory],
    enabled: !!selectedCategory,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("category_id", selectedCategory)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Post[];
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Blog Categories
          </h1>
          
          {loadingCategories ? (
            <div className="text-center py-8">Loading categories...</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {categories?.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
                    selectedCategory === category.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Folder className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      {category.name}
                    </h2>
                  </div>
                  {category.description && (
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}

          {selectedCategory && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  Posts in {categories?.find(c => c.id === selectedCategory)?.name}
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedCategory(null)}
                >
                  View All Categories
                </Button>
              </div>

              {loadingPosts ? (
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
                    />
                  ))}
                  {posts?.length === 0 && (
                    <div className="col-span-full text-center text-gray-500">
                      No posts found in this category.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;