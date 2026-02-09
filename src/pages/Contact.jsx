import { useState } from 'react';
import { sendContactMessage } from '../services/contact';
import { FaEnvelope, FaPhoneAlt, FaTelegramPlane } from 'react-icons/fa';
import { HiMapPin } from "react-icons/hi2";

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
    <section className="py-20 text-white min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
      <div className='flex flex-col gap-1 max-w-2xl mx-auto lg:w-auto mx-auto px-4'>

        <h6 className='uppercase text-accent'>Contact us</h6>
        <h1 className='text-light text-5xl font-bold'>Visit Our Heritage</h1>
        <p className='text-light opacity-75 '>
            From the high altiyudes of the plantation to your morning cup. Reach out to our master roasters for any inquirires</p>
        <hr className='pt-5 my-5 text-accent'/>

        <div className="grid grid-cols-12 gap-4 items-center pb-5"> 
          <div className='col-span-1 flex items-center justify-center border border-white/10 rounded-full h-10 w-10'>
            <FaEnvelope className='icon-custom-color'/>
          </div>
          <div className='col-span-11 pl-3'>
            <small className='uppercase text-zinc-500 font-bold text-[10px] tracking-widest'>Email</small>
            <p className='text-white leading-[1]'>email@email.com</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-center pb-5"> 
          <div className='col-span-1 flex items-center justify-center border border-white/10 rounded-full h-10 w-10'>
            <FaPhoneAlt className='icon-custom-color'/>
          </div>
          <div className='col-span-11 pl-3'>
            <small className='uppercase text-zinc-500 font-bold text-[10px] tracking-widest'>Phone</small>
            <p className='text-white leading-[1]'>0123456789</p>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-4 items-center pb-5"> 
          <div className='col-span-1 flex items-center justify-center border border-white/10 rounded-full h-10 w-10'>
            <HiMapPin className='icon-custom-color'/>
          </div>
          <div className='col-span-11 pl-3'>
            <small className='uppercase text-zinc-500 font-bold text-[10px] tracking-widest'>Address</small>
            <p className='text-white leading-[1]'>On the Moon</p>
          </div>
        </div>

      </div>
      <div className="max-w-2xl mx-auto px-4 flex flex-col gap-1 w-full lg:w-auto">
        <h2 className="text-3xl font-bold mb-8">Send a Message</h2>

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
                id="firstName"
                name="firstName"
                placeholder="First Name" 
                value={formData.firstName} 
                onChange={handleChange} 
                className={`p-3 rounded-lg border outline-none transition ${
                  errors.firstName ? 'border-red-500' : 'border-white/10 focus:border-orange-500'
                }`}
              />
              {errors.firstName && <span className="text-red-500 text-xs ml-1">{errors.firstName}</span>}
            </div>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName">Last Name</label>
              <input 
                id="lastName"
                name="lastName"
                placeholder="Last Name" 
                value={formData.lastName} 
                onChange={handleChange} 
                className={`p-3 rounded-lg border outline-none transition ${
                  errors.lastName ? 'border-red-500' : 'border-white/10 focus:border-orange-500'
                }`}
              />
              {errors.lastName && <span className="text-red-500 text-xs ml-1">{errors.lastName}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="Email Address" 
              autoComplete="on"
              value={formData.email} 
              onChange={handleChange} 
              className={`p-3 rounded-lg border outline-none transition ${
                errors.email ? 'border-red-500' : 'border-white/10 focus:border-orange-500'
              }`}
            />
            {errors.email && <span className="text-red-500 text-xs ml-1">{errors.email}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="subject">Subject</label>
            <select 
              id="subject"  
              name="subject"  
              value={formData.subject} 
              onChange={handleChange}
              placeholder="Select an option..."
              className={`p-3 rounded-lg border outline-none ${
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
              id="message" 
              name="message" 
              type="message" 
              placeholder="Your message..." 
              rows="5"
              value={formData.message} 
              onChange={handleChange} 
              className={`p-3 rounded-lg border outline-none transition ${
                errors.message ? 'border-red-500' : 'border-white/10 focus:border-orange-500'
              }`}
            />
            {errors.message && <span className="text-red-500 text-xs ml-1">{errors.message}</span>}
          </div>

          <button 
            disabled={status === 'loading'}
            type="submit" 
            className="cursor-pointer cta-button uppercase font-medium transition disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
            <FaTelegramPlane />
          </button>
        </form>
      </div>
    </section>
  );
}