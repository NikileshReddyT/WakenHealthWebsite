import React from 'react';
import { Helmet } from 'react-helmet-async';
import JoinForm from '../components/JoinForm';

const Join = () => {
  return (
    <>
      <Helmet>
        <title>Join Us | WAKEN Health</title>
        <meta name="description" content="Join the WAKEN Health team." />
      </Helmet>
      <div className="pt-20"> {/* Added padding top for fixed header */}
         <JoinForm />
      </div>
    </>
  );
};

export default Join; 