import React from "react";
import Navbar from "./Navbar";
import { IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";
import AboutUsFoto from '../img/AboutUsFoto.jpg';
import "../styles/AboutUsStyle.css";
import Footer from "./Footer";

const AboutUs = () => {
    return (
        <>
            <Navbar />

            <div className="about-us">
                <h1>About Us</h1>
                <img src={AboutUsFoto} alt="AboutUs" className="about-us-image"></img>
                <p>
                    At Ruby, we are passionate about providing you with the ultimate online shopping experience. We are an exclusive clothing company that offers a wide range of trendy and stylish fashion pieces to elevate your wardrobe.
                </p>
                <p>
                    Our mission is to help you discover and express your unique sense of style. We carefully curate our collection to ensure that you have access to the latest fashion trends, ensuring that you always stay ahead of the curve.
                </p>
                <p>
                    With Ruby, you can shop with confidence, knowing that our team is dedicated to delivering high-quality products and exceptional customer service. We strive to exceed your expectations and make your shopping journey enjoyable and seamless.
                </p>
                <p>
                    Join our growing community of fashion enthusiasts and explore our diverse selection of clothing and accessories. Whether you're looking for everyday essentials or statement pieces for special occasions, Ruby has got you covered.
                </p>
                <p>
                    Thank you for choosing Ruby as your preferred online shopping destination. We look forward to serving you and helping you express your unique style effortlessly.
                </p>
            </div>
            <div className="shop-now">
                <Link to="/" className="gradient-button">
                    <IoMdCart className="icon" />
                    Shop Now
                </Link>
            </div>

            <Footer />
        </>
    );
};

export default AboutUs;