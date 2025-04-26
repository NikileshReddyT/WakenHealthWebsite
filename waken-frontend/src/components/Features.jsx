import React from 'react';
import { motion } from 'framer-motion'; // Only needed for entrance animation
import { FiUser, FiActivity, FiSmile, FiBox, FiHeart, FiTrendingUp, FiTarget } from 'react-icons/fi'; // Add more icons if needed

// Define 6 features for each row (total 12 needed if distinct)
// Let's reuse some for this example, adjust as needed
const featuresRow1Data = [
  { id: 'f1', icon: FiUser, title: 'Personalized Plans', description: 'AI-driven health & fitness plans.' },
  { id: 'f2', icon: FiActivity, title: 'Activity Tracking', description: 'Monitor workouts and daily movement.' },
  { id: 'f3', icon: FiSmile, title: 'Mental Wellness', description: 'Mindfulness and stress management.' },
  { id: 'f4', icon: FiBox, title: 'Nutrition Guide', description: 'Custom meal suggestions & tracking.' },
  { id: 'f5', icon: FiHeart, title: 'Progress Reports', description: 'Detailed insights on your journey.' },
  { id: 'f11', icon: FiTrendingUp, title: 'Goal Setting', description: 'Define and track your health goals.' },
];
const featuresRow2Data = [
  { id: 'f6', icon: FiBox, title: 'Community Support', description: 'Connect with others on similar paths.' },
  { id: 'f7', icon: FiSmile, title: 'Sleep Analysis', description: 'Optimize your sleep patterns.' },
  { id: 'f8', icon: FiUser, title: 'Expert Coaching', description: 'Guidance from certified professionals.' },
  { id: 'f9', icon: FiActivity, title: 'Workout Library', description: 'Access diverse exercise routines.' },
  { id: 'f10', icon: FiHeart, title: 'Health Score', description: 'Track your overall wellbeing.' },
  { id: 'f12', icon: FiTarget, title: 'Challenge Friends', description: 'Engage in friendly competitions.' },
];

// Feature Card - Made narrower
const FeatureCard = ({ featureId, data }) => {
  const feature = data.find(f => f.id === featureId);
  if (!feature) return null;
  const { icon: IconComponent, title, description } = feature;

  return (
    <motion.div
      className={`bg-white rounded-lg border border-blue-100 p-4 flex-shrink-0 flex flex-col items-center text-center mx-2 w-[calc(14%-1rem)] h-40 cursor-default`}
    >
      <IconComponent className="text-primary mb-2.5" size={28} />
      <h4 className="font-semibold text-sm text-neutral-800 mb-1.5">{title}</h4>
      <p className="text-xs text-neutral-500 leading-snug">{description}</p>
    </motion.div>
  );
};

// Carousel Row - Removed internal padding
const FeatureCarouselRowCSS = ({ items, direction = 'left', speed = '60s' }) => {
  const doubledItems = [...items, ...items];

  return (
    <div
      className="w-full overflow-hidden relative"
     >
      <div
        className={`flex w-[200%] ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}
        style={{ animationDuration: speed }}
      >
        {doubledItems.map((item, index) => (
           <FeatureCard key={`${item.id}-${index}`} featureId={item.id} data={items} />
        ))}
      </div>
    </div>
  );
};

// Features component - Changed background to light gray
const Features = () => {

  return (
    <section
      id="features-content"
      className="py-20 md:py-28 overflow-hidden bg-gray-100"
    >
       <div className="text-center w-full mb-12 px-4">
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-neutral-900 drop-shadow-sm"
            >
                Features
            </motion.h2>
        </div>

      <div className="space-y-4 px-2"> 
         <FeatureCarouselRowCSS items={featuresRow1Data} direction="right" speed="60s"/>
         <FeatureCarouselRowCSS items={featuresRow2Data} direction="left" speed="60s"/>
      </div>

    </section>
  );
};

export default Features;
 