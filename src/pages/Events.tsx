import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

function Events() {
  const navigate = useNavigate();

  const handleRegisterClick = (eventId: string) => {
    navigate(`/register/${eventId}`); // Navigate to the registration page with event ID
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-purple-900 mb-8">Upcoming Events</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Event 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">AI Innovation Summit 2025</h2>
            <img src="./dist/assets/event1.jpg" alt="Solution Architects" className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-gray-600 mb-4">April 10-12, 2025</p>
            <p className="text-gray-700 mb-4">
              Join us at the AI Innovation Summit 2025, where industry leaders and experts will explore the latest trends and advancements in artificial intelligence. Discover how AI is transforming the digital employee experience, accelerating innovation, and driving business success. This event is a must-attend for professionals looking to stay ahead in the rapidly evolving world of AI.
            </p>
            <button
              onClick={() => handleRegisterClick('ai-innovation-summit-2025')}
              className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
            >
              Register Now
            </button>
          </div>

          {/* Event 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Hands-On AI Workshop</h2>
            <img src="./dist/assets/event2.jpg" alt="Solution Architects" className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-gray-600 mb-4">April 20, 2025</p>
            <p className="text-gray-700 mb-4">
              Participate in our Hands-On AI Workshop and gain practical experience with cutting-edge AI tools and techniques. Learn how to implement AI-powered virtual assistants and prototyping solutions to streamline workflows and enhance productivity. Perfect for businesses and professionals seeking to harness the power of AI for real-world applications.
            </p>
            <button
              onClick={() => handleRegisterClick('hands-on-ai-workshop')}
              className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
            >
              Register Now
            </button>
          </div>

          {/* Event 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Future of Work: AI in Action</h2>
            <img src="./dist/assets/event3.jpg" alt="Solution Architects" className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-gray-600 mb-4">June 10, 2025</p>
            <p className="text-gray-700 mb-4">
              Explore the future of work with our ‘AI in Action’ event, showcasing how AI-powered solutions are revolutionizing industries. From virtual assistants to rapid prototyping, discover how AI-Solutions is empowering businesses to innovate, automate, and elevate their operations. Don’t miss this opportunity to see AI in action and learn how it can benefit your organization.
            </p>
            <button
              onClick={() => handleRegisterClick('future-of-work-ai-in-action')}
              className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;