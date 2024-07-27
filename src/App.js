import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Features from './Components/Features/Features';
import homepage from './images/Homepage2.png';
import Shopping from './Components/Shopping/Shopping';
import Contact from './Components/Contact/Contact';
import GetRecipes from './Components/GetRecipes/GetRecipes';
import './App.css';

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/get-recipes" element={<GetRecipes />} />
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
