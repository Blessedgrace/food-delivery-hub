import React, { useState } from 'react';
import { Calendar, Users, FileText, Send, CheckCircle2 } from 'lucide-react';

const Catering: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    eventType: 'Birthday',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to backend or email
    console.log("Catering Request:", formData);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} className="text-brand-green" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Request Received!</h2>
        <p className="text-gray-600 max-w-md mb-8">
          Thank you for choosing Anna Cakes for your event. We will review your requirements and contact you within 24 hours with a quote.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-brand-yellow text-brand-green font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-400"
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 pb-20 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-brand-green mb-4">Catering & Events</h1>
        <p className="text-gray-600 text-lg">
          Planning a wedding, birthday, or corporate event? Let Anna Cakes handle the treats. 
          From custom cakes to large food trays, we've got you covered.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Visual Side */}
        <div className="md:w-1/3 bg-brand-green text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Why choose us?</h3>
            <ul className="space-y-4 text-green-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-brand-yellow" /> Fresh, premium ingredients
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-brand-yellow" /> Custom cake designs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-brand-yellow" /> Reliable delivery
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-brand-yellow" /> Bulk discounts
              </li>
            </ul>
          </div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-yellow rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Form Side */}
        <div className="md:w-2/3 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-green"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-green"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Event Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input 
                    required
                    type="date" 
                    className="w-full pl-10 p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-green"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Est. Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input 
                    required
                    type="number" 
                    placeholder="e.g. 50"
                    className="w-full pl-10 p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-green"
                    value={formData.guests}
                    onChange={e => setFormData({...formData, guests: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Event Type</label>
              <select 
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-green"
                value={formData.eventType}
                onChange={e => setFormData({...formData, eventType: e.target.value})}
              >
                <option>Birthday Party</option>
                <option>Wedding</option>
                <option>Corporate Event</option>
                <option>Naming Ceremony</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tell us what you need</label>
              <textarea 
                rows={4}
                placeholder="Describe your cake idea, food tray requirements, or any allergies..."
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-green"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              Submit Request <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Catering;