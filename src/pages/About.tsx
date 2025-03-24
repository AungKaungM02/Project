import { Brain, Users, Target, Rocket } from 'lucide-react';

function About() {
  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4">
        {/* Main Introduction */}
        <h1 className="text-4xl font-bold text-purple-900 mb-8">About AI-Solutions</h1>
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-gray-700 mb-6">
          Innovating the Future of Work with AI
          </p>
          <p className="text-gray-700 mb-6">
          At AI-Solutions, we are passionate about transforming the digital employee experience through cutting-edge artificial intelligence. Based in Sunderland, we specialize in delivering innovative software solutions that empower businesses to address challenges proactively, accelerate innovation, and enhance productivity.
          </p>
          <p className="text-gray-700 mb-6">
          Our mission is simple yet powerful: to innovate, promote, and deliver the future of work. By leveraging AI-powered virtual assistants and affordable prototyping solutions, we help businesses streamline operations, improve decision-making, and stay ahead in today’s fast-paced digital landscape.
          </p>
        </div>

        {/* Our Expertise Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-purple-900">Our Expertise</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">AI-Powered Virtual Assistants</h3>
              <p className="text-gray-600">Our intelligent virtual assistants are designed to respond to user inquiries in real-time, providing instant support and improving the digital employee experience. Whether it’s answering questions, automating tasks, or offering insights, our AI solutions are built to enhance efficiency and productivity.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Rapid Prototyping Solutions</h3>
              <p className="text-gray-600">Innovation starts with an idea, and we help bring those ideas to life. Our affordable prototyping solutions enable businesses to design, test, and refine new concepts quickly, reducing time-to-market and driving innovation.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Data-Driven Insights</h3>
              <p className="text-gray-600">We believe in the power of data. Our advanced analytics tools provide actionable insights into customer behavior, operational efficiency, and business performance, helping organizations make smarter decisions and achieve their goals.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Custom AI Solutions</h3>
              <p className="text-gray-600">Every business is unique, and so are its challenges. Our custom AI solutions are tailored to meet your specific needs, whether it’s automating workflows, optimizing processes, or enhancing customer engagement. Let us build a solution that works for you.</p>
            </div>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-purple-900">Our Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img src="./dist/assets/team1.webp" alt="Data Scientists" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-purple-800">John Doe, CEO
              </h3>
              <p className="text-gray-600">With over 15 years of experience in AI and software development, John leads our team with a vision to revolutionize the digital workplace.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img src="./dist/assets/team2.webp" alt="AI Engineers" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-purple-800">Jane Smith, Head of Product Development</h3>
              <p className="text-gray-600">Jane is the driving force behind our innovative solutions, ensuring that every product meets the highest standards of quality and usability.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img src="./dist/assets/team3.webp" alt="Solution Architects" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-purple-800">Alex Brown, Lead Data Scientist</h3>
              <p className="text-gray-600">Alex specializes in turning complex data into actionable insights, helping businesses unlock the full potential of their data.</p>
            </div>
          </div>
        </div>

        {/* Why Choose AI-Solutions Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-purple-900">Why Choose AI-Solutions?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Global Impact, Local Expertise</h3>
              <p className="text-gray-600">While we aim to make a worldwide impact, our roots in Sunderland keep us grounded and connected to the needs of businesses in our community and beyond.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Customer-Centric Approach</h3>
              <p className="text-gray-600">We work closely with our clients to understand their unique challenges and deliver tailored solutions that drive real results.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Commitment to Innovation</h3>
              <p className="text-gray-600">Innovation is at the core of everything we do. We continuously explore new technologies and methodologies to stay ahead of the curve and deliver cutting-edge solutions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">Scalable Solutions</h3>
              <p className="text-gray-600">Our solutions grow with your business, ensuring long-term success.</p>
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="bg-purple-900 text-white p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Rocket className="w-8 h-8" />
            <h2 className="text-3xl font-bold">Join Us on Our Journey</h2>
          </div>
          <p className="text-lg mb-6">
            Be part of the AI-solutions. We're always looking for talented individuals and innovative organizations to collaborate with. Together, we can shape the future of AI technology and create solutions that make a real difference.
          </p>
          <div className="flex gap-4">
            <a href="/contact" className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-purple-100 transition-colors">
              Partner With Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;