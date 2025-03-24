import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  message: string;
  interest: string[];
}

interface Analytics {
  totalInquiries: number;
  groupedByInterest: { _id: string; count: number }[];
}

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    description: '',
  });
  const [eventMsg, setEventMsg] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const inquiriesResponse = await fetch('http://localhost:5000/api/admin/inquiries', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!inquiriesResponse.ok) {
          throw new Error('Failed to fetch inquiries');
        }
        const inquiriesData = await inquiriesResponse.json();
        setInquiries(inquiriesData);

        const analyticsResponse = await fetch('http://localhost:5000/api/admin/analytics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!analyticsResponse.ok) {
          throw new Error('Failed to fetch analytics');
        }
        const analyticsData = await analyticsResponse.json();
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEventMsg('');

    try {
      const response = await fetch('http://localhost:5000/api/admin/event/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (!response.ok) {
        setEventMsg(data.message || 'Failed to create event');
      } else {
        setEventMsg('Event created successfully!');
        setEventData({ name: '', date: '', description: '' });
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setEventMsg('Error creating event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Total Inquiries</h2>
              <p className="text-4xl font-bold text-purple-600">
                {analytics ? analytics.totalInquiries : 'N/A'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Inquiries by Interest</h2>
              {analytics && analytics.groupedByInterest && Array.isArray(analytics.groupedByInterest) ? (
                <ul>
                  {analytics.groupedByInterest.map((group) => (
                    <li key={group._id} className="flex justify-between py-1">
                      <span>{group._id}</span>
                      <span className="font-bold">{group.count}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Submitted Inquiries</h2>
            {inquiries && Array.isArray(inquiries) ? (
              inquiries.length === 0 ? (
                <p>No inquiries found.</p>
              ) : (
                <ul className="space-y-4">
                  {inquiries.map((inquiry) => (
                    <li
                      key={inquiry._id}
                      className="border-b pb-2 text-sm text-gray-700"
                    >
                      <p><strong>Name:</strong> {inquiry.name}</p>
                      <p><strong>Email:</strong> {inquiry.email}</p>
                      <p><strong>Message:</strong> {inquiry.message}</p>
                      <p><strong>Interest:</strong> {inquiry.interest.join(', ')}</p>
                    </li>
                  ))}
                </ul>
              )
            ) : (
              <p>Loading inquiries...</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Create New Event</h2>

            {eventMsg && (
              <div
                className={`mb-4 p-3 rounded ${
                  eventMsg.includes('success')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {eventMsg}
              </div>
            )}

            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Event Name</label>
                <input
                  type="text"
                  name="name"
                  value={eventData.name}
                  onChange={handleEventChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleEventChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={eventData.description}
                  onChange={handleEventChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 text-white font-medium rounded-md ${
                  loading ? 'bg-purple-300' : 'bg-purple-600 hover:bg-purple-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
              >
                {loading ? 'Creating Event...' : 'Create Event'}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
