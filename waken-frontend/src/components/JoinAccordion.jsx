import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import JoinForm from './JoinForm';

const jobRoles = [
  { id: 'flutter', title: 'Mobile App Developer (Flutter)', description: 'Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.' },
  { id: 'springboot', title: 'SpringBoot developers', description: 'Design, develop, and maintain scalable backend services using the Spring framework.' },
  { id: 'uiux', title: 'UI/UX Designer', description: 'Create intuitive and engaging user experiences and interfaces across our platforms.' },
  { id: 'video', title: 'Video Editor', description: 'Produce and edit high-quality video content for marketing and informational purposes.' },
];

const JoinAccordion = () => {
  const [openFormRoleId, setOpenFormRoleId] = useState(null);

  const toggleAccordion = (roleId) => {
      setOpenFormRoleId(prevId => (prevId === roleId ? null : roleId));
  };
  
  const panelVariants = {
      hidden: {
          opacity: 0,
          height: 0,
          y: -10,
          transition: { duration: 0.3, ease: "easeOut" }
      },
      visible: {
          opacity: 1,
          height: 'auto',
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" }
      }
  };

  return (
    <section id="join-team" className="py-20 bg-neutral-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-neutral-900"
        >
          Join Our Team
        </motion.h2>

        <div className="w-full space-y-4">
          {jobRoles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="bg-white rounded-lg shadow-md">
                 <button 
                   onClick={() => toggleAccordion(role.id)}
                   className="flex justify-between items-center w-full px-6 py-4 text-left text-lg font-medium text-primary hover:bg-blue-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 transition duration-150 ease-in-out"
                  >
                    <span>{role.title}</span>
                    <FiChevronDown
                      className={`${openFormRoleId === role.id ? 'transform rotate-180' : ''
                        } w-5 h-5 text-primary transition-transform duration-300 ease-out`}
                    />
                  </button>
                
                  <AnimatePresence initial={false}> 
                    {openFormRoleId === role.id && (
                      <motion.div
                         key="content"
                         variants={panelVariants}
                         initial="hidden"
                         animate="visible"
                         exit="hidden"
                         style={{ overflow: 'hidden' }}
                      >
                        <div className="px-6 pt-4 pb-6 border-t border-gray-100">
                           <JoinForm 
                              selectedPosition={role.title} 
                              isInline={true}
                           /> 
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JoinAccordion; 