import React from 'react';
import Header from '../Header/Header';
import Features from '../Features/Features';
import Shopping from '../Shopping/Shopping';
import Contact from '../Contact/Contact';
import homepage from '../../images/Homepage2.png';

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Header isFixed={true} />
      <div className="body-contents">
        <div className="written-content">
          {children}
        </div>
        <div className="bg-container">
          <img src={homepage} alt="Home page" className="bg-img" />
        </div>
      </div>
      <Features />
      <Shopping />
      <Contact />
    </div>
  );
};

export default MainLayout;
