import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SliderStyle.css";

function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [offsetX, setOffsetX] = useState(0);

    // Krijojme nje useEffect per te marr te dhenat e slideshow prej databazes
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

    // Krijojme nje useEffect per levizjen automatike te slideshow-it duke u bazuar ne zgjatjen e --slide-duration
    useEffect(() => {
        const intervalId = setInterval(nextSlide, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--slide-duration'))); // --slide-duration gjendet ne file-in SliderStyle.css
        return () => clearInterval(intervalId);
    }, [currentIndex]);

    // Krijojme nje funksion i cili thirret kur shtypet butoni i mausit ne komponentin e slider-it, e vendos variablen dragging ne true per me tregu se dragging ka filluar
    const handleMouseDown = (e) => {
        setDragging(true);
        setStartX(e.clientX);
    };

    // Krijojme nje funksion i cili thirret kur leviz butoni i mausit ne komponentin e slider-it, dhe pastaj kalkulon distancen e levizjes duke zbritur vleren fillestare te x me vleren e tanishme
    const handleMouseMove = (e) => {
        if (!dragging) return;
        const currentX = e.clientX;
        const deltaX = currentX - startX;
        setOffsetX(deltaX);
    };

    // Krijojme nje funksion i cili thirret kur butoni i mausit lirohet, e vendos variablen dragging ne false per me tregu se nuk eshte duke ndodhur me dragging, dhe pastaj nese offsetX eshte < -50 shkon ne slide-in e ardhshem dhe e kunderta kur eshte > 50
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

            <div className="slider-content">
                {slides.map((slide, slideIndex) => (
                    <div key={slide.idslideshow} onClick={() => setCurrentIndex(slideIndex)} className={`slider-button ${currentIndex === slideIndex ? "active" : ""}`}>
                        {/* Progress bar */}
                        <span className="custom-line">
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