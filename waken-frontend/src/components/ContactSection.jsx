import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { validateEmail, isNotEmpty } from '../utils/formValidation';

const ContactSection = () => {
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
            console.log('Home Page Contact Form Data:', formData);
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', message: '', privacy: false });
            setErrors({});
        } else {
            toast.error('Please fix the errors in the form.');
        }
    };

    const inputClass = (fieldName) =>
        `w-full px-4 py-3 border bg-neutral-100 bg-opacity-10 text-neutral-100 placeholder-neutral-400 ${errors[fieldName] ? 'border-red-500' : 'border-neutral-700'} rounded-md focus:outline-none focus:ring-1 ${errors[fieldName] ? 'focus:ring-red-500 border-red-500' : 'focus:ring-secondary focus:border-secondary'} transition duration-300`;

    const waveHeight = 80;
    const overlapFactor = 0.8;
    const clipPathValue = `path('M0,${waveHeight} C480,${waveHeight*0.2} 960,${waveHeight*0.2} 1440,${waveHeight} L1440,0 L0,0 Z')`;

    return (
        <section id="contact-section" className="relative pt-20 pb-20 bg-neutral-900 text-neutral-100 overflow-hidden">
            <div 
                className="absolute -top-px left-0 w-full h-full pointer-events-none"
                style={{ 
                    height: `${waveHeight}px`,
                    backgroundColor: 'var(--color-neutral-100)', 
                    clipPath: clipPathValue,
                    zIndex: 5,
                 }}
             ></div>
            
            <div className="relative z-10 container mx-auto px-4">
                 <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-center mb-12 text-white"
                >
                    Contact Us
                </motion.h2>

                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-xl mx-auto"
                >
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="home-name" className="sr-only">Name</label>
                                <input type="text" id="home-name" name="name" value={formData.name} onChange={handleChange} className={inputClass('name')} placeholder="What's your name?" />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="home-email" className="sr-only">Email</label>
                                <input type="email" id="home-email" name="email" value={formData.email} onChange={handleChange} className={inputClass('email')} placeholder="What's your e-mail?" />
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                            </div>
                        </div>
                        <div>
                             <label htmlFor="home-message" className="sr-only">Message</label>
                             <textarea id="home-message" name="message" rows="5" value={formData.message} onChange={handleChange} className={`${inputClass('message')} min-h-[100px]`} placeholder='What would you like to say?'></textarea>
                             {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                        </div>
                        <div className="flex items-center pt-2">
                            <input id="home-privacy" name="privacy" type="checkbox" checked={formData.privacy} onChange={handleChange} className={`h-4 w-4 ${errors.privacy ? 'border-red-500' : 'border-neutral-500'} bg-transparent text-secondary focus:ring-secondary rounded`} />
                            <label htmlFor="home-privacy" className="ml-2 block text-sm text-neutral-300">I have read and accept the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">privacy policy</a></label>
                        </div>
                        {errors.privacy && <p className="text-red-400 text-xs -mt-4">{errors.privacy}</p>}
                        
                        <div className="pt-4 text-center"> 
                            <motion.button 
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-3 bg-secondary text-white rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-primary transition-colors duration-300 font-semibold shadow-md"
                            >
                                Send Message
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection; 