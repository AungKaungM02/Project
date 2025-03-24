import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#1a0033] text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-4">
            <Link to="/privacy" className="hover:text-purple-300">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-purple-300">Terms of Service</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-purple-300">Contact Us</Link>
            <span>•</span>
            <Link to="/admin" className="hover:text-purple-300">Admin</Link>
          </div>
          <div className="flex justify-center space-x-4">
            <a href="https://linkedin.com" className="hover:text-purple-300">LinkedIn</a>
            <span>•</span>
            <a href="https://twitter.com" className="hover:text-purple-300">Twitter</a>
            <span>•</span>
            <a href="https://facebook.com" className="hover:text-purple-300">Facebook</a>
            <span>•</span>
            <a href="https://instagram.com" className="hover:text-purple-300">Instagram</a>
          </div>
          <p>© 2025 AI-Solutions.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;