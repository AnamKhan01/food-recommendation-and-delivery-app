import React from 'react';
import Header from './Components/Header';
import './App.css';
import homepage from './images/homepage3.png'

function App() {
    return (
        <div className="App">
            <div className="background" style={{ backgroundImage: `url(${homepage})`}}>
            <Header />
              <div className="container mt-5">
                <h1>Welcome</h1>
              </div>
            </div>
        </div>
    );
}

export default App;
