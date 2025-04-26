import React from 'react';
import { motion } from 'framer-motion';

const NeuralBloomGraphic = () => {
  const numLines = 8; // Number of radiating lines
  const radius = 100;

  const coreVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 0.9, 0.7],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  const lineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: (i) => ({
      pathLength: 1,
      opacity: 0.6,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 1.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.svg 
      viewBox="-150 -150 300 300" // Centered viewbox
      width="100%" 
      height="100%" 
      style={{ overflow: 'visible' }} // Allow elements like stroke to exceed viewbox slightly
    >
      {/* Optional background glow? */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Radiating Lines */}
      {Array.from({ length: numLines }).map((_, i) => {
        const angle = (i / numLines) * 2 * Math.PI;
        const x2 = Math.cos(angle) * radius;
        const y2 = Math.sin(angle) * radius;
        return (
          <motion.line
            key={`line-${i}`}
            x1={0}
            y1={0}
            x2={x2}
            y2={y2}
            stroke="rgba(59, 130, 246, 0.6)" // Secondary blue, semi-transparent
            strokeWidth={1.5}
            variants={lineVariants}
            initial="initial"
            animate="animate"
            custom={i}
          />
        );
      })}

      {/* Central Core */}
      <motion.circle
        cx={0}
        cy={0}
        r={15} // Core radius
        fill="rgba(59, 130, 246, 0.8)" // Secondary blue
        variants={coreVariants}
        animate="pulse"
        // filter="url(#glow)" // Apply glow - can be performance heavy
      />
       <motion.circle // Outer faint pulse
        cx={0}
        cy={0}
        r={15}
        fill="none"
        stroke="rgba(59, 130, 246, 0.4)"
        strokeWidth={3}
        variants={{
            pulse: {
                scale: [1, 1.8, 1],
                opacity: [0.4, 0, 0.4],
                transition: { duration: 3, ease: "easeOut", repeat: Infinity, delay: 0.5 }
            }
        }}
        animate="pulse"
      />

    </motion.svg>
  );
};

export default NeuralBloomGraphic; 