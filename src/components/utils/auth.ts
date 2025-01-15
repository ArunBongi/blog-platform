import { AuthError, AuthApiError } from "@supabase/supabase-js";

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 6;
};

export const getErrorMessage = (error: AuthError) => {
  if (error instanceof AuthApiError) {
    switch (error.status) {
      case 400:
        if (error.message.includes("Invalid login credentials")) {
          return "Invalid email or password. Please check your credentials and try again.";
        }
        break;
      case 422:
        return "Invalid email format. Please enter a valid email address.";
      case 429:
        return "Too many login attempts. Please try again later.";
      default:
        return error.message;
    }
  }
  return "An unexpected error occurred. Please try again.";
};