import React from 'react';
import './FooterStyle.css';


// Definimi i nje funksioni per krijimin e Footerit
const Footer = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // Renderimi i HTML per footer-in ne main page
  return (
    <>
      <footer style={{ backgroundColor: "#222", color: "#fff" }}>
        <div className="container">
          <div className="row">
            <div className="abotUs">
              <h4>About Us</h4>
              <p className="paragrafi">We are an e-commerce website that specializes in selling high-quality apparel products at affordable prices.</p>
            </div>
            <div className="contact">
              <h4 id="contact-h4">Contact Us</h4>
              <p className="paragrafi">Email: info@ecommerce.com<br />Phone: 044-123-456<br />Address: Lagjja Kalabria,10000 Prishtine, Kosovo</p>
            </div>
            <div className="follow">
              <h4>Follow Us</h4>
              <ul className="social-icons">
                <li><a href="https://www.facebook.com" target="_blank"><i className="fa-brands fa-facebook"></i></a></li>
                <li><a href="https://twitter.com" target="_blank"><i className="fa-brands fa-twitter"></i></a></li>
                <li><a href="https://www.instagram.com" target="_blank"><i className="fa-brands fa-instagram"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;