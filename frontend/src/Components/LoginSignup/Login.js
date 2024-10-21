import React, { useState, useContext, useEffect } from "react";
import './Login.css';
import cancel from './crossed.png';
import crispe from './cycle.gif';
import carrot from './carrot.gif';
import google from './google-symbol.png';
import hideIcon from './smile.png'; 
import viewIcon from './cool-glasses.png';
import { StoreContext } from "../Grocery/Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useGoogleLogin } from '@react-oauth/google';

const Login = ({ setShowLogin }) => {

    const [user, setUser] = useState([]);
    const { url, settoken, setUsername } = useContext(StoreContext);
    const [showPassword, setShowPassword] = useState(false);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user && user.access_token) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    const googleLoginUrl = url + "/api/user/google-login"; 
                    axios.post(googleLoginUrl, {
                        name: res.data.name,
                        email: res.data.email,
                        password: res.data.id,
                    })
                    .then((response) => {
                        if (response.data.success) {
                            settoken(response.data.token);
                            setUsername(response.data.username);
                            localStorage.setItem("token", response.data.token);
                            localStorage.setItem("username", response.data.username);
                            setShowLogin(false);
                            toast.success(response.data.message);
                        } else {
                            toast.error(response.data.message);
                        }
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        }
    }, [user, settoken, setUsername, setShowLogin, url]);

    const [currState, setCurrState] = useState(2);
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: "",
        contactNo: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setdata(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === 2) {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            settoken(response.data.token);
            setUsername(response.data.username);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
            setShowLogin(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="login-overlay" onClick={() => setShowLogin(false)}></div>
            <div className="login-popup">
                {currState === 1 ? <img className="signup-bg" src={crispe} alt=""></img> : <img className="login-bg" src={carrot} alt='' />}
                <div className="form-content">
                    <img className="cancel-icon" src={cancel} alt="cancel" onClick={() => setShowLogin(false)} />
                    {currState === 1 ? <h1>Sign Up</h1> : <h1>Login</h1>}
                    <form className='login-form-layout' onSubmit={onLogin}>
                        {currState === 1 ? (
                            <>
                                <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Username" required />
                                <input type="tel" name="contactNo" onChange={onChangeHandler} value={data.contactNo} placeholder="Contact Number" />
                            </>
                        ) : null}
                        <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email" required />
                        <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={onChangeHandler}
                                    value={data.password}
                                    placeholder="Password"
                                    required
                                />
                                <img
                                    className="toggle-password-img"
                                    src={showPassword ? hideIcon : viewIcon}
                                    alt="toggle password visibility"
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                        {currState === 1 ? (
                            <div>
                                <input type="checkbox" required />
                                <p>I agree to the terms of use and privacy policy.</p>
                            </div>
                        ) : null}
                        <input type="submit" value={currState === 2 ? "Login" : "Create Account"} />
                        <div className="google-container" onClick={() => login()}>
                            <img className="google-logo" src={google} alt="" />
                            <input className="google-button" type="button" value={currState === 2 ? "Log in with Google" : "Sign up with Google"} />
                        </div>
                    </form>

                    {currState === 2 ? (
                        <p className="links-container">
                            <span className="links" onClick={() => setCurrState(1)}>Sign Up Now</span>
                            <span onClick={() => setShowLogin(3)} className="forgot-pwd">Forgot Password</span>
                        </p>
                    ) : (
                        <p>
                            Already have an account? <span className="links" onClick={() => setCurrState(2)}>Login here</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;