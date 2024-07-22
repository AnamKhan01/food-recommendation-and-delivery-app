import React from 'react';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import './App.css';
import homepage from './images/Homepage.png'

function App() {
    return (
        <div className="app-container">
            <Header/>
            <div className='bg-container'>
            <img src={homepage} alt="Home page" className='bg-img'></img>
            </div>
            <Home/>
        </div>
    );
}

export default App;
