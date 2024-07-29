import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './Components/Routes/LandingPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <LandingPage />
    </Router>
  );
};

export default App;
