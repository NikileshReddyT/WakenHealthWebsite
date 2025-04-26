import React from 'react';
import { Helmet } from 'react-helmet-async';
import CFeatures from '../components/Features'; // Renamed import to avoid conflict

const Features = () => {
  return (
    <>
      <Helmet>
        <title>Features | WAKEN Health</title>
        <meta name="description" content="Explore the features of WAKEN Health." />
      </Helmet>
      <div className="pt-20"> {/* Added padding top for fixed header */}
        <CFeatures />
      </div>
    </>
  );
};

export default Features; 