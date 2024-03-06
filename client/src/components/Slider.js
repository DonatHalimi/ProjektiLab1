import React, { useState, useEffect } from "react";
import axios from "axios";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

function Slider() {
    const [slides, setSlides] = useState([]);

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

    const slideStyle = {
        width: "100%",
        height: "800px",
        objectFit: "cover",
        marginTop: "50px",
    };

    return (
        <Splide>
            {slides.map((slide) => (
                <SplideSlide key={slide.idslideshow}>
                    <img style={slideStyle} src={`data:image/jpeg;base64,${slide.Foto}`} alt={`Slide ${slide.idslideshow}`} />
                </SplideSlide>
            ))}
        </Splide>
    );
}

export default Slider;
