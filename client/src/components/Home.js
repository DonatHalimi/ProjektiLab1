import React, { useState, useEffect } from "react";
import Product from "./Product";
import "./SliderStyle.css";
import "./HomeStyle.css";
import Navbar from "./Navbar";
import Slider from "./Slider";
import Footer from "./Footer";
import { product_card } from "./ProductData";

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

    const listItems = product_card.map((item =>
        <div className="card" key={item.id}>
            <div className="card_img">
                <img src={item.thumb}></img>
            </div>
            <div className="card_header">
                <h2>{item.product_name}</h2>
                <p>{item.description}</p>
                <p className="price"> {item.price} <span>{item.currency}</span> </p>
                <div className="buton" ><i class="fa-solid fa-heart"></i></div>
                <div className="btn" ><i class="fa-solid fa-shopping-cart"></i></div>
                
            </div>
        </div>
    )
    );

    // Renderimi i HTML per produkte ne main page
    return (
        <>

        {/* Thirrja e komponenteve te Navbar dhe Slider ne Home.js */}
            <Navbar />
            <Slider />

            <div>
                <h1>Featured Products</h1>
                <div className="main-content" style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap"
                }}>
                    {listItems}
                </div>
            </div>
            <Footer/>


            {/* <div className="home-container">
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
            </div> */}
        </>
    );
}

export default Home;