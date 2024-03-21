import React, { useState, useEffect } from "react"

const ToTop = () => {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const handleClick = () => {
        const scrollToTop = () => {
            const currentPosition = window.scrollY
            if (currentPosition > 0) {
                window.requestAnimationFrame(scrollToTop)
                window.scrollTo(0, currentPosition - currentPosition / 10)
            }
        }
        scrollToTop()
    }

    const buttonStyle = {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#33383b",
        color: "#fff",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        display: showButton ? "block" : "none",
        cursor: "pointer",
        width: "60px",
        height: "42px",
    }

    return (
        <button style={buttonStyle} onClick={handleClick}>
            <i className="fas fa-arrow-up"></i>
        </button>
    )
}

export default ToTop