import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Event {
  _id: string;
  name: string;
  date: string;
  description: string;
}

function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleRegisterClick = (eventId: string) => {
    navigate(`/register/${eventId}`);
  };

  const getRandomImage = () => {
    const images = [
      "./dist/assets/event1.jpg",
      "./dist/assets/event2.jpg",
      "./dist/assets/event3.jpg",
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-purple-900 mb-8">
          Upcoming Events
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">
                {event.name}
              </h2>
              <img
                src={getRandomImage()}
                alt={event.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <button
                onClick={() => handleRegisterClick(event._id)}
                className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
              >
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
