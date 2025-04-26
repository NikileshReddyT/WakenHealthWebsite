import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import NeuralBloomGraphic from './NeuralBloomGraphic'; // Import the graphic

const HeroSection = () => {

  // Animation Variants
  const textAppear = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: 'easeOut', delay: 0.5 } 
    }
  };
  
  const taglineItem = {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
  };

  return (
    <section 
      id="hero" 
      // Dark gradient background
      className="relative min-h-screen flex items-center justify-center 
                 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 
                 pt-24 pb-20 md:pb-32 overflow-hidden text-white"
    >
      {/* Background Graphic Container */}
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-40 md:opacity-30">
          <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px]">
             <NeuralBloomGraphic />
          </div>
      </div>

      {/* Text Content Container - Centered */} 
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
            
            {/* Headline */}
            <motion.h1 
                variants={textAppear}
                initial="hidden"
                animate="visible"
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-md"
            >
                Waken Health
            </motion.h1>
            
            {/* Tagline Section */}
            <motion.div 
              variants={textAppear} // Use same appear animation for the block
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.7 }} // Delay the whole block slightly
            >
                <p className="text-lg md:text-xl text-blue-200 mb-8 drop-shadow-sm">
                    Wake Up:
                </p>
                {/* Using inline-flex for horizontal layout on medium screens */}
                <motion.div 
                    className="flex flex-col md:flex-row md:justify-center space-y-3 md:space-y-0 md:space-x-8 mb-10"
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.2, delayChildren: 1.0 }} // Stagger individual items
                >
                    <motion.div variants={taglineItem} className="flex items-center justify-center md:justify-start text-blue-100">
                        <FiCheckCircle className="text-blue-300 mr-2 flex-shrink-0" size={18}/>
                        <span className="text-sm md:text-base">Physically</span>
                    </motion.div>
                    <motion.div variants={taglineItem} className="flex items-center justify-center md:justify-start text-blue-100">
                        <FiCheckCircle className="text-blue-300 mr-2 flex-shrink-0" size={18}/>
                        <span className="text-sm md:text-base">Mentally</span>
                    </motion.div>
                    <motion.div variants={taglineItem} className="flex items-center justify-center md:justify-start text-blue-100">
                        <FiCheckCircle className="text-blue-300 mr-2 flex-shrink-0" size={18}/>
                        <span className="text-sm md:text-base">Nutritionally</span>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Ghost Button CTA */}
             <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(59, 130, 246, 0.1)", // Faint blue background on hover
                    boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)" 
                }}
                className="border border-blue-300 hover:border-blue-400 text-blue-100 font-semibold py-3 px-8 rounded-lg 
                           transition duration-300 ease-in-out shadow-sm hover:shadow-blue-400/30"
            >
                Explore Features
            </motion.button>

        </div>
      </div>
      
      {/* Bottom Wave Transition - Fill needs to match Features section (light gray) */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none" style={{ marginBottom: '-1px'}}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block w-full h-auto">
          <path d="M0,50 C400,120 1000,-20 1440,50 L1440,100 L0,100 Z" fill="#F3F4F6"></path> {/* Fill = bg-gray-100 approx */}
        </svg>
      </div>
    </section>
  );
};

export default HeroSection; 