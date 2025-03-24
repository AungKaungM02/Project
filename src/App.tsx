import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About.tsx';
import Demo from './pages/Demo.tsx';
import Events from './pages/Events.tsx';
import EventRegistration from './pages/EventRegistration.tsx';
import Contact from './pages/Contact.tsx';
import AdminLogin from './pages/AdminLogin.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/events" element={<Events />} />
          <Route path="/register/:eventId" element={<EventRegistration />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Login Route */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* ✅ Protected Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
