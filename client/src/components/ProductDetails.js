import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { ShopContext } from "../context/shop-context";
import { WishlistContext } from "../context/wishlist-context";
import { getProductData } from "./ProductData";
import CartItem from './cart-items';
import Footer from '../Pages/Footer';
import "../styles/ProductDetailsStyle.css";


function ProductDetails() {
    const { id } = useParams();
    const product = getProductData(id);
    const cart = useContext(ShopContext);
    const wishlist = useContext(WishlistContext);

    const [fotoUrl, setFotoUrl] = useState("");
    const [showAlertCart, setShowAlertCart] = useState(false);
    const [showAlertWishlist, setShowAlertWishlist] = useState(false);

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
                        <p className="product-details-description">{product.description}</p>

                        <p>{product.quantity}</p>
                        <p className="product-details-price">{product.currency}{product.price}</p>

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
            </div >

            {showAlertCart && (
                <div className="alertCart">
                    <p>Produkti është shtuar në cart me sukses! </p>
                    <button className="cancelPopupButtonCart" onClick={() => setShowAlertCart(false)}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )
            }

            {
                showAlertWishlist && (
                    <div className="alertWishlist">
                        <p>Produkti është shtuar në wishlist me sukses! </p>
                        <button className="cancelPopupButtonWishlist" onClick={() => setShowAlertWishlist(false)}>
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                )
            }

            {/* <Footer /> */}

        </>
    );
}

export default ProductDetails;