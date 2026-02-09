import { useState } from 'react';
import { sendContactMessage } from '../services/contact';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    if (name === 'email') {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(value)) error = "Please enter a valid email address.";
    }
    if (name === 'message' && value.length < 10) {
      error = "Message must be at least 10 characters long.";
    }
    if (name === 'firstName' && value.trim() === "") {
      error = "First name is required.";
    }
    if (name === 'lastName' && value.trim() === "") {
      error = "Last name is required.";
    }
    if (name === 'subject' && value.trim() === "") {
      error = "Subject is required.";
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const fieldError = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentErrors = {};
    Object.keys(formData).forEach(key => {
      const err = validateField(key, formData[key]);
      if (err) currentErrors[key] = err;
    });

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setStatus('loading');
    try {
      await sendContactMessage(formData);
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error("API Error:", error);
      setStatus('error');
    }
  };


  return (
    <section className="bg-zinc-900 py-20 text-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>

        {status === 'success' && (
          <div className="bg-green-500/20 text-green-400 p-4 rounded-xl mb-6">Message sent successfully!</div>
        )}
        {status === 'error' && (
          <div className="bg-red-500/20 text-red-400 p-4 rounded-xl mb-6">Something went wrong. Try again.</div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName">First Name</label>
              <input 
                name="firstName"
                placeholder="First Name" 
                value={formData.firstName} 
                onChange={handleChange} 
                className={`bg-zinc-800 p-3 rounded-lg border outline-none transition ${
                  errors.firstName ? 'border-red-500' : 'border-white/10 focus:border-orange-500'
                }`}
              />
              {errors.firstName && <span className="text-red-500 text-xs ml-1">{errors.firstName}</span>}
            </div>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName">Last Name</label>
              <input 
                name="lastName"
                placeholder="Last Name" 
                value={formData.lastName} 
                onChange={handleChange} 
                className={`bg-zinc-800 p-3 rounded-lg border outline-none transition ${
                  errors.lastName ? 'border-red-500' : 'border-white/10 focus:border-orange-500'
                }`}
              />
              {errors.lastName && <span className="text-red-500 text-xs ml-1">{errors.lastName}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input 
              name="email" 
              type="email" 
              placeholder="Email Address" 
              value={formData.email} 
              onChange={handleChange} 
              className={`bg-zinc-800 p-3 rounded-lg border outline-none transition ${
                errors.email ? 'border-red-500' : 'border-white/10 focus:border-orange-500'
              }`}
            />
            {errors.email && <span className="text-red-500 text-xs ml-1">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="subject">Subject</label>
            <select 
              name="subject"  
              value={formData.subject} 
              onChange={handleChange}
              placeholder="Select an option..."
              className={`bg-zinc-800 p-3 rounded-lg border outline-none ${
                errors.subject ? 'border-red-500' : 'border-white/10 focus:border-orange-500'
              }`}
            >
              <option value="" disabled hidden>Select an option...</option>
              <option value="offer">Request Offer</option>
              <option value="support">Customer Support</option>
              <option value="colab">Collaboration</option>
            </select>
            {errors.subject && <span className="text-red-500 text-xs ml-1">{errors.subject}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message">Message</label>
            <textarea 
              name="message" 
              type="message" 
              placeholder="Your message..." 
              rows="5"
              value={formData.message} 
              onChange={handleChange} 
              className={`bg-zinc-800 p-3 rounded-lg border outline-none transition ${
                errors.message ? 'border-red-500' : 'border-white/10 focus:border-orange-500'
              }`}
            />
            {errors.message && <span className="text-red-500 text-xs ml-1">{errors.message}</span>}
          </div>

          <button 
            disabled={status === 'loading'}
            type="submit" 
            className="cursor-pointer bg-orange-500 py-4 rounded-xl font-bold hover:bg-orange-600 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}