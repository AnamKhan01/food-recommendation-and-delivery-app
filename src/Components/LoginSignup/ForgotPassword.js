import React, { useState } from "react";
import './Login.css';
import cancel from './crossed.png';
import axios from "axios";
import { toast } from "react-toastify"

const ForgotPassword = ({ setShowLogin }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/user/forgot-password', { email });
            setShowLogin(false);
            toast.success(response.data.message)
        } catch (error) {
            toast.error("Error sending email. Retry")
        }
    };

    return (
        <div>
            <div className="login-overlay" onClick={() => setShowLogin(false)}></div>
            <div className="login-popup" style={{ width: '28%' }}>
                <div className="form-content">
                    <img className="cancel-icon" src={cancel} alt="cancel" onClick={() => setShowLogin(false)} />
                    <h1>Reset your password</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input type="submit" value="Send Reset Link" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
