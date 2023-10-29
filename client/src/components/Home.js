import React, { useState, useEffect } from "react";
import Product from "./Product";
import Navbar from "./Navbar";
import Slider from "./Slider";
import Footer from "../components/Footer";
import "../styles/HomeStyle.css";

async function fetchSliderData(setSliderData) {
    try {
        const response = await fetch("http://localhost:6001/api/slider/get");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSliderData(data);
    } catch (error) {
        console.error("Error fetching slider data:", error);
    }
}

// Deklarimi i funksionit Home
function Home() {
    const [products, setProducts] = useState([]);
    const [sliderData, setSliderData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    // Krijimi i nje funksioni per te marr te dhenat e produkteve nga databaza
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:6001/api/product/get");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); // Mark loading as false when data is loaded or error occurs
            }
        };

        fetchProducts();
        fetchSliderData(setSliderData);

        document.title = "Ruby | Home";
    }, []);

    // Conditional rendering based on loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {/* Thirrja e komponenteve te Navbar dhe Slider */}
            <Navbar />
            <Slider data={sliderData} />

            {/* Krijimi i kartes se produkteve ne Home page */}
            <div>
                <div className="main-content">
                    {/* Render a Product component for each item in the products array */}
                    {products.map((product) => (
                        <div key={product.id} className="products-container">
                            <Product product={product} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="empty-div"></div>

            <Footer />
        </>
    );
}

export default Home;
