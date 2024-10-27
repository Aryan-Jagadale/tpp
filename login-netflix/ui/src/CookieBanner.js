import React from 'react';

const CookieBanner = ({ onAccept }) => {
  return (
    <div className="cookie-banner">
      <p>We use cookies to improve your experience. By using our site, you agree to our use of cookies.</p>
      <button onClick={onAccept}>Accept</button>
    </div>
  );
};

export default CookieBanner;