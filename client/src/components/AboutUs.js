import React from "react";
import Navbar from "./Navbar";
import { IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";
import AboutUsFoto1 from '../img/AboutUsFoto.jpg';
import AboutUsFoto2 from '../img/AboutUsFoto2.jpg';
import { Fade } from "react-reveal";
import Footer from "./Footer";
import "../styles/AboutUsStyle.css";

const AboutUs = () => {
    return (
        <>
            <Navbar />

            <Fade bottom>
                <div className="about-us">
                    <h1>About Us</h1>
                    <img src={AboutUsFoto1} alt="AboutUs" className="about-us-image-1" />

                    <p className="first-paragraph">
                        At Ruby, we are passionate about providing you with the ultimate online shopping experience. We are an exclusive clothing company that offers a wide range of trendy and stylish fashion pieces to elevate your wardrobe.
                    </p>
                    <p className="first-paragraph">
                        Our mission is to help you discover and express your unique sense of style. We carefully curate our collection to ensure that you have access to the latest fashion trends, ensuring that you always stay ahead of the curve.
                    </p>
                    <p className="first-paragraph">
                        With Ruby, you can shop with confidence, knowing that our team is dedicated to delivering high-quality products and exceptional customer service. We strive to exceed your expectations and make your shopping journey enjoyable and seamless.
                    </p>
                </div >
            </Fade>

            <Fade bottom>
                <Fade spy={true} offset={80}>
                    <div className="about-us">
                        <img src={AboutUsFoto2} alt="AboutUs" className="about-us-image-2" />

                        <p className="second-paragraph">
                            Join our growing community of fashion enthusiasts and explore our diverse selection of clothing and accessories. Whether you're looking for everyday essentials or statement pieces for special occasions, Ruby has got you covered.
                        </p>
                        <p className="second-paragraph">
                            Thank you for choosing Ruby as your preferred online shopping destination. We look forward to serving you and helping you express your unique style effortlessly.
                        </p>
                        <p className="second-paragraph">
                            Discover our curated collection of fashion-forward products that are designed to elevate your style. Whether you're aiming for a casual look or dressing up for a special occasion, our exquisite range of clothing and accessories will empower you to make a statement and express your individuality with confidence.                        </p>
                    </div>

                    <div className="shop-now">
                        <Link to="/" className="gradient-button">
                            <IoMdCart className="icon" />
                            Shop Now
                        </Link>
                    </div>
                </Fade>
            </Fade>

            <Footer />
        </>
    );
};

export default AboutUs;