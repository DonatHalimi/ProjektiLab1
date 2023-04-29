import React from "react";
import "./aboutUsStyle.css";
import Navbar from "../components/Navbar";

function AboutPage() {
  return (
    <>
    <Navbar/>
    <div className="about-container">
      <h1 id="abt">About Us</h1>
      <p id="info" >Welcome to Ruby, your one-stop-shop for all things fashion and lifestyle. We offer a carefully curated selection of apparel, accessories, and beauty products for women, men, and kids. Our products are of high quality, stylish, and affordable, ensuring that everyone can find something they love.We are passionate about fashion and committed to staying ahead of the game.Our team of experienced buyers, stylists, and designers are constantly on the lookout for the latest trends and emerging brands to add to our collection. We believe that customer satisfaction is key to our success and are dedicated to providing excellent customer service and support.At Ruby, we make online shopping easy and convenient with our user-friendly website, fast and reliable shipping, and hassle-free returns and exchanges. Our goal is to provide our customers with an exceptional shopping experience that is personalized, fun, and convenient. Thank you for choosing Ruby as your fashion destination, we look forward to serving you!</p>
    </div>
    </>
  );
}

export default AboutPage;