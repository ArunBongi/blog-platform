import { Navigation } from "@/components/Navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Help = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Help Center</h1>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create a blog post?</AccordionTrigger>
              <AccordionContent>
                To create a blog post, click on the "+" button in the bottom right corner
                of any page. Fill in the required fields including title, excerpt, and
                content. You can also select a category for your post.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How do I edit my profile?</AccordionTrigger>
              <AccordionContent>
                Navigate to your profile page by clicking on your username in the
                navigation bar. Click the "Edit Profile" button to update your
                information.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How do likes work?</AccordionTrigger>
              <AccordionContent>
                You can like any blog post by clicking the heart icon. The like count
                updates in real-time. You can also unlike a post by clicking the icon
                again.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How do I search for posts?</AccordionTrigger>
              <AccordionContent>
                Use the search page to find posts by title or content. You can also
                browse posts by category using the Categories page in the navigation
                menu.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="text-gray-600">
              If you can't find the answer you're looking for, please visit our{" "}
              <a href="/contact" className="text-primary hover:underline">
                Contact page
              </a>{" "}
              to get in touch with our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;