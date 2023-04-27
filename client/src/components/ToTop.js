import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./ToTopStyle.css";

function ToTop() {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const handleClick = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    window.addEventListener("scroll", handleScroll);

    return (
        <>
            <div className="home"></div>
            {showButton && (
                <button className="to-top-button" onClick={handleClick}><FaArrowUp /></button>
            )}
        </>
    );
}

export default ToTop;