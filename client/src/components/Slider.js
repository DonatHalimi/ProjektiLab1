import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillCircleFill } from "react-icons/bs";
import SliderStyle from "../styles/SliderStyle.css";

// Definimi i nje funksioni per Slider
function Slider() {
    // Krijimi i nje array me source te fotove per slider
    const slides = [
        {
            src: require("../img/slider-1.jpg")
        },
        {
            src: require("../img/slider-2.jpg")
        },
        {
            src: require("../img/slider-3.jpg")
        },
        {
            src: require("../img/slider-4.jpg")
        },
        {
            src: require("../img/slider-5.jpeg")
        },
    ];

    // Perditesimi i indexit te slideve
    const [currentIndex, setCurrentIndex] = useState(0);

    // Funksioni per te shkuar te slide-i i ardhshem
    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // Funksioni per kthimin ne slide-in paraprak
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    // Funksioni per te shkuar te nje slide me indeks te caktuar
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    // Hook-u useEffect per levizjen automatike te slide-ve per nje interval te caktuar
    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(intervalId);
    }, [currentIndex]);

    // Renderimi i HTML per shfaqjen e Slider-it
    return (
        <div className="slider">
            <div style={{ backgroundImage: `url(${slides[currentIndex].src})` }} className="slide"></div>

            {/* Shigjeta majte */}
            <div className="arrow left" onClick={prevSlide}>
                <IoIosArrowBack size={30} />
            </div>

            {/* Shigjeta djathte */}
            <div className="arrow right" onClick={nextSlide}>
                <IoIosArrowForward size={30} />
            </div>

            {/* Butonat */}
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
    )
};

export default Slider;
