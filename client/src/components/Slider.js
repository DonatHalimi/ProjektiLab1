import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillCircleFill } from "react-icons/bs";
import axios from "axios";
import "../styles/SliderStyle.css";

function Slider() {
    // Perditesimi i indexit te slideve
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        const fetchSlideshowData = async () => {
            try {
                const response = await axios.get("http://localhost:6001/api/slideshow/get");
                setSlides(response.data);
            } catch (error) {
                console.log("Error:", error);
            }
        };

        fetchSlideshowData();
    }, []);

    // Funksioni per me shku ne slide-in e ardhshem
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    };

    // Funksioni per kthimin ne slide-in paraprak
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 4000);
        return () => clearInterval(intervalId);
    }, [currentIndex]);

    // Renderimi i HTML per shfaqjen e Slider-it
    return (
        <div className="slider">
            {slides.length > 0 && (
                <div style={{ backgroundImage: `url(data:image/jpeg;base64,${slides[currentIndex].Foto})` }} className="slide"></div>
            )}

            {/* Shigjeta e majte */}
            <div className="arrow left" onClick={prevSlide}>
                <IoIosArrowBack size={30} />
            </div>

            {/* Shigjeta e djathte */}
            <div className="arrow right" onClick={nextSlide}>
                <IoIosArrowForward size={30} />
            </div>

            {/* Butonat */}
            <div className="slider-buttons">
                {slides.map((slide, slideIndex) => (
                    <div
                        key={slide.idslideshow}
                        onClick={() => setCurrentIndex(slideIndex)}
                        className={`slider-button ${currentIndex === slideIndex ? "active" : ""}`}
                    >
                        <BsFillCircleFill />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Slider;
