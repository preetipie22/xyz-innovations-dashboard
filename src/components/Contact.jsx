import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

function Contact() {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      dispatch({
        type: 'ADD_CONTACT_MESSAGE',
        payload: formData
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in">
            Ready to start your next project? We'd love to hear from you.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {isSubmitted && (
            <div className="bg-green-500 text-white p-4 rounded-lg mb-6 text-center animate-fade-in">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
            <div>
              <label htmlFor="name" className="block text-white text-lg font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border ${
                  errors.name ? 'border-red-500' : 'border-gray-700'
                } focus:border-blue-500 focus:outline-none transition-colors`}
                placeholder="Your Name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white text-lg font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                } focus:border-blue-500 focus:outline-none transition-colors`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-white text-lg font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white border ${
                  errors.message ? 'border-red-500' : 'border-gray-700'
                } focus:border-blue-500 focus:outline-none transition-colors`}
                placeholder="Tell us about your project..."
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 hover-scale transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
