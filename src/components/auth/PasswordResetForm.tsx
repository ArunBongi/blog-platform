import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { validateEmail } from "../utils/auth";
import { AuthError } from "./AuthError";

interface PasswordResetFormProps {
  email: string;
  onCancel: () => void;
}

export const PasswordResetForm = ({ email, onCancel }: PasswordResetFormProps) => {
  const [isResetting, setIsResetting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setIsResetting(true);
      const redirectUrl = new URL("/reset-password", window.location.origin).toString();
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (resetError) throw resetError;
      
      alert("Password reset instructions sent to your email!");
      onCancel();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send reset instructions");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <form onSubmit={handleResetPassword} className="space-y-4">
      <AuthError message={error} />
      <Input
        type="email"
        value={email}
        disabled
        className="bg-gray-100"
      />
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={isResetting}
          className="flex-1"
        >
          {isResetting ? "Sending..." : "Send Reset Instructions"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isResetting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};