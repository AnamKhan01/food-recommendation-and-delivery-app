import React from 'react';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Features from './Components/Features/Features';
import './App.css';
import homepage from './images/Homepage2.png'
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

export default App;
