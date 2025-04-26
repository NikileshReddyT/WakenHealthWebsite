import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa'; // Using FaTwitter for X
import { HiMenu, HiX } from 'react-icons/hi'; // Icons for hamburger menu
import useScrollHeader from '../hooks/useScrollHeader';
// import logo from '../assets/logo.svg'; // Uncomment when logo is ready

const Header = () => {
  const scrolled = useScrollHeader(10); // Lower threshold slightly for quicker transition
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get current location

  // Only show Learn More button on the homepage
  const showLearnMore = location.pathname === '/';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = isMobileMenuOpen ? '' : 'hidden';
  };

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = '';
    }
  }, [location.pathname]); // Dependency on location

  // Header text should always be dark blue now, except potentially in mobile menu
  const headerTextColor = 'text-blue-900'; // Use the user's specified class
  const mobileMenuTextColor = 'text-neutral-900'; // Always dark in mobile menu

  const navLinkClasses = ({ isActive }) =>
    `relative font-medium pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary after:transition-transform after:duration-300 after:ease-in-out ${isActive ? 'text-primary after:scale-x-100' : headerTextColor + ' after:scale-x-0 hover:after:scale-x-100 hover:text-primary'
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `block py-2 px-4 text-lg ${isActive ? 'text-primary font-semibold' : mobileMenuTextColor + ' hover:text-primary'
    }`;

  const socialIconVariants = {
    hover: { scale: 1.2, color: 'var(--color-secondary)' },
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out 
        ${scrolled 
          ? 'bg-white/65 backdrop-blur-md shadow-md py-3' // Scrolled: Glassmorphism
          : 'bg-white/95 shadow-md py-4' // Initial: Solid White + Shadow
        }`}
    >
      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className={`text-2xl font-bold transition-colors duration-300 ${headerTextColor}`}>
          {/* <img src={logo} alt="WAKEN Logo" className="h-8" /> */}
          WAKEN <span className="font-medium">Health</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 space-x-8">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <NavLink to="/features" className={navLinkClasses}>Features</NavLink>
          <NavLink to="/join" className={navLinkClasses}>Join Us</NavLink>
          <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
        </div>

        <div className="flex items-center space-x-4">
          {/* Social Icons (Desktop) - Always dark blue */}
          <div className={`hidden md:flex items-center space-x-4 ${showLearnMore ? 'mr-4' : ''}`}>
            <motion.a href="#" target="_blank" rel="noopener noreferrer" variants={socialIconVariants} whileHover="hover" className={`${headerTextColor} transition-colors duration-300`}>
              <FaInstagram size={20} />
            </motion.a>
            <motion.a href="#" target="_blank" rel="noopener noreferrer" variants={socialIconVariants} whileHover="hover" className={`${headerTextColor} transition-colors duration-300`}>
              <FaFacebookF size={20} />
            </motion.a>
            <motion.a href="#" target="_blank" rel="noopener noreferrer" variants={socialIconVariants} whileHover="hover" className={`${headerTextColor} transition-colors duration-300`}>
              <FaTwitter size={20} />
            </motion.a>
          </div>

          {/* Learn More Button (Desktop - Only on Homepage) */}
          {showLearnMore && (
            <motion.button
              className={`hidden md:block bg-secondary text-white font-medium py-2 px-5 rounded shadow hover:bg-primary hover:text-white transition-colors duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          )}

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={toggleMobileMenu} className={`${headerTextColor} z-50 relative transition-colors duration-300`}>
              {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Start further up
        animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Smoother ease
        className={`lg:hidden absolute top-0 left-0 w-full h-screen bg-white shadow-lg py-4 pt-20 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        style={{ backdropFilter: 'blur(0px)' }} // Override backdrop filter if needed
      >
        <div className="container mx-auto px-4 flex flex-col h-full">
           <div className="flex-grow space-y-4">
             <NavLink to="/" className={mobileNavLinkClasses} onClick={toggleMobileMenu}>Home</NavLink>
             <NavLink to="/features" className={mobileNavLinkClasses} onClick={toggleMobileMenu}>Features</NavLink>
             <NavLink to="/join" className={mobileNavLinkClasses} onClick={toggleMobileMenu}>Join Us</NavLink>
             <NavLink to="/contact" className={mobileNavLinkClasses} onClick={toggleMobileMenu}>Contact</NavLink>
           </div>
           {/* Learn More Button (Mobile - Only on Homepage) */}
            {showLearnMore && (
                <motion.button
                    className="w-full my-4 bg-secondary text-white font-medium py-3 px-5 rounded shadow hover:bg-primary transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toggleMobileMenu} 
                >
                    Learn More
                </motion.button>
            )}
          {/* Social Icons (Mobile) - Move to bottom */}
          <div className="flex justify-center space-x-6 py-6 border-t border-neutral-100 mt-auto">
            <motion.a href="#" target="_blank" rel="noopener noreferrer" variants={socialIconVariants} whileHover="hover" className={mobileMenuTextColor}>
              <FaInstagram size={24} />
            </motion.a>
            <motion.a href="#" target="_blank" rel="noopener noreferrer" variants={socialIconVariants} whileHover="hover" className={mobileMenuTextColor}>
              <FaFacebookF size={24} />
            </motion.a>
            <motion.a href="#" target="_blank" rel="noopener noreferrer" variants={socialIconVariants} whileHover="hover" className={mobileMenuTextColor}>
              <FaTwitter size={24} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header; 