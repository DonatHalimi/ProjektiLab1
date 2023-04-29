import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillCircleFill } from "react-icons/bs";
import "./SliderStyle.css";
import Navbar from "./Navbar";

// Deklarimi i funksionit Home
function Home() {

    // Inicializimi i vargut me path-a te fotove per slider
    const slides = [
        {
            src: require("../img/slider-1.jpg")
        },
        {
            src: require("../img/slider-2.jpg")
        },
        {
            src: require("../img/slider-1.jpg")
        },
        {
            src: require("../img/slider-2.jpg")
        },
        {
            src: require("../img/slider-1.jpg")
        },
    ];

    // Perdorimi i hooks useState per ta inicializuar currentIndex me 0
    const [currentIndex, setCurrentIndex] = useState(0);

    // Funksioni prevSlide per ndrrimin e sliderit ne foto paraardhese
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    // Funksioni nextSlide per ndrrimin e sliderit ne foto pasardhese
    const nextSlide = () => { 
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

     // Funksioni goToSlide per kalimin e sliderit ne nje foto te caktuar
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <>
            {/*Thirrja e komponentit te navbar*/ }
            <Navbar />

            <div className="slider">
                <div
                    style={{ backgroundImage: `url(${slides[currentIndex].src})` }}
                    className="slide"
                ></div>

                {/*Shigjeta majte*/}
                <div className="arrow left" onClick={prevSlide}>
                    <IoIosArrowBack size={30} />
                </div>

                {/*Shigjeta djathte*/}
                <div className="arrow right" onClick={nextSlide}>
                    <IoIosArrowForward size={30} />
                </div>

                {/*Butonat*/}
                <div className="slider-buttons">
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className={`slider-button ${currentIndex === slideIndex ? "active" : ""}`}
                        >
                            <BsFillCircleFill />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home;