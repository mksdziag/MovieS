import React from 'react';

import './LoadingSpinner.css';

const loadingSpinner = () => {
  return (
    <div className="spinner">
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  );
};

export default loadingSpinner;
