import { Navigation } from "@/components/Navigation";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using this platform, you agree to be bound by these Terms of Service
              and all applicable laws and regulations.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">
              You are responsible for maintaining the confidentiality of your account and
              for all activities that occur under your account.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Content Guidelines</h2>
            <p className="text-gray-600 mb-4">
              Users must not post content that is illegal, offensive, or violates the rights
              of others. We reserve the right to remove any content that violates these terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;