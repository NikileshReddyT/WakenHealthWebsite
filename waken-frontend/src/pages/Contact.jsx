import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { validateEmail, isNotEmpty } from '../utils/formValidation';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    privacy: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!isNotEmpty(formData.name)) formErrors.name = 'Name is required';
    if (!validateEmail(formData.email)) formErrors.email = 'Invalid Email Address';
    if (!isNotEmpty(formData.message)) formErrors.message = 'Message is required';
    if (!formData.privacy) formErrors.privacy = 'You must accept the privacy policy';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement actual form submission logic (e.g., API call)
      console.log('Contact Form Data:', formData);
      toast.success('Message sent successfully!');
      // Reset form
      setFormData({ name: '', email: '', message: '', privacy: false });
      setErrors({});
    } else {
      toast.error('Please fix the errors in the form.');
    }
  };
  
  const inputClass = (fieldName) => 
    `w-full px-4 py-3 border ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${errors[fieldName] ? 'focus:ring-red-500' : 'focus:ring-primary'} focus:border-transparent transition duration-300`;


  return (
    <>
      <Helmet>
        <title>Contact Us | WAKEN Health</title>
        <meta name="description" content="Get in touch with WAKEN Health." />
      </Helmet>
      <div className="container mx-auto px-4 py-16 pt-32"> {/* Added padding top for fixed header */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-neutral-900"
         >Contact Us</motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-xl border border-gray-100"
         >
          <form onSubmit={handleSubmit} className="space-y-6">
             {/* Name */}
             <div>
               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
               <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClass('name')} placeholder="Your Name" />
               {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
             </div>
             {/* Email */}
             <div>
               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
               <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClass('email')} placeholder="your.email@example.com" />
               {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
             </div>
             {/* Message */}
             <div>
               <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">How can we help you?</label>
               <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className={inputClass('message')} placeholder="Your message..."></textarea>
               {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
             </div>
             {/* Privacy Checkbox */}
             <div className="flex items-center">
                <input id="privacy" name="privacy" type="checkbox" checked={formData.privacy} onChange={handleChange} className={`h-4 w-4 ${errors.privacy ? 'border-red-500' : 'border-gray-300'} text-primary focus:ring-primary rounded`} />
                <label htmlFor="privacy" className="ml-2 block text-sm text-gray-900">I have read and accept the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">privacy policy</a></label>
             </div>
             {errors.privacy && <p className="text-red-500 text-xs -mt-4">{errors.privacy}</p>}
             {/* Submit Button */}
             <motion.button 
               type="submit"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="w-full bg-secondary text-white py-3 px-4 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300 font-semibold shadow-md"
              >Send Message</motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Contact; 