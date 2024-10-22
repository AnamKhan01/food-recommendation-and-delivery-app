import React, { useState, useContext } from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { StoreContext } from '../Grocery/Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Footer = () => {
  const { url, token } = useContext(StoreContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleFeedback = async (event) => {
    event.preventDefault();
    if (!token) {
      toast.error('Please log in to submit feedback.');
      return;
    }

    try {
      const response = await axios.post(`${url}/api/user/feedback`, {
        name,
        email,
        feedback,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Error sending feedback. Please try again.');
    }
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className="shop-pattern">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
          <path fill="#fee484" fillOpacity="1" d="M0,192L60,181.3C120,171,240,149,360,122.7C480,96,600,64,720,74.7C840,85,960,139,1080,138.7C1200,139,1320,85,1380,58.7L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </div>

      <footer className="footer-container">
        <div className="footer-top">
          <div className="footer-main">
            <div className="footer-row">
              <div className="query-section">
                <h3 className="get-in-touch">Get in Touch</h3>
                <p className="question">Have questions in mind?</p>
                <form className="query-form" method="post" onSubmit={handleFeedback}>
                  <div className="name-email-feedback">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="query-name"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      name="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="query-mail"
                      placeholder="Email"
                    />
                  </div>
                  <input
                    type="text"
                    name="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="query-question"
                    placeholder="Your Query"
                  />
                  <button className="submit-button" type="submit" disabled={!token}>
                    Submit
                  </button>
                </form>
              </div>

              <div className="social-container">
                <div className="social-icon">
                  <div onClick={() => handleSocialClick('https://www.facebook.com')}>
                    <FaFacebookF />
                  </div>
                  <div onClick={() => handleSocialClick('https://www.instagram.com')}>
                    <FaInstagram />
                  </div>
                  <div onClick={() => handleSocialClick('https://youtube.com/@flashfeast-s3v?si=mRtxNPfFMWLVV6oM')}>
                    <FaYoutube />
                  </div>
                  <div onClick={() => handleSocialClick('https://www.pinterest.com')}>
                    <FaPinterestP />
                  </div>
                </div>
              </div>

              <div className="copyright-tag">
                <p className="copyright">© FlashFeast 2024 All rights reserved.</p>
              </div>
            </div>
          </div>
          <div className="footer-bg"></div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
