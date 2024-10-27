import React from 'react';

const LanguageSwitcher = ({ language, setLanguage }) => {
  const languages = ['en', 'es', 'fr', 'de'];

  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;