import React from "react";
import "./aboutUsStyle.css";
import Navbar from "../components/Navbar";

function AboutPage() {
  return (
    <>
    <Navbar/>
    <div className="about-container">
      <h1>About Us</h1>
      <p>We are a company that specializes in creating React applications.</p>
    </div>
    </>
  );
}

export default AboutPage;