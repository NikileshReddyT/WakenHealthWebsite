import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiTrendingUp, FiHeart } from 'react-icons/fi'; // Example Icons

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Placeholder data - replace with actual data fetching/structure
const dashboardData = {
  'Busy CEO': {
    stats: [
      { name: 'Sleep Quality', value: '6.8h', change: 'Highly Below Target', icon: FiBriefcase },
      { name: 'Stress Level', value: 'High', change: 'Moderate stress detected', icon: FiTrendingUp },
      { name: 'Activity Score', value: '48%', change: 'Room for improvement', icon: FiHeart },
    ],
    chartData: [ // Placeholder chart data points
      { day: 'Mon', value1: 75, value2: 30 },
      { day: 'Tue', value1: 80, value2: 35 },
      { day: 'Wed', value1: 78, value2: 40 },
      { day: 'Thu', value1: 85, value2: 38 },
      { day: 'Fri', value1: 82, value2: 42 },
      { day: 'Sat', value1: 70, value2: 35 },
      { day: 'Sun', value1: 68, value2: 33 },
    ],
  },
  'Fitness Pro': {
    stats: [
        { name: 'Training Load', value: 'Optimal', change: 'Ready for peak performance', icon: FiTrendingUp },
        { name: 'Recovery Status', value: '92%', change: 'Fully recovered', icon: FiHeart },
        { name: 'VO2 Max', value: '55', change: 'Excellent cardiovascular fitness', icon: FiBriefcase },
      ],
      chartData: [ // Different data for Fitness Pro
        { day: 'Mon', value1: 85, value2: 70 },
        { day: 'Tue', value1: 90, value2: 75 },
        { day: 'Wed', value1: 88, value2: 72 },
        { day: 'Thu', value1: 92, value2: 78 },
        { day: 'Fri', value1: 95, value2: 80 },
        { day: 'Sat', value1: 80, value2: 65 },
        { day: 'Sun', value1: 78, value2: 63 },
      ],
  },
  'Wellness Seeker': {
     stats: [
        { name: 'Mindfulness Minutes', value: '25m', change: 'Consistent practice', icon: FiHeart },
        { name: 'Nutrition Score', value: 'B+', change: 'Good balance, minor adjustments needed', icon: FiBriefcase },
        { name: 'Overall Wellbeing', value: '75%', change: 'Positive trend', icon: FiTrendingUp },
      ],
      chartData: [ // Different data for Wellness Seeker
        { day: 'Mon', value1: 65, value2: 50 },
        { day: 'Tue', value1: 70, value2: 55 },
        { day: 'Wed', value1: 72, value2: 58 },
        { day: 'Thu', value1: 75, value2: 60 },
        { day: 'Fri', value1: 78, value2: 62 },
        { day: 'Sat', value1: 70, value2: 55 },
        { day: 'Sun', value1: 68, value2: 53 },
      ],
  },
};

// Simple Placeholder Chart Component
const WeeklyTrendChart = ({ data }) => {
  // This is a very basic SVG placeholder. Replace with a proper chart library (e.g., Recharts, Chart.js).
  const maxValue = 100; // Math.max(...data.map(d => Math.max(d.value1, d.value2)), 100);
  const width = 500;
  const height = 200;
  const padding = 30;

  return (
    <div className="mt-8 bg-gray-50 p-4 rounded-lg overflow-x-auto">
      <h4 className="text-lg font-semibold mb-4 text-neutral-700">Weekly Trends</h4>
      <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[450px]">
        {/* Y Axis Lines (example) */}
        {[0, 25, 50, 75, 100].map(y => (
          <g key={y}>
            <line x1={padding} y1={height - padding - (y/maxValue * (height - 2*padding))} x2={width - padding} y2={height - padding - (y/maxValue * (height - 2*padding))} stroke="#e5e7eb" strokeWidth="1" />
            <text x={padding - 10} y={height - padding - (y/maxValue * (height - 2*padding))} dy="0.3em" textAnchor="end" fontSize="10px" fill="#6b7280">{y}</text>
          </g>
        ))}
         {/* X Axis Labels (example) */}
        {data.map((d, i) => (
           <text key={i} x={padding + (i * (width - 2*padding) / (data.length - 1))} y={height - padding + 15} textAnchor="middle" fontSize="10px" fill="#6b7280">{d.day}</text>
        ))}
        {/* Data Lines (example for two lines) */}
        <polyline
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          points={data.map((d, i) => 
            `${padding + (i * (width - 2*padding) / (data.length - 1))},${height - padding - (d.value1 / maxValue * (height - 2*padding))}`
          ).join(' ')}
        />
        {data.map((d, i) => 
          <circle key={`p1-${i}`} cx={padding + (i * (width - 2*padding) / (data.length - 1))} cy={height - padding - (d.value1 / maxValue * (height - 2*padding))} r="3" fill="var(--color-primary)" />
        )}
        <polyline
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth="2"
          points={data.map((d, i) => 
            `${padding + (i * (width - 2*padding) / (data.length - 1))},${height - padding - (d.value2 / maxValue * (height - 2*padding))}`
          ).join(' ')}
        />
         {data.map((d, i) => 
          <circle key={`p2-${i}`} cx={padding + (i * (width - 2*padding) / (data.length - 1))} cy={height - padding - (d.value2 / maxValue * (height - 2*padding))} r="3" fill="var(--color-secondary)" />
        )}
      </svg>
    </div>
  );
};

const PersonalizedDashboard = () => {
  const categories = Object.keys(dashboardData);

  return (
    <section id="dashboard" className="py-20 bg-gradient-to-b from-white to-neutral-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Personalized Dashboard</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            See how your health data adapts to different lifestyles with our interactive preview.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tab.Group>
            <Tab.List className="flex justify-center space-x-2 md:space-x-4 bg-neutral-100 p-2 rounded-lg max-w-md mx-auto shadow-inner">
              {categories.map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-md py-2.5 px-3 text-sm md:text-base font-medium leading-5',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-100 ring-white ring-opacity-60',
                      selected
                        ? 'bg-secondary text-white shadow'
                        : 'text-neutral-600 hover:bg-white/[0.8] hover:text-neutral-900'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-8">
              {categories.map((category, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    'rounded-xl bg-white p-6 md:p-8 shadow-xl border border-gray-100',
                    'focus:outline-none'
                  )}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-neutral-800">{category} Dashboard</h3>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6">
                    {dashboardData[category].stats.map((stat) => (
                      <div key={stat.name} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                         <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                            <stat.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                         </div>
                         <p className="text-2xl font-semibold text-neutral-900">{stat.value}</p>
                         <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                      </div>
                    ))}
                  </div>
                  {/* Chart */}
                  <WeeklyTrendChart data={dashboardData[category].chartData} />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalizedDashboard; 