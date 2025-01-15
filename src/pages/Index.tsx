// import { BlogPost } from "@/components/BlogPost";
// import { CreatePostButton } from "@/components/CreatePostButton";
// import { Button } from "@/components/ui/button";
// import { supabase } from "@/integrations/supabase/client";
// import { useQuery } from "@tanstack/react-query";
// import { LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const Index = () => {
//   const navigate = useNavigate();

//   const { data: posts, isLoading, refetch } = useQuery({
//     queryKey: ["posts"],
//     queryFn: async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) throw new Error("User not found");

//       const { data, error } = await supabase
//         .from("posts")
//         .select("*")
//         .eq('user_id', user.id)
//         .order("created_at", { ascending: false });

//       if (error) throw error;
//       return data;
//     },
//   });

//   const handleLogout = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       toast.success("Logged out successfully");
//       navigate("/login");
//     } catch (error) {
//       toast.error("Error logging out");
//     }
//   };

//   const handleDelete = async (postId: string) => {
//     try {
//       const { error } = await supabase
//         .from("posts")
//         .delete()
//         .eq('id', postId);

//       if (error) throw error;
//       toast.success("Post deleted successfully");
//       refetch();
//     } catch (error) {
//       toast.error("Error deleting post");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container py-8">
//         <div className="flex justify-between items-center mb-12">
//           <h1 className="text-4xl font-bold text-secondary">
//             Welcome to DevBlog
//           </h1>
//           <Button
//             onClick={handleLogout}
//             variant="outline"
//             className="flex items-center gap-2"
//           >
//             <LogOut className="w-4 h-4" />
//             Logout
//           </Button>
//         </div>
//         {isLoading ? (
//           <div className="text-center">Loading posts...</div>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {posts?.map((post) => (
//               <BlogPost
//                 key={post.id}
//                 id={post.id}
//                 title={post.title}
//                 excerpt={post.excerpt}
//                 author={post.author}
//                 date={new Date(post.created_at).toLocaleDateString()}
//                 likes={post.likes || 0}
//                 onDelete={() => handleDelete(post.id)}
//                 canEdit={true}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//       <CreatePostButton />
//     </div>
//   );
// };

// export default Index;


import { BlogPost } from "@/components/BlogPost";
import { CreatePostButton } from "@/components/CreatePostButton";
import { Navigation } from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const Index = () => {
  const { data: posts, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const { data, error } = await supabase
        .from("posts")
        .select("*, categories(name)")
        .eq('user_id', user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (postId: string) => {
    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq('id', postId);

      if (error) throw error;
      toast.success("Post deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Error deleting post");
    }
  };

  const featuredPosts = posts?.filter(post => post.is_featured) || [];
  const recentPosts = posts?.filter(post => !post.is_featured).slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-6">
              Featured Posts
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <BlogPost
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  date={new Date(post.created_at).toLocaleDateString()}
                  likes={post.likes || 0}
                  onDelete={() => handleDelete(post.id)}
                  canEdit={true}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-6">
            Recent Posts
          </h2>
          {isLoading ? (
            <div className="text-center">Loading posts...</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <BlogPost
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  date={new Date(post.created_at).toLocaleDateString()}
                  likes={post.likes || 0}
                  onDelete={() => handleDelete(post.id)}
                  canEdit={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <CreatePostButton />
    </div>
  );
};

export default Index;