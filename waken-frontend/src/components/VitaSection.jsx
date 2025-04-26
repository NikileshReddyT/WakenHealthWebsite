import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiBarChart2, FiCpu, FiHeart, FiInfo } from 'react-icons/fi'; // Added FiInfo

const VitaSection = () => {

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const vitaItems = [
    { letter: 'V', title: 'Vital', icon: FiHeart },
    { letter: 'I', title: 'Information', icon: FiInfo }, // Changed title slightly for space?
    { letter: 'T', title: 'Treatment', icon: FiBarChart2 }, // Note: Image shows T=Treatment, but earlier code had I=Info+Treatment. Assuming T=Treatment from image.
    { letter: 'A', title: 'Analysis', icon: FiCpu },
  ];

  // State to hold the calculated positions for each icon
  const [iconPositions, setIconPositions] = useState([]);
  const animationFrameId = useRef(null); // Use ref for animation frame ID

  useEffect(() => {
    const radiusPercentage = 38; // Orbit radius
    const rotationDuration = 20000; // 20 seconds in ms for a full rotation
    const iconSizeOffset = 18; // Half the icon container size (p-2 => 8px, size-20 icon approx fits in 36x36 -> 18px offset)

    // Calculate initial positions
    const initialPositions = vitaItems.map((_, index) => {
      const angle = (index * 90) - 45; // Base angle for each icon
      const x = Math.cos(angle * Math.PI / 180) * radiusPercentage;
      const y = Math.sin(angle * Math.PI / 180) * radiusPercentage;
      return { 
        top: `calc(50% + ${y}% - ${iconSizeOffset}px)`,
        left: `calc(50% + ${x}% - ${iconSizeOffset}px)`
      };
    });
    setIconPositions(initialPositions);

    const startTime = Date.now();

    // Animation loop using requestAnimationFrame
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const currentRotationDegrees = (elapsedTime / rotationDuration) * 360;

      const newPositions = vitaItems.map((_, index) => {
        const baseAngle = (index * 90) - 45;
        const currentAngle = baseAngle + currentRotationDegrees; // Add overall rotation
        
        const x = Math.cos(currentAngle * Math.PI / 180) * radiusPercentage;
        const y = Math.sin(currentAngle * Math.PI / 180) * radiusPercentage;
        
        return { 
          top: `calc(50% + ${y}% - ${iconSizeOffset}px)`,
          left: `calc(50% + ${x}% - ${iconSizeOffset}px)`
        };
      });

      setIconPositions(newPositions);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start the animation
    animationFrameId.current = requestAnimationFrame(animate);

    // Cleanup function to cancel animation on component unmount
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section id="vita" className="py-20 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.5 }}
           transition={{ duration: 0.5 }}
           className="text-center mb-16"
         >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Meet our AI healthcare agent</h2>
          {/* VITA title is now part of the graphic */}
          {/* <h3 className="text-6xl md:text-7xl font-extrabold text-primary">VITA.</h3> */}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Side - VITA Blocks */}
          <motion.div 
            variants={textVariants} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-4"
          >
            {vitaItems.map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-md border border-gray-100 flex items-center">
                  {/* Content can be added inside block if needed */}
                  <span className="font-semibold text-lg text-neutral-700">{item.letter} - {item.title}</span>
              </div>
            ))}
             {/* Learn More button removed from left side based on image */}
             {/* <motion.button ...>Learn More</motion.button> */}
          </motion.div>

          {/* Right Side - Concentric Circles Graphic - Container is STATIONARY */}
          <motion.div 
            variants={imageVariants} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex items-center justify-center w-full max-w-sm mx-auto aspect-square" 
          >
            {/* Background Circles (Stationary) */}
            <div className="absolute inset-0 rounded-full bg-blue-100 opacity-50"></div>
            <div className="absolute inset-[12%] rounded-full bg-blue-200 opacity-60"></div>
            <div className="absolute inset-[25%] rounded-full bg-secondary flex items-center justify-center shadow-lg">
                 <h3 className="text-4xl sm:text-5xl font-bold text-white">VITA</h3>
            </div>
            
            {/* Icons: Positioned absolutely, styles updated via JS state */}
            {vitaItems.map((item, index) => (
              <motion.div 
                key={`icon-${index}`} 
                className="absolute bg-white p-2 rounded-full shadow-md flex items-center justify-center"
                style={{ 
                  // Apply calculated positions from state
                  top: iconPositions[index]?.top || '50%', // Use state, provide fallback
                  left: iconPositions[index]?.left || '50%',
                  // No transform needed here, icon stays upright naturally
                 }}
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }} // Keep entrance animation
                 transition={{ delay: 0.5 + index * 0.2, duration: 0.4 }}
               >
                <item.icon className="text-secondary" size={20} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VitaSection; 