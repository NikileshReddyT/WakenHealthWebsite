import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll
    });
  };
  
  const linkStyle = "text-neutral-300 hover:text-white transition duration-300 ease-in-out text-sm";
  const headingStyle = "text-base font-semibold mb-4 text-white uppercase tracking-wider";


  return (
    <footer className="bg-neutral-900 text-neutral-100 pt-16 pb-8 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Logo/Brand */}
          <div className="col-span-2 md:col-span-1 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2 text-white">WAKEN <span className="font-normal">Health</span></h3>
            <p className="text-neutral-400 text-xs">Physically. Mentally. Nutritionally.</p>
          </div>

          {/* Website Links */}
          <div>
            <h4 className={headingStyle}>Website</h4>
            <ul className="space-y-3">
              <li><Link to="/" className={linkStyle}>Home</Link></li>
              <li><Link to="/features" className={linkStyle}>Features</Link></li>
              <li><Link to="/join" className={linkStyle}>Join Us</Link></li>
              <li><Link to="/contact" className={linkStyle}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className={headingStyle}>Socials</h4>
            <ul className="space-y-3">
              <li><a href="#" target="_blank" rel="noopener noreferrer" className={linkStyle}>Instagram</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className={linkStyle}>Facebook</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className={linkStyle}>X (Twitter)</a></li>
            </ul>
          </div>
          
          {/* Empty column for spacing */}
           <div className="hidden md:block">
            {/* Keeping this column empty helps with alignment on wider screens */} 
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-xs text-neutral-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Vital Health Solutions. All rights reserved.
          </p>
          {/* Social Icons - Bottom */}
          <div className="flex justify-center space-x-5">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition duration-300"><FaInstagram size={18} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition duration-300"><FaFacebookF size={18} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition duration-300"><FaTwitter size={18} /></a>
          </div>
        </div>

        {/* Scroll To Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="absolute -top-5 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-secondary transition-colors duration-300 z-20" // Moved position slightly
          aria-label="Scroll to top"
          title="Scroll to top" // Added title attribute
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowUp size={20} />
        </motion.button>

      </div>
    </footer>
  );
};

export default Footer; 