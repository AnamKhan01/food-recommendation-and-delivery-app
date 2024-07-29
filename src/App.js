import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './Components/Routes/LandingPage';
import './App.css';
<<<<<<< Updated upstream

const App = () => {
  return (
    <Router>
      <LandingPage />
    </Router>
  );
};
=======
import homepage from './images/homepage3.png'
import Shopping from './Components/Shopping/Shopping';
import Contact from './Components/Contact/Contact';

function App() {
    return (
        <div className="app-container">
            <Header />
            <div className='body-contents'>
                <div className='written-content'>
                    <Home/>
                </div>
                <div className='bg-container'>
                    <img src={homepage} alt="Home page" className='bg-img'></img>
                </div>
            </div>
            <Features/>
            <Shopping/>
            <Contact/>
        </div>
    );
}
>>>>>>> Stashed changes

export default App;
