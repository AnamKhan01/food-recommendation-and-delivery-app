import React, { useState } from "react";
import './Login.css';
import cancel from './crossed.png';
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom"; 

const ResetPassword = ({ setShowLogin }) => {
    const [newPassword, setNewPassword] = useState("");
    const { token } = useParams();
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/user/reset-password', { token, newPassword });
            toast.success(response.data.message);
            navigate("/"); 
        } catch (error) {
            toast.error("Error resetting password. Retry");
        }
    };

    return (
        <div>
            <div className="login-overlay" onClick={() => setShowLogin(false)}></div>
            <div className="login-popup" style={{ width: '35%' }}>
                <div className="form-content">
                    <img className="cancel-icon" src={cancel} alt="cancel" onClick={() => setShowLogin(false)} />
                    <h1>Create a new password</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                        />
                        <input type="submit" value="Reset Password" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
