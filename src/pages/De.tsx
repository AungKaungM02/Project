import React, { useState, useEffect } from "react";
import axios from "axios";

const De: React.FC = () => {
  // State for managing data and UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState("demo");
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  // Data states
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [inquiryData, setInquiryData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [jobApplicationData, setJobApplicationData] = useState([]);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("adminToken");
        console.log("token", token);
        const headers = { Authorization: `Bearer ${token}` };

        const [analytics, inquiries, events, contacts, jobApplications] =
          await Promise.all([
            fetch("http://localhost:5000/api/admin/analytics", {
              headers,
            }).then((res) => res.json()),
            fetch("http://localhost:5000/api/admin/inquiries", {
              headers,
            }).then((res) => res.json()),
            fetch("http://localhost:5000/api/admin/events/registrations", {
              headers,
            }).then((res) => res.json()),
            fetch("http://localhost:5000/api/admin/contacts", { headers }).then(
              (res) => res.json()
            ),
            fetch("http://localhost:5000/api/admin/jobs/applications", {
              headers,
            }).then((res) => res.json()),
          ]);

        setAnalyticsData(analytics);
        setInquiryData(inquiries);
        setEventData(events);
        setContactData(contacts);
        setJobApplicationData(jobApplications);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Handle form submissions
  const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post(
        "/api/admin/event/create",
        {
          name: formData.get("name"),
          date: formData.get("date"),
          description: formData.get("description"),
        },
        { headers }
      );

      // Refresh event data
      const { data } = await axios.get("/api/events", { headers });
      setEventData(data);

      setIsEventModalOpen(false);
      alert("Event created successfully!");
    } catch (err) {
      alert("Failed to create event. Please try again.");
    }
  };

  const handleJobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post(
        "/api/admin/jobs/create",
        {
          title: formData.get("title"),
          location: formData.get("location"),
          description: formData.get("description"),
        },
        { headers }
      );

      // Refresh job data
      const { data } = await axios.get("/api/admin/jobs/applications", {
        headers,
      });
      setJobApplicationData(data);

      setIsJobModalOpen(false);
      alert("Job opportunity created successfully!");
    } catch (err) {
      alert("Failed to create job opportunity. Please try again.");
    }
  };

  // Define sections for tab navigation
  const sections = [
    { id: "demo", title: "Schedule Demo" },
    { id: "event", title: "Event Registration" },
    { id: "contact", title: "Contact Us" },
    { id: "job", title: "Job Opportunity" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading dashboard data...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Top Analysis and Buttons Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Overall Analysis */}
        <div className="bg-white p-4 rounded-lg shadow border border-purple-300 flex-1">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">
            Overall Analysis
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Total Scheduled Demos:</strong>{" "}
              {analyticsData?.overallAnalysis?.totalScheduledDemos || 0}
            </li>
            <li>
              <strong>Total Event Registrations:</strong>{" "}
              {analyticsData?.overallAnalysis?.totalEventRegistrations || 0}
            </li>
            <li>
              <strong>AI Conference Registrations:</strong>{" "}
              {analyticsData?.overallAnalysis?.aiConferenceRegistrations || 0}
            </li>
            <li>
              <strong>Total Contact Inquiries:</strong>{" "}
              {analyticsData?.overallAnalysis?.totalContactInquiries || 0}
            </li>
            <li>
              <strong>Total Job Applicants:</strong>{" "}
              {analyticsData?.overallAnalysis?.totalJobApplicants || 0}
            </li>
            <li>
              <strong>Total User Interests (Interactions):</strong>{" "}
              {analyticsData?.overallAnalysis?.totalUserInterests || 0}
            </li>
            <li>
              <strong>Countries Users Are From:</strong>{" "}
              {analyticsData?.overallAnalysis?.countriesUsersAreFrom?.join(
                ", "
              ) || "None"}
            </li>
          </ul>

          {/* AI Topics Interest */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">
              AI Topics Interest
            </h3>
            <ul className="space-y-1 text-gray-700">
              {analyticsData?.aiTopicsInterest?.map((topic: any) => (
                <li key={topic._id}>
                  <strong>{topic._id}:</strong> {topic.interestedUsers}{" "}
                  interested users
                </li>
              )) || <li>No data available</li>}
            </ul>
          </div>
        </div>

        {/* Create Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setIsEventModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow transition transform hover:scale-105"
          >
            + Create New Event
          </button>
          <button
            onClick={() => setIsJobModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 text-sm rounded-lg shadow transition transform hover:scale-105"
          >
            + Create New Job Opportunity
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-4 mb-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`px-4 py-2 ${
                selectedSection === section.id
                  ? "bg-purple-100 border-b-2 border-purple-500"
                  : ""
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Selected Section Content */}
        <div className="bg-white p-4 rounded-lg shadow">
          {selectedSection === "demo" && (
            <ul className="space-y-2">
              {inquiryData.length > 0 ? (
                inquiryData.slice(0, 5).map((item: any, index) => (
                  <li key={index} className="border-b pb-2">
                    <p>
                      <strong>Name:</strong> {item.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {item.email}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(item.preferredDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time:</strong> {item.preferredTime}
                    </p>
                    <p>
                      <strong>Company Name:</strong> {item.company}
                    </p>
                    <p>
                      <strong>Country:</strong> {item.country}
                    </p>
                    <p>
                      <strong>Interests:</strong> {item.interest.join(", ")}
                    </p>
                  </li>
                ))
              ) : (
                <p>No demo requests available</p>
              )}
            </ul>
          )}
          {selectedSection === "event" && (
            <ul className="space-y-2">
              {eventData.length > 0 ? (
                eventData.slice(0, 5).map((item: any, index) => (
                  <li key={index} className="border-b pb-2">
                    <p>
                      <strong>Name:</strong> {item.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {item.email}
                    </p>
                    <p>
                      <strong>Event:</strong>{" "}
                      {item.eventId && typeof item.eventId === "object"
                        ? item.eventId.name
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Company Name:</strong> {item.company}
                    </p>
                    <p>
                      <strong>Country:</strong> {item.country}
                    </p>
                  </li>
                ))
              ) : (
                <p>No event registrations available</p>
              )}
            </ul>
          )}
          {selectedSection === "contact" && (
            <ul className="space-y-2">
              {contactData.length > 0 ? (
                contactData.slice(0, 5).map((item: any, index) => (
                  <li key={index} className="border-b pb-2">
                    <p>
                      <strong>Name:</strong> {item.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {item.email}
                    </p>
                    <p>
                      <strong>Message:</strong> {item.message}
                    </p>
                    <p>
                      <strong>Phone Number:</strong> {item.phone}
                    </p>
                    <p>
                      <strong>Company Name:</strong> {item.company}
                    </p>
                    <p>
                      <strong>Country:</strong> {item.country}
                    </p>
                  </li>
                ))
              ) : (
                <p>No contact inquiries available</p>
              )}
            </ul>
          )}
          {selectedSection === "job" && (
            <ul className="space-y-2">
              {jobApplicationData.length > 0 ? (
                jobApplicationData.slice(0, 5).map((item: any, index) => (
                  <li key={index} className="border-b pb-2">
                    <p>
                      <strong>Name:</strong> {item.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {item.email}
                    </p>
                    <p>
                      <strong>Position:</strong>{" "}
                      {item.jobId && typeof item.jobId === "object"
                        ? item.jobId.title
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Resume:</strong> {item.resume}
                    </p>
                  </li>
                ))
              ) : (
                <p>No job applications available</p>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Event Creation Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Create New Event</h2>
            <form onSubmit={handleEventSubmit}>
              <label className="block mb-2">
                Name:
                <input
                  name="name"
                  type="text"
                  className="border p-2 w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Date:
                <input
                  name="date"
                  type="date"
                  className="border p-2 w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Description:
                <textarea
                  name="description"
                  className="border p-2 w-full"
                  required
                ></textarea>
              </label>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="bg-gray-300 px-3 py-1 text-sm rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-3 py-1 text-sm rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Job Opportunity Creation Modal */}
      {isJobModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">
              Create New Job Opportunity
            </h2>
            <form onSubmit={handleJobSubmit}>
              <label className="block mb-2">
                Title:
                <input
                  name="title"
                  type="text"
                  className="border p-2 w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Location:
                <input
                  name="location"
                  type="text"
                  className="border p-2 w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Description:
                <textarea
                  name="description"
                  className="border p-2 w-full"
                  placeholder="Example: Develop and implement AI models to solve complex business problems. Bachelor's degree in Computer Science. 2+ years of experience in AI/ML. Location: Remote."
                  required
                />
              </label>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="bg-gray-300 px-3 py-1 text-sm rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-3 py-1 text-sm rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default De;
