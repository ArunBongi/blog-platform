import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const CreatePostButton = () => {
  return (
    <Link
      to="/create"
      className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
    >
      <Plus className="w-6 h-6" />
    </Link>
  );
};