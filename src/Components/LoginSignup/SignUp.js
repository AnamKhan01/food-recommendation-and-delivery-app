import React, { useState } from "react";
import './Login.css';
import cancel from './crossed.png';
import crispe from './cycle.gif';
import carrot from './carrot.gif';
import google from './google-symbol.png';

const SignUp = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState(1);

    return (
        <div>
            <div className="login-overlay">
                <div className="login-popup">
                    {currState === 1 ? <img className="signup-bg" src={crispe} alt=""></img> : <img className="login-bg" src={carrot} alt='' />}
                    <div className="form-content">
                        <img className="cancel-icon" src={cancel} alt="cancel" onClick={() => setShowLogin(false)} />
                        {currState === 1 ? <h1>Sign Up</h1> : <h1>Login</h1>}
                        <form>
                            {currState === 1 ?
                                <>
                                    <input type="name" placeholder="Username" required />
                                    <input type="number" placeholder="Contact Number" required />
                                </>
                                : <></>
                            }
                            <input type="email" placeholder="Email" required />
                            <input type="password" placeholder="Password" required />
                            {currState === 1
                                ?
                                <div>
                                    <input type="checkbox" required />
                                    <p>I agree to the terms of use and privacy policy.</p>
                                </div>
                                : <></>}
                            <input type="submit" value={currState === 2 ? "Login" : "Create Account"} />
                            <div className="google-container">
                                <img className="google-logo" src={google} alt=""></img>
                                <input className="google-button" type="button" value={currState === 2 ? "Log in with Google" : "Sign up with Google"} />
                            </div>
                        </form>

                        {/* <p>OR</p>
                <button>{currState === "Sign Up" ? "Create Account" : "Login"}</button> */}


                        {currState === 2 ? (
                            <p className="links-container">
                                <span className="links" onClick={() => setCurrState(1)}>Sign Up Now</span><span onClick={() => setShowLogin(3)} className="forgot-pwd">Forgot Password</span>
                            </p>
                        ) : (
                            <p>
                                Already have an account? <span className="links" onClick={() => setCurrState(2)}>Login here</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
