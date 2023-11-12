import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../styles/ToTopStyle.css";

function ToTop() {
    // Deklarimi i states nepermjet Hooks
    const [showButton, setShowButton] = useState(false);

    // Krijojme funksionin handleScroll ku nese distanca e scroll-it nga fillimi i faqes eshte me e madhe se 300 piksela, shfaq butonin top-up, nese jo nuk e shfaq
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    // Krijojme funksionin i cili aktivizohet me klikimin e butonit to-top
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