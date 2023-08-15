import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:6001/api/product/get/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Fetched product data:", data);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        // Render loading state if the product data is not available yet
        return <div>Loading...</div>;
    }

    const imageSrc = product.Foto && product.Foto.data ? `data:image/jpeg;base64,${product.Foto.data.toString('base64')}` : '';
    console.log('imageSrc:', imageSrc);

    return (
        <>
            <Navbar />
            <div className='details-container'>
                <div className="product-image">
                    {imageSrc && (
                        <img src={imageSrc} alt="Product" id='photo' />
                    )}
                </div>
                <div className="product-info">
                    <h2>{product.Emri}</h2>
                    <p className="price">
                        {product.Valuta} {product.Cmimi}
                    </p>
                    <p>{product.Detajet}</p>
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
