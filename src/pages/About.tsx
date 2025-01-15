import { Navigation } from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About DevBlog</h1>
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">
              Welcome to DevBlog, a platform dedicated to sharing knowledge and experiences in the world of software development. Our mission is to create a space where developers can learn from each other and grow together.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We believe in the power of shared knowledge and continuous learning. Through our platform, we aim to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Foster a community of passionate developers</li>
              <li>Share practical insights and real-world experiences</li>
              <li>Promote best practices and innovative solutions</li>
              <li>Support both beginners and experienced developers</li>
            </ul>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Community</h2>
            <p className="text-gray-600">
              Whether you're a seasoned developer or just starting your journey, we welcome you to join our community. Share your knowledge, learn from others, and be part of our growing network of developers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;