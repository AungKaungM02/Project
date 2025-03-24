import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-[#4B0082] text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="h-8 w-8" />
          <span className="text-xl font-bold">AI-Solutions</span>
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-purple-300">HOME</Link>
          <Link to="/about" className="hover:text-purple-300">ABOUT US</Link>
          <Link to="/demo" className="hover:text-purple-300">SCHEDULED DEMO</Link>
          <Link to="/events" className="hover:text-purple-300">JOIN OUR EVENTS</Link>
          <Link to="/contact" className="hover:text-purple-300">CONTACT US AND SERVICES</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;