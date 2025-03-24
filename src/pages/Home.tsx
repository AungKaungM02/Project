import { Brain, Notebook as Robot, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <div 
        className="relative h-[500px] bg-gradient-to-br from-purple-900 via-purple-600 to-blue-500 flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('../dist/assets/bg.jpg')`,
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center px-4">
          <h1 className="text-5xl font-bold mb-4">
            Innovating the Future of the Digital Employee Experience 
          </h1>
          <p className="text-xl mb-8">
            Empower your workforce with AI-driven solutions.
          </p>
          <Link
            to="/demo"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            Schedule Your Demo Now
          </Link>
        </div>
      </div>

      {/* Event Section */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="../dist/assets/event.jpg" 
              
              alt="AI Summit"
              className="rounded-lg shadow-xl" style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-purple-900">
              AI Innovite Summit 2025
            </h2>
            <p className="text-lg text-gray-700">
              Join us at the AI Innovation Summit 2025, where industry leaders and experts will explore the latest trends and advancements in artificial intelligence. Discover how AI is shaping the future of business and technology.
            </p>
            <Link
              to="/events"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Learn More About Our Events
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-lg">
              <Brain className="w-12 h-12 text-purple-300 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Virtual Assistant</h3>
              <p>
                Enhance productivity and streamline operations with our AI-powered virtual assistant. Designed to respond to user inquiries in real-time.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-lg">
              <Robot className="w-12 h-12 text-purple-300 mb-4" />
              <h3 className="text-xl font-semibold mb-4">AI Prototyping</h3>
              <p>
                Accelerate innovation with our affordable AI-based prototyping solutions. From concept to reality, our tools enable rapid development.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-lg">
              <LineChart className="w-12 h-12 text-purple-300 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Advanced Analytics</h3>
              <p>
                Unlock the power of your data with our advanced analytics tools. Gain actionable insights into customer behavior and business performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home