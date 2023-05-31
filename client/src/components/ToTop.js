import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../styles/ToTopStyle.css";

function ToTop() {
    // Deklarimi i states nepermjet Hooks
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    // Funksioni qe aktivizohet me klikimin e butonit to-top
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Event listener per scroll (Pret qe useri te bej scroll ne faqe)
    window.addEventListener("scroll", handleScroll);

    // Renderimi i HTML per shfaqjen e ToTop button
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