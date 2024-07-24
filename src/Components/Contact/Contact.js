import React from "react";
import './Contact.css';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import { AiFillInstagram } from "react-icons/ai";

const Contact = () => {
    return (
        <div className="contact-container">
            <h2>Have Question in Mind?</h2>
            <h3>Let Us Help You</h3>
            <div className="query-div">
                <input type="text"></input>
                <button type="submit">Submit</button>
            </div>
            <footer className="footer">
                <hr></hr>
                <div className="footer-right">
                    <p>&copy; 2024 company, Inc. All rights reserved.</p>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <AiFillInstagram />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default Contact;