import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import Onebox from './Onebox';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${theme}`}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onebox" element={<Onebox toggleTheme={toggleTheme} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
