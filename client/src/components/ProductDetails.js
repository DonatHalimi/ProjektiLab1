import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function ProductDetails(props) {
    const product = props.product;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:6001/api/product/get/${product.id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [product.id]);

    if (!products) {
        // Render loading state or error message if the product data is not available
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className='details-container'>
                <div className="product-image">
                    <img src={`data:image/jpeg;base64,${product.Foto.toString('base64')}`} alt="Product" id='photo' />
                </div>
                <div className="product-info">
                    <h2>{products.Emri}</h2>
                    <p className="price">
                        {products.Valuta}
                        {products.Cmimi}
                    </p>
                    <p>{products.Detajet}</p>
                </div>
                <div className="product-buttons">
                    <button className="cartButton">
                        <i className="fa-solid fa-shopping-cart"></i> Add To Cart
                    </button>
                    <button className="wishlistButton">
                        <i className="fa-solid fa-heart"></i> Add To Wishlist
                    </button>
                </div>
            </div>
            <div style={{ height: "500px" }}></div>
            <Footer />
        </>
    );
}

export default ProductDetails;
