import React, { useState, useEffect  } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillCircleFill } from "react-icons/bs";
import "./SliderStyle.css";

function Slider() {
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

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000); //Koha e ndryshimit te slide-it (ms)

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
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
    )
}

export default Slider;