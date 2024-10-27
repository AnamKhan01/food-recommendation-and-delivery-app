import React, { useState } from "react";
import './Login.css';
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom"; 
import hideIcon from './smile.png'; 
import viewIcon from './cool-glasses.png';

const ResetPassword = ({ setShowLogin }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");  
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const { token } = useParams();
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (newPassword !== confirmPassword) {  
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('https://flashfeast-backend.vercel.app/api/user/reset-password', { token, newPassword });
            toast.success(response.data.message);
            navigate("/"); 
        } catch (error) {
            toast.error("Error resetting password. Retry");
        }
    };
    
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div>
            <div className="login-overlay" onClick={() => setShowLogin(false)}></div>
            <div className="login-popup" style={{ width: '35%' }}>
                <div className="form-content">
                    <h1>Create a new password</h1>
                    <form className="reset-password-form" onSubmit={handleSubmit}>
                        <div className="password-container">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <img
                                className="toggle-password-img"
                                src={showNewPassword ? hideIcon : viewIcon}
                                alt="toggle password visibility"
                                onClick={toggleNewPasswordVisibility}
                            />
                        </div>
                        <div className="password-container">
                            <input
                                type={showConfirmPassword ? "text" : "password"}  
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <img
                                className="toggle-password-img"
                                src={showConfirmPassword ? hideIcon : viewIcon}
                                alt="toggle password visibility"
                                onClick={toggleConfirmPasswordVisibility} // Toggle visibility for confirm password
                            />
                        </div>
                        <input type="submit" value="Reset Password" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
