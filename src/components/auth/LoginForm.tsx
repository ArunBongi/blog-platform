import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { validateEmail, validatePassword, getErrorMessage } from "../utils/auth";
import { AuthError } from "./AuthError";

interface LoginFormProps {
  onResetPassword: () => void;
  email: string;
  setEmail: (email: string) => void;
}

export const LoginForm = ({ onResetPassword, email, setEmail }: LoginFormProps) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(getErrorMessage(signInError));
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AuthError message={error} />
      
      <div className="space-y-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          placeholder="Email"
          required
          aria-invalid={error ? "true" : "false"}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
          placeholder="Password"
          required
          aria-invalid={error ? "true" : "false"}
          disabled={isLoading}
        />
      </div>

      <Button
        type="button"
        variant="link"
        onClick={onResetPassword}
        disabled={isLoading}
        className="px-0"
      >
        Forgot password?
      </Button>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};