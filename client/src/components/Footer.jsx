import React from 'react';
import './footer.css';

const Footer = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Send form data to server or API endpoint
    // You can use Axios or the native Fetch API to send the data
  };

  return (
    <>
    <footer style={{ backgroundColor: "#222", color: "#fff" }}>
  <div className="container">
    <div className="row">
      <div className="abotUs">
        <h4>About Us</h4>
        <p className="paragrafi">We are an e-commerce website that specializes in selling high-quality products at affordable prices.</p>
      </div>
      <div className="contact">
        <h4>Contact Us</h4>
        <p className="paragrafi">Email: info@ecommerce.com<br />Phone: 555-555-5555<br />Address: 123 Main Street, Anytown USA</p>
      </div>
      <div className="follow">
        <h4>Follow Us</h4>
        <ul className="social-icons">
          <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
          <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
          <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>
    </>
  )
}

export default Footer;