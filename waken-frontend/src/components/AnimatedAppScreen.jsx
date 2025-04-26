import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiTrendingUp, FiHeart } from 'react-icons/fi';

const AnimatedAppScreen = () => {

  // Variants for elements appearing
  const itemAppear = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: 'easeOut' }
    })
  };

  const graphDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut", delay: 0.8 }
    }
  };

  return (
    <div className="w-full h-full bg-white p-3 overflow-hidden">
      {/* Simple Header */}
      <motion.div 
        className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={itemAppear}
      >
        <FiUser className="text-gray-500" size={18} />
        <span className="text-xs font-medium text-gray-600">Dashboard</span>
        <div className="w-4 h-4"></div> {/* Spacer */}
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <motion.div 
          className="bg-blue-50 p-2 rounded shadow-sm"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={itemAppear}
          >
            <FiHeart className="text-blue-500 mb-1" size={16} />
            <p className="text-xs text-gray-500">Health Score</p>
            <p className="text-sm font-bold text-blue-900">82</p>
        </motion.div>
        <motion.div 
           className="bg-green-50 p-2 rounded shadow-sm"
           custom={2}
           initial="hidden"
           animate="visible"
           variants={itemAppear}
           >
             <FiTrendingUp className="text-green-500 mb-1" size={16} />
            <p className="text-xs text-gray-500">Activity</p>
            <p className="text-sm font-bold text-green-900">+15%</p>
        </motion.div>
      </div>

      {/* Simple Graph Placeholder */}
       <motion.div 
        className="w-full h-16 rounded bg-gray-50 relative"
        custom={3}
        initial="hidden"
        animate="visible"
        variants={itemAppear}
        >
          <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {/* Example path - replace with actual desired graph */}
            <motion.path
              d="M 5 35 Q 25 10, 45 20 T 85 15 L 95 30"
              fill="none"
              strokeWidth="2"
              stroke="var(--color-secondary)"
              strokeLinecap="round"
              variants={graphDraw}
              initial="hidden"
              animate="visible"
            />
          </svg>
        </motion.div>
    </div>
  );
};

export default AnimatedAppScreen; 