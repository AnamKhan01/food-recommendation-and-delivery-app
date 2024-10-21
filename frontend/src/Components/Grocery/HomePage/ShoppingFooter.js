import React from 'react';
import './ShoppingFooter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { AiFillInstagram } from "react-icons/ai";

const ShoppingFooter = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} FlashFeast All Rights Reserved.</p>
                <div className="footer-icons">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <AiFillInstagram className='insta-icon' />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default ShoppingFooter;
