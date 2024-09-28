import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <div className='shop-pattern'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200"><path fill="#fee484" fill-opacity="1" d="M0,192L60,181.3C120,171,240,149,360,122.7C480,96,600,64,720,74.7C840,85,960,139,1080,138.7C1200,139,1320,85,1380,58.7L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
      </div>

      <footer className="footer-container">
        <div className="footer-top">
          <div className="footer-main">
            <div className="footer-row">
              <div className="query-section">
                <h3 className="get-in-touch">Get in Touch</h3>
                <p className='question'>Have questions in mind?</p>
                <form className="query-form" method="post" noValidate>
                  <input type="text" name="EMAIL" className="query-question" />
                  <button className="submit-button" type="submit">Submit</button>
                </form>
              </div>

              <div className="social-container">
                <div className="social-icon">
                  <div><FaFacebookF /></div>
                  <div><FaInstagram /></div>
                  <div><FaYoutube /></div>
                  <div><FaPinterestP /></div>
                </div>
              </div>
              <div className='copyright-tag'>
                <p className="copyright">© FlashFeast 2024 All rights reserved.</p>
              </div>
            </div>
          </div>
          <div className="footer-bg">
            {/* <img src={cup} alt='' className="footer-bg-img"></img> */}
          </div>
        </div>


      </footer>
    </>
  );
};

export default Footer;
