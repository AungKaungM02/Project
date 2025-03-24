import { useState, useEffect } from "react";

// Define the Job type for better type safety
type Job = {
  _id: string;
  title: string;
  description: string;
  location: string;
  createdAt: string;
};

function Contact() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobConfirmation, setShowJobConfirmation] = useState(false);
  const [showContactConfirmation, setShowContactConfirmation] = useState(false);

  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    message: "",
  });

  const [jobApplicationFormData, setJobApplicationFormData] = useState({
    name: "",
    email: "",
    resume: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleJobApplicationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log("Job Application Submitted:", selectedJob);

    if (selectedJob) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/jobs/${selectedJob._id}/apply`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jobId: selectedJob._id,
              ...jobApplicationFormData,
            }),
          }
        );

        if (response.ok) {
          setShowJobConfirmation(true);

          setTimeout(() => {
            setShowJobConfirmation(false);
            setSelectedJob(null);
          }, 3000);
        } else {
          console.error("Failed to submit job application");
        }
      } catch (error) {
        console.error("Error submitting job application:", error);
      }
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Contact Inquiry Submitted", contactFormData);

    try {
      const response = await fetch(
        "http://localhost:5000/api/contacts/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactFormData),
        }
      );

      if (response.ok) {
        setShowContactConfirmation(true);
        setContactFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          country: "",
          message: "",
        });

        setTimeout(() => {
          setShowContactConfirmation(false);
        }, 3000);
      } else {
        console.error("Failed to submit contact inquiry");
      }
    } catch (error) {
      console.error("Error submitting contact inquiry:", error);
    }
  };

  const handleContactFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleJobApplicationFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setJobApplicationFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-purple-900 mb-8 text-center">
          Contact Us
        </h1>

        {/* Contact Us for Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">
            Contact Us for Services
          </h2>

          {showContactConfirmation ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center transition-all duration-500">
              <div className="flex justify-center mb-4">
                <svg
                  className="h-12 w-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                Thank You
              </h2>
              <p className="text-green-700">
                Your inquiry has been received. We'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleContactSubmit}
              className="bg-white p-8 rounded-lg shadow-lg space-y-6 transition-all duration-500"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={contactFormData.name}
                  onChange={handleContactFormChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactFormData.email}
                  onChange={handleContactFormChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={contactFormData.phone}
                  onChange={handleContactFormChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={contactFormData.company}
                  onChange={handleContactFormChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={contactFormData.country}
                  onChange={handleContactFormChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={contactFormData.message}
                  onChange={handleContactFormChange}
                  required
                  rows={4}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </section>

        {/* Job Opportunities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">
            Job Opportunities
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <p className="text-gray-600 mb-4">
                    <strong>Location:</strong> {job.location}
                  </p>
                </div>
                <button
                  onClick={() => handleApplyClick(job)}
                  className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Job Application Form */}
        {selectedJob && (
          <section className="mt-8">
            <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-500">
              {showJobConfirmation ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <svg
                      className="h-12 w-12 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold text-green-800 mb-2">
                    Thank You
                  </h2>
                  <p className="text-green-700">
                    Your application for <strong>{selectedJob.title}</strong>{" "}
                    has been received. We'll contact you shortly.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-purple-900 mb-6">
                    Apply for {selectedJob.title}
                  </h2>
                  <form
                    onSubmit={handleJobApplicationSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={jobApplicationFormData.name}
                        onChange={handleJobApplicationFormChange}
                        required
                        className="w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={jobApplicationFormData.email}
                        onChange={handleJobApplicationFormChange}
                        required
                        className="w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Resume/CV *
                      </label>
                      <input
                        type="link"
                        name="resume"
                        value={jobApplicationFormData.resume}
                        onChange={handleJobApplicationFormChange}
                        required
                        className="w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Submit Application
                    </button>
                  </form>
                </>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Contact;
