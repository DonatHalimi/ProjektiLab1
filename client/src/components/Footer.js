import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import LogoImage from '../img/Logo.png'
import 'font-awesome/css/font-awesome.min.css'
import "../styles/FooterStyle.css"

const Footer = () => {
    return (
        <footer className="footer-distributed">
            <div className="footer-left">
                <img src={LogoImage} alt="Logo" style={{ width: '150px', height: 'auto', marginBottom: '10px' }} />

                {/* Linkat e navbar-it */}
                <p className="footer-links">
                    <a href="/Home" className="link-1">Home</a>
                    <a href="/Wishlist">Wishlist</a>
                    <a href="/Cart">Cart</a>
                    <a href="/Contact">Contact</a>
                    <a href="/FAQs">FAQs</a>
                    <a href="/AboutUs">About</a>
                    <a href="/LogIn">Log In</a>
                </p>
                <p className="footer-company-name">Ruby © 2023</p>
            </div>

            {/* Kontakti */}
            <div className="footer-center">
                <div>
                    <i className="fa fa-map-marker"></i>
                    <p><span>10000 Bulevardi Bill Klinton</span> Prishtinë, Kosovë</p>
                </div>
                <div>
                    <i className="fa fa-phone"></i>
                    <p>+383 38 541 400</p>
                </div>
                <div>
                    <i className="fa fa-envelope"></i>
                    <p><a href="mailto:support@ruby.com">support@ruby.com</a></p>
                </div>
            </div>

            {/* About company */}
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
                    <a href="https://github.com/DonatHalimi/ProjektiLab1" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer