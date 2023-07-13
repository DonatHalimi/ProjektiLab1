import React from 'react';
import LogoImage from '../img/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import 'font-awesome/css/font-awesome.min.css';
import "../styles/FooterStyle.css";

const Footer = () => {
    return (
        
        <footer className="footer-distributed">
            <div className="footer-left">
                <img src={LogoImage} alt="Logo" style={{ width: '150px', height: 'auto', marginBottom: '10px' }} />

                <p className="footer-links">
                    <a href="/" className="link-1">Home</a>
                    <a href="/Categories">Categories</a>
                    <a href="/Wishlist">Wishlist</a>
                    <a href="/Cart">Cart</a>
                    <a href="/AboutUs">About</a>
                    <a href="Log in">Log in</a>
                </p>
                <p className="footer-company-name">Ruby © 2023</p>
            </div>
            <div className="footer-center">
                <div>
                    <i className="fa fa-map-marker"></i>
                    <p><span>10000 Bulevardi Bill Klinton</span> Prishtinë, Kosovë</p>
                </div>
                <div>
                    <i className="fa fa-phone"></i>
                    <p>+383 44 800 900</p>
                </div>
                <div>
                    <i className="fa fa-envelope"></i>
                    <p><a href="mailto:support@ruby.com">support@ruby.com</a></p>
                </div>
            </div>

            <div className="footer-right">
                <p className="footer-company-about">
                    <span>About the company</span>
                    Ruby - Your ultimate online destination for trendy fashion. Discover stylish clothing and accessories. Enjoy a seamless shopping experience with guaranteed satisfaction.
                </p>
                <div className="footer-icons">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;