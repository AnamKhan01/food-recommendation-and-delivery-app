import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const fixedUsername = "admin";
        const fixedPassword = "password123";

        if (username === import.meta.env.VITE_USERNAME && password === import.meta.env.VITE_PASSWORD) {
            onLoginSuccess();
            toast.success("Logged in successfully");
        } else {
            toast.error('Invalid username or password');
        }
    };

    return (
        <div className='login-body'>
            <div className="login-container">
                <form onSubmit={handleLogin}>
                    <h2>Welcome Admin!</h2>
                    <input
                        className='admin-input'
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className='admin-input'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
