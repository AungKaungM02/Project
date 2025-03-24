import React, { useState } from 'react';
import { Calendar, Clock, Check } from 'lucide-react';

function Demo() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    interests: [] as string[],
    date: '',
    time: ''
  });

  const interestAreas = [
    'AI-Powered Virtual Assistant',
    'Prototyping Solutions',
    'Advanced Analytics',
    'Process Automation',
    'Machine Learning Integration',
    'Custom AI Development'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setShowConfirmation(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        interests: [],
        date: '',
        time: ''
      });
    }, 3000);
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-purple-900 mb-8">Schedule a Demo</h1>
          
          {showConfirmation ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Check className="h-12 w-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold text-green-800 mb-2">Thank You!</h2>
              <p className="text-green-700">
                Your demo request has been received. We'll send you a confirmation email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Areas of Interest */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Areas of Interest *
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {interestAreas.map((interest) => (
                    <div key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor={interest} className="ml-2 text-sm text-gray-700">
                        {interest}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date and Time Selection */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Preferred Date *
                    </div>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Preferred Time *
                    </div>
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                Schedule Demo
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Demo;