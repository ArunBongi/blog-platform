import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Heart, HeartOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const checkUserLike = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("post_likes")
        .select()
        .eq("post_id", postId)
        .eq("user_id", user.id);

      setHasLiked(!!data && data.length > 0);
    };

    checkUserLike();

    // Subscribe to changes in posts table for like count updates
    const postsChannel = supabase
      .channel(`posts_likes_${postId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts',
          filter: `id=eq.${postId}`
        },
        (payload: any) => {
          if (payload.new && typeof payload.new.likes === 'number') {
            setLikes(payload.new.likes);
          }
        }
      )
      .subscribe();

    // Subscribe to changes in post_likes table for current user's like status
    const likesChannel = supabase
      .channel(`user_likes_${postId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'post_likes',
          filter: `post_id=eq.${postId}`
        },
        async () => {
          checkUserLike();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postsChannel);
      supabase.removeChannel(likesChannel);
    };
  }, [postId]);

  const handleLike = async () => {
    try {
      setIsLiking(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to like posts");
        return;
      }

      // Optimistically update the UI
      const newLikes = hasLiked ? Math.max(0, likes - 1) : likes + 1;
      setLikes(newLikes);
      setHasLiked(!hasLiked);

      if (hasLiked) {
        // Unlike the post
        const { error: deleteError } = await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);

        if (deleteError) throw deleteError;

        // Update the posts table with the new like count
        const { error: updateError } = await supabase
          .from("posts")
          .update({ likes: Math.max(0, likes - 1) })
          .eq("id", postId);

        if (updateError) throw updateError;
        
        toast.success("Post unliked!");
      } else {
        // Like the post
        const { error: insertError } = await supabase
          .from("post_likes")
          .insert({ post_id: postId, user_id: user.id });

        if (insertError) throw insertError;

        // Update the posts table with the new like count
        const { error: updateError } = await supabase
          .from("posts")
          .update({ likes: likes + 1 })
          .eq("id", postId);

        if (updateError) throw updateError;
        
        toast.success("Post liked!");
      }
    } catch (error) {
      // Revert optimistic update on error
      setLikes(likes);
      setHasLiked(hasLiked);
      console.error("Error updating like:", error);
      toast.error("Unable to update like. Please try again later.");
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Button 
      variant={hasLiked ? "default" : "outline"}
      onClick={handleLike}
      disabled={isLiking}
      className="transition-all duration-200 hover:scale-105"
    >
      {hasLiked ? (
        <Heart className="mr-2 h-4 w-4 fill-current" />
      ) : (
        <HeartOff className="mr-2 h-4 w-4" />
      )}
      {likes} {likes === 1 ? 'Like' : 'Likes'}
    </Button>
  );
}