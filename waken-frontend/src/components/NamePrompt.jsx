import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const NamePrompt = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      toast.error("Please enter your name!");
    } else {
      toast.success(`Thanks for telling us your name, ${name}!`);
      setName(''); // Clear input after submission
    }
  };

  return (
    <motion.section 
      id="name-prompt" 
      className="py-20 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-neutral-900">What's your name?</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-300 w-full sm:w-auto"
            aria-label="Your Name"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-secondary transition-colors duration-300 w-full sm:w-auto"
          >
            Submit
          </motion.button>
        </form>
      </div>
    </motion.section>
  );
};

export default NamePrompt; 