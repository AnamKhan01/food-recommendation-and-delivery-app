import React from "react";
import './Login.css';
import cancel from './crossed.png';

const ForgotPassword = ({ setShowLogin }) => {

    return (
        <div>
            <div className="login-overlay" onClick={() => setShowLogin(false)}></div>
            <div className="login-popup" style={{ width: '35%' }}> 
                <div className="form-content">
                    <img className="cancel-icon" src={cancel} alt="cancel" onClick={() => setShowLogin(false)} />
                    <h1>Reset your password</h1>
                    <form>
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="New Password" required />
                        <input type="password" placeholder="Confirm Password" required />
                        <input type="submit"/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
