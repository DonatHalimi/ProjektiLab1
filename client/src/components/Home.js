import React, { useState, useEffect } from "react";
import Product from "./Product";
import SliderStyle from "../styles/SliderStyle.css";
import HomeStyle from "../styles/HomeStyle.css";
import Navbar from "./Navbar";
import Slider from "./Slider";
import { PRODUCTS} from "./ProductData";
import Footer from "./Footer";

// Deklarimi i funksionit Home
function Home() {

    // Deklarimi i variables products dhe funksionit setProducts si useState (paperfundume)
    const [products, setProducts] = useState([]);

    // Krijimi i nje funksioni per te kerkuar te dhenat nga API i produktit (paperfundume)
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
            }
        };

        fetchProducts();
    }, []);

    // Krijimi i nje vargu me te dhenat e produktit duke perdorur metoden map prej vargut product_card ne klasen ProductData
  /*  const listItems = PRODUCTS.map((item =>
        <div className="card" key={item.id}>
            <div className="card_img">
                <img src={item.thumb}></img>
            </div>
            <div className="card_header">
                <h2>{item.product_name}</h2>
                <p>{item.description}</p>
                <p className="price"> {item.price} <span>{item.currency}</span> </p>
                
                <div className="butonat">
                    <div className="buton" ><i class="fa-solid fa-heart"></i></div>
                    <div className="btn" ><i class="fa-solid fa-shopping-cart"></i></div>
                </div>
            </div>
        </div>
    )
    );
*/
    // Renderimi i HTML per produkte ne main page
    return (
        <>
            {/* Thirrja e komponenteve te Navbar dhe Slider */}
            <Navbar />
            <Slider />

         
        

            <div>
                <h1>Featured Products</h1>
                <div className="main-content" style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",

                }}>
               
                    {PRODUCTS.map((product,idx) => {
                        
                        
                        return (
                            <div className="products-container">
                            <Product key={idx} data={product}/>
                            </div>
                        );
                    })}
                </div>
            </div>
         

            {/* Thirrja e komponentit te Footer */}
            <Footer />
        </>
    );
}

export default Home;