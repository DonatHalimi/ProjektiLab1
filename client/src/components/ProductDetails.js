import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link, useParams } from 'react-router-dom';
import { ShopContext } from "../context/shop-context";
import { WishlistContext } from "../context/wishlist-context";
import { getProductData } from "./ProductData";
// import CartItem from './cart-items';
// import Footer from '../Pages/Footer';
import "../styles/ProductDetailsStyle.css";

function ProductDetails() {
    const { id } = useParams();
    const product = getProductData(id);
    const cart = useContext(ShopContext);
    const wishlist = useContext(WishlistContext);

    const [fotoUrl, setFotoUrl] = useState("");
    const [showAlertCart, setShowAlertCart] = useState(false);
    const [showAlertWishlist, setShowAlertWishlist] = useState(false);

    const [selectedSize, setSelectedSize] = useState("");

    // Efekti qe ndryshon URL-ne e fotos bazuar ne llojin e thumbnail-it te produktit
    useEffect(() => {
        if (product.thumb instanceof Blob) {
            setFotoUrl(URL.createObjectURL(product.thumb));
        } else if (typeof product.thumb === "string") {
            setFotoUrl(product.thumb);
        }
    }, [product.thumb]);

    // Funksioni qe shton nje produkt ne shporte
    const handleAddToCart = () => {
        cart.addToCart(product.id);
        setShowAlertCart(true);

        setTimeout(() => {
            setShowAlertCart(false);
        }, 5000);
    };

    // Funksioni qe shton nje produkt ne listën e dëshirave
    const handleAddToWishlist = () => {
        wishlist.addItemToWishlist(product.id);

        setShowAlertWishlist(true);

        setTimeout(() => {
            setShowAlertWishlist(false);
        }, 5000);
    };

    if (!product) {
        // Rendero gjendjen e ngarkimit ose nje mesazh gabimi
        return <div>Loading...</div>;
    }

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    return (
        <>
            <Navbar />

            <div className="productDetails" key={product.id}>
                <div className="product-details-container">
                    <div className="cardImg product-details-image">
                        <img className='foto' src={fotoUrl} alt="Product" />
                    </div>
                    <div className="product-details-content">
                        <h1 className="product-details-name">{product.product_name}</h1>

                        <div className="product-details-rating">
                            <span>Rating: </span>
                            <i className="fa-solid fa-star" style={{ color: '#ffea00' }}></i>
                            <i className="fa-solid fa-star" style={{ color: '#ffea00' }}></i>
                            <i className="fa-solid fa-star" style={{ color: '#ffea00' }}></i>
                            <i className="fa-solid fa-star" style={{ color: '#ffea00' }}></i>
                            <i class="fa-regular fa-star-half-stroke" style={{ color: '#ffea00' }}></i>
                        </div>

                        <p className="product-details-description">{product.description}</p>

                        <p>{product.quantity}</p>
                        <p className="product-details-price">{product.currency}{product.price}</p>

                        <div className="product-details-size">
                            <label htmlFor="size">Size:</label>
                            <select id="size" value={selectedSize} onChange={handleSizeChange}>
                                <option disabled value="">Select Size</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                        </div>

                        <div className="product-details-buttons">
                            <button className="cartButton" onClick={handleAddToCart} title='Add To Cart'>
                                <i className="fa-solid fa-shopping-cart"></i>
                            </button>
                            <button className="wishlistButton" onClick={handleAddToWishlist} title='Add To Wishlist'>
                                <i className="fa-solid fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showAlertCart && (
                <div className="alertCart">
                    <Link to="/Cart" className="cartLink">
                        <p>Produkti është shtuar në cart me sukses! </p>
                    </Link>
                    <button className="cancelPopupButtonCart" onClick={() => setShowAlertCart(false)}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}

            {showAlertWishlist && (
                <div className="alertWishlist">
                    <Link to="/Wishlist" className="wishlistLink">
                        <p>Produkti është shtuar në wishlist me sukses! </p>
                    </Link>
                    <button className="cancelPopupButtonWishlist" onClick={() => setShowAlertWishlist(false)}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}

            {/* <Footer /> */}
        </>
    );
}

export default ProductDetails;
