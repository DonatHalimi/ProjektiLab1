import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SliderStyle.css";

function Slider() {
    // Perditesimi i indexit te slideve
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [offsetX, setOffsetX] = useState(0);

    useEffect(() => {
        const fetchSlideshowData = async () => {
            try {
                const response = await axios.get(`http://localhost:6001/api/slideshow/get`);
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
        setOffsetX(0);
    };

    // Funksioni per kthimin ne slide-in paraprak
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
        setOffsetX(0);
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--slide-duration'))); // --slide-duration gjendet ne file-in SliderStyle.css
        return () => clearInterval(intervalId);
    }, [currentIndex]);

    const handleMouseDown = (e) => {
        setDragging(true);
        setStartX(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        const currentX = e.clientX;
        const deltaX = currentX - startX;
        setOffsetX(deltaX);
    };

    const handleMouseUp = () => {
        setDragging(false);
        if (offsetX < -50) {
            nextSlide();
        } else if (offsetX > 50) {
            prevSlide();
        }
        setOffsetX(0);
    };

    // Renderimi i HTML per shfaqjen e Slider-it
    return (
        <div className="slider" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            {slides.length > 0 && (
                <div style={{ backgroundImage: `url(data:image/jpeg;base64,${slides[currentIndex].Foto})` }} className="slide" onMouseDown={handleMouseDown} ></div>
            )}

            {/* Progress bar */}
            <div className="slider-content">
                {slides.map((slide, slideIndex) => (
                    <div key={slide.idslideshow} onClick={() => setCurrentIndex(slideIndex)} className={`slider-button ${currentIndex === slideIndex ? "active" : ""}`}>
                        <span className="custom-dot">
                            {currentIndex === slideIndex && (
                                <div className="progress-bar"></div>
                            )}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Slider;
