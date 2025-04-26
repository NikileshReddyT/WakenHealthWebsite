import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

// Define constants for reusable styles or values if needed

const HeroSection = () => {

  // Simple fade-in variant for sequencing
  const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, delay: delay, ease: 'easeOut' }
    }
  });

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center bg-gradient-to-b from-blue-50 via-blue-100 to-white pt-24 pb-20 md:pb-36 overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* --- Left Side: Text Content --- */}
          <motion.div 
            className="space-y-6 flex flex-col justify-center h-full" 
            variants={fadeIn(0.2)}
            initial="hidden"
            animate="visible"
          >
            {/* Container for top text (Headline, Subtitles) */}
            <div> 
                <motion.h1 
                    variants={fadeIn(0.6)}
                    className="text-4xl w-full mx-auto text-center sm:text-5xl md:text-6xl font-extrabold text-neutral-900 leading-tight"
                >
                    Waken Health
                </motion.h1>
                <motion.p 
                    variants={fadeIn(0.4)}
                    className="text-primary font-medium text-sm tracking-wide mb-1 w-full text-center mx-auto"
                >
                    By Vital Health Solutions
                </motion.p>
                 <motion.p 
                    variants={fadeIn(0.8)}
                    className="text-lg md:text-xl text-neutral-600 mt-4 text-center"
                 >
                    Your personalized AI health companion for a better life.
                 </motion.p>
            </div>

            {/* Static Benefit List (Now vertically centered between top text and button) */}
            <motion.div 
                variants={fadeIn(1.0)} 
                className="space-y-3 py-4 flex flex-col items-center"
            >
                <p className="text-lg md:text-xl font-semibold text-neutral-800 mb-3">
                    Wake Up:
                </p>
                <div className="space-y-2 pl-2"> 
                    <div className="flex items-center text-neutral-700">
                        <FiCheckCircle className="text-secondary mr-3 flex-shrink-0" size={20}/>
                        <span>Wake Up Physically</span>
                    </div>
                    <div className="flex items-center text-neutral-700">
                        <FiCheckCircle className="text-secondary mr-3 flex-shrink-0" size={20}/>
                        <span>Wake Up Mentally</span>
                    </div>
                    <div className="flex items-center text-neutral-700">
                        <FiCheckCircle className="text-secondary mr-3 flex-shrink-0" size={20}/>
                        <span>Wake Up Nutritionally</span>
                    </div>
                </div>
            {/* CTA Button Container */}
             <motion.div variants={fadeIn(1.2)}> 
                 <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(59, 130, 246, 0.3)" }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-8 my-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                >
                    Get Started
                </motion.button>
             </motion.div>
            </motion.div>


          </motion.div>

          {/* --- Right Side: Phone Mockup Placeholder --- */}
          <motion.div 
             variants={fadeIn(0.5)} // Fade in the mockup area
             initial="hidden"
             animate="visible"
             className="relative flex justify-center items-center mt-12 md:mt-0"
           >
            {/* Phone Frame */}
            <div className="relative w-[280px] h-[570px] md:w-[300px] md:h-[610px] bg-gray-800 rounded-[45px] shadow-2xl border-[8px] border-gray-900 p-2">
                 {/* Inner Bezel/Screen Area */}
                <div className="w-full h-full bg-white rounded-[35px] overflow-hidden flex items-center justify-center">
                    {/* Placeholder for App Screenshot */}
                    <p className="text-sm text-gray-400 px-4 text-center">Your App Screenshot Goes Here</p>
                </div>
                {/* Notch */}
                 <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[100px] h-[20px] bg-gray-800 rounded-b-xl z-10 border-x-[4px] border-b-[4px] border-gray-900"></div>
                 {/* Side Button Indent */}
                 <div className="absolute left-[-6px] top-[100px] w-[4px] h-[60px] bg-gray-700 rounded-l-sm"></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Wave Transition */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none" style={{ marginBottom: '-1px'}}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-auto">
          <path d="M0,50 C400,120 1000,-20 1440,50 L1440,100 L0,100 Z" fill="#F3F4F6"></path> {/* Fill = bg-gray-100 approx */}
        </svg>
      </div>
    </section>
  );
};

export default HeroSection; 