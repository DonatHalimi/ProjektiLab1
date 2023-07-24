import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../context/wishlist-context';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shop-context';
import '../styles/WishlistItemsStyle.css';

function WishlistItem(props) {
    const wishlist = useContext(WishlistContext);
    const cart = useContext(ShopContext);
    const [products, setProducts] = useState([]);

    const [showAlertCart, setShowAlertCart] = useState(false);
    const [showAlertWishlist, setShowAlertWishlist] = useState(false);

    const id = props.id;
    const product = products.find((product) => product.id === id);

    // Krijimi i nje funksioni per te kerkuar te dhenat nga API i produktit
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

    if (!product) {
        <div>Loading...</div>
        return null;
    }

    const handleAddOneToCart = () => {
        cart.addOneToCart(product.id);
        setShowAlertCart(true);

        setTimeout(() => {
            setShowAlertCart(false);
        }, 5000);
    };

    const handleRemoveFromWishlist = () => {
        wishlist.removeItemFromWishlist(product.id);
        // setShowAlertWishlist(true);

        // setTimeout(() => {
        //     setShowAlertWishlist(false);
        // }, 5000);
    };

    const Cmimi = parseFloat(product.Cmimi).toFixed(2);

    console.log(products);
    console.log(typeof product.Cmimi);

    return (
        <>
            <div className="wishlistItem" key={product.idproduct}>
                <div className="wishlistCard">
                    <div className="wishlistCard_img">
                        <img src={`data:image/jpeg;base64,${product.Foto.toString('base64')}`} alt="Item" />
                    </div>

                    <div className="wishlistCard_header">
                        <h3>{product.Emri}</h3>
                        <p>${Cmimi}</p>
                    </div>

                    {/* Butonat per me shtu produkt ne cart dhe me remove nje product nga wishlista */}
                    <div className="wishlistButtons">
                        <button id='wishlistAddToCartButton' onClick={handleAddOneToCart} title='Add To Cart'>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                        <button id="wishlistRemoveButton" onClick={handleRemoveFromWishlist} title='Remove'>
                            <i className='fa-solid fa-trash-can'></i>
                        </button>
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
                        <p>Produkti është larguar nga wishlist me sukses!</p>
                    </Link>
                    <button className="cancelPopupButtonWishlist" onClick={() => setShowAlertWishlist(false)}>
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}
        </>
    );
}

export default WishlistItem;