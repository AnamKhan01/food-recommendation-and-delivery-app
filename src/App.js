import React from 'react';
import Header from './Components/Header/Header';
import './App.css';
import homepage from './images/homepage3.png'

function App() {
    return (
        <div className="app-container">
            <Header />
            <img src={homepage} alt="Home page" className='bg-img'></img>
              <div className="container mt-5">
                <h3>Tasty Delights, Swiftly Arrived!!</h3>
            </div>
        </div>
    );
}

export default App;
