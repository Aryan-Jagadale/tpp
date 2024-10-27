import React, { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import CookieBanner from './CookieBanner';
import Tabs from './Tabs';

const App = () => {
  const [language, setLanguage] = useState('en');
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    } else {
      // Verify token with the server
      fetch('/api/protected', {
        headers: {
          'Authorization': token
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid token');
        }
      })
      .then(data => {
        setIsLoggedIn(true);
        setUser(data.user);
      })
      .catch(error => {
        console.error('Error:', error);
        localStorage.removeItem('token');
        window.location.href = '/login';
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <header>
        <h1>Netflix</h1>
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
        <button onClick={handleLogout}>Log out</button>
      </header>
      <main>
        <h2>Welcome to Netflix, {user}</h2>
        <p>Enjoy unlimited movies, TV shows, and more.</p>
        <Tabs />
      </main>
      {!cookiesAccepted && (
        <CookieBanner onAccept={() => setCookiesAccepted(true)} />
      )}
    </div>
  );
};

export default App;