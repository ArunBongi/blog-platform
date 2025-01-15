import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-secondary">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Please sign in to your account</p>
        </div>

        {isResetting ? (
          <PasswordResetForm
            email={email}
            onCancel={() => setIsResetting(false)}
          />
        ) : (
          <LoginForm
            email={email}
            setEmail={setEmail}
            onResetPassword={() => setIsResetting(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Login;