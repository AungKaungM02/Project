import { useState } from 'react';

// Define the Job type for better type safety
type Job = {
  id: number;
  title: string;
  description: string;
  requirements: string[];
  location: string;
};

function Contact() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobConfirmation, setShowJobConfirmation] = useState(false);
  const [showContactConfirmation, setShowContactConfirmation] = useState(false);

  const jobs: Job[] = [
    {
      id: 1,
      title: 'AI Engineer',
      description: 'Develop and implement AI models to solve complex business problems.',
      requirements: ['Bachelor’s degree in Computer Science', '2+ years of experience in AI/ML'],
      location: 'Remote',
    },
    {
      id: 2,
      title: 'Data Scientist',
      description: 'Analyze large datasets to provide actionable insights.',
      requirements: ['Master’s degree in Data Science', 'Experience with Python and SQL'],
      location: 'On-site',
    },
  ];

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handleJobApplicationSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Job Application Submitted:', selectedJob);

    setShowJobConfirmation(true);

    setTimeout(() => {
      setShowJobConfirmation(false);
      setSelectedJob(null);
    }, 3000);
  };

  const handleContactSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Contact Inquiry Submitted');

    setShowContactConfirmation(true);

    setTimeout(() => {
      setShowContactConfirmation(false);
    }, 3000);
  };

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-purple-900 mb-8 text-center">Contact Us</h1>

        {/* Contact Us for Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">Contact Us for Services</h2>

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
              <h2 className="text-2xl font-semibold text-green-800 mb-2">Thank You</h2>
              <p className="text-green-700">
                Your inquiry has been received. We'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleContactSubmit}
              className="bg-white p-8 rounded-lg shadow-lg space-y-6 transition-all duration-500"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus: focus: ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus: focus: ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full rounded-md border-gray-300 shadow-sm focus: focus: ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus: focus: ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm focus: focus: ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full rounded-md border-gray-300 shadow-sm focus: focus: ring-purple-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover: transition-colors"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </section>

        {/* Job Opportunities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-purple-900 mb-6">Job Opportunities</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <ul className="list-disc list-inside text-gray-700 mb-4">
                    {job.requirements.map((req, index) => (
                      <li key={index}> {req} </li>
                    ))}
                  </ul>
                  <p className="text-gray-600 mb-4">
                    <strong>Location:</strong> {job.location}
                  </p>
                </div>
                <button
                  onClick={() => handleApplyClick(job)}
                  className="bg-purple-600 text-white py-2 px-4 rounded hover: transition-colors"
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
                  <h2 className="text-2xl font-semibold text-green-800 mb-2">Thank You</h2>
                  <p className="text-green-700">
                    Your application for <strong>{selectedJob.title}</strong> has been received. We'll contact you shortly.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-purple-900 mb-4">
                    Apply for {selectedJob.title}
                  </h2>
                  <form onSubmit={handleJobApplicationSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full rounded-md border-gray-300 shadow-sm focus: focus: ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        className="w-full rounded-md border-gray-300 shadow-sm focus: focus: ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Resume/CV *
                      </label>
                      <input
                        type="file"
                        required
                        className="w-full rounded-md border-gray-300 shadow-sm focus: focus: ring-purple-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white py-3 px-4 rounded-md hover: bg-purple-700 transition-colors"
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