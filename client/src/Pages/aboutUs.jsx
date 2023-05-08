import React from "react";
import "./aboutUsStyle.css";
import Navbar from "../components/Navbar";
import aboutFoto from "../img/aboutfoto.jpg";


// Definimi i nje funksioni per about us page
function AboutPage() {
  return (
    <>
      <Navbar />
      <img id="fotoabt" src={aboutFoto} alt="Ruby logo" /> { }
      <h1 id="abt">About Us</h1>

      <div className="about-container">
        <p id="info" >Welcome to Ruby, your one-stop-shop for all things fashion and lifestyle. We offer a carefully curated selection of apparel, accessories, and beauty products for women, men, and kids. </p>
        <p id="info1">Our products are of high quality, stylish, and affordable, ensuring that everyone can find something they love.We are passionate about fashion and committed to staying ahead of the game.</p>
        <br></br>
        <p id="info2">At Ruby, we make online shopping easy and convenient with our user-friendly website, fast and reliable shipping, and hassle-free returns and exchanges. </p>
        <p id="info3">Our goal is to provide our customers with an exceptional shopping experience that is personalized, fun, and convenient.</p>
        <br></br>
        <br></br>
        <p id="info4">Thank you for choosing Ruby as your fashion destination, we look forward to serving you!</p>
      </div>
    </>
  );
}

export default AboutPage;