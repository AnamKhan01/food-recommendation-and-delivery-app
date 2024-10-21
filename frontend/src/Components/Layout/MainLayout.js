import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Features from '../Features/Features';
import Shopping from '../Shopping/Shopping';
import Contact from '../Contact/Footer';
import bowl from '../../images/Homepage-foodbowl.png';
import Login from '../LoginSignup/Login';
import SignUp from '../LoginSignup/SignUp';
import ForgotPassword from '../LoginSignup/ForgotPassword';

const MainLayout = ({ children }) => {
  const [showLogin, setShowLogin] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      {showLogin === 1 && <SignUp setShowLogin={setShowLogin} />}
      {showLogin === 2 && <Login setShowLogin={setShowLogin} />}
      {showLogin === 3 && <ForgotPassword setShowLogin={setShowLogin} />}
      
      <div className="app-container">
        <Header setShowLogin={setShowLogin} />
        <div className="body-contents">
          <div className="written-content">
            {children}
          </div>
          <div className="bg-container">
            <img src={bowl} alt='' className='food-bowl' />
          </div>
        </div>
        
        <div className='homepage-extender'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
            <path fill="#ffcd59" fillOpacity="1" d="M0,120L60,110C120,100,240,80,360,60C480,40,600,20,720,28C840,36,960,72,1080,75C1200,78,1320,50,1380,35L1440,20L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
        </div>
        
        <div id="features">
          <Features />
        </div>
        
        <div id="shopping">
          <Shopping 
            selectedCategory={selectedCategory} 
            onCategorySelect={handleCategorySelect} 
          />
        </div>
        
        <div id="contact">
          <Contact />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
