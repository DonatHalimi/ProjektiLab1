import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillCircleFill } from "react-icons/bs";
import Product from "./Product";
import "./SliderStyle.css";
import "./HomeStyle.css";
import Navbar from "./Navbar";

// Deklarimi i funksionit Home
function Home() {

    // Deklarimi i variables products dhe funksionit setProducts si useState
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:6001/api/product")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);


    // Krijimi i nje array me source te fotove per slider
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

    // Perditesimi i indexit te slideve
    const [currentIndex, setCurrentIndex] = useState(0);

    // Funksioni per kthimin ne slide-in paraprak
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    // Funksioni per te shkuar te slide-i i ardhshem
    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
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

    // Renderimi i HTML per produkte ne main page
    return (
        <>
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

            <div className="home-container">
                <h1>Featured Products</h1>
                <div className="product-list">
                    {products.map((product) => (
                        <Product
                            key={product.idproduct}
                            idproduct={product.idproduct}
                            emri={product.Emri}
                            detajet={product.Detajet}
                            kategoria={product.Kategoria}
                            fotoSource={product.FotoSource}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;