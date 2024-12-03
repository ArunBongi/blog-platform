import { Heart, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  likes: number;
  onDelete?: (id: string) => void;
  canEdit?: boolean;
}

export const BlogPost = ({ 
  id, 
  title, 
  excerpt, 
  author, 
  date, 
  likes: initialLikes,
  onDelete,
  canEdit 
}: BlogPostProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in">
      <Link to={`/post/${id}`}>
        <h2 className="text-2xl font-bold mb-2 text-secondary hover:text-primary transition-colors">
          {title}
        </h2>
      </Link>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <span>{author}</span>
          <span className="mx-2">·</span>
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          {canEdit && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/edit/${id}`)}
                className="h-8 w-8"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete?.(id)}
                className="h-8 w-8 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
          <button 
            onClick={handleLike}
            className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-primary text-primary' : ''}`} />
            <span>{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};