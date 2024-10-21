import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './Components/Routes/LandingPage';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <LandingPage />
      </Router>
    </>
  );
};

export default App;
