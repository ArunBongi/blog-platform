import { Navigation } from "@/components/Navigation";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly to us when you create an account,
              post content, or interact with other users' content.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to provide, maintain, and improve our services,
              and to communicate with you about your account and updates to our platform.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not share your personal information with third parties except as described
              in this privacy policy or with your consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;