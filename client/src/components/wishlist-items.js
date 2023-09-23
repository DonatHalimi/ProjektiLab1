import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../context/wishlist-context';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shop-context';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import '../styles/WishlistItemsStyle.css';
import '../styles/ProductStyle.css'

function WishlistItem(props) {
    const wishlist = useContext(WishlistContext);
    const cart = useContext(ShopContext);
    const { products } = props;

    const [showAlertCart, setShowAlertCart] = useState(false);
    const [showAlertWishlist, setShowAlertWishlist] = useState(false);

    const id = props.id;
    const product = products.find((product) => product.id === id);

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
        setShowAlertWishlist(true);

        setTimeout(() => {
            setShowAlertWishlist(false);
        }, 5000);
    };

    const Cmimi = parseFloat(product.Cmimi).toFixed(2);

    console.log(products);
    console.log(typeof product.Cmimi);

    // Renderimi i HTML formes per shfaqjen e Adminit dashboard
    return (
        <>
            <div className="product-container" style={{ marginBottom: "-250px", marginRight: "10px" }}>
                <div className="product" key={product.id}>
                    <div className="card">
                        <Link to={`/product/${product.id}`} className="product-details-link">

                            <div className="cardImg">
                                <img src={`data:image/jpeg;base64,${product.Foto.toString('base64')}`} alt="Product" id='photo' />
                            </div>
                            <div className="card_header">
                                <h3>{product.Emri}</h3>
                                <p className="price">{product.Valuta}{product.Cmimi}</p>
                            </div>
                        </Link>

                        {/* Butonat per me shtu produktin ne Cart & Wishlist */}
                        <button className="cartButton" onClick={handleAddOneToCart} title='Add To Cart'>
                            <AiOutlineShoppingCart style={{ color: "black", fontSize: "18px" }} />
                        </button>

                        <button className="wishlistButton" onClick={handleRemoveFromWishlist} title='Remove From Wishlist'>
                            <BsTrash3 style={{ color: "black", fontSize: "18px", fontWeight: "normal" }} />
                        </button>
                    </div>
                </div>
            </div >

            {/* Thirrja e funksionit per me shfaq mesazhin e konfirmimit te shtimit te produktit ne Cart & Wishlist */}
            {
                showAlertCart && (
                    <div className="alertCart">
                        <Link to="/Cart" className="cartLink">
                            <p>Produkti është shtuar në shportë me sukses!</p>
                        </Link>
                        <button className="cancelPopupButtonCart" onClick={() => setShowAlertCart(false)}>
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                )
            }

            {
                showAlertWishlist && (
                    <div className="alertWishlist">
                        <Link to="/Wishlist" className="wishlistLink">
                            <p>Produkti është shtuar në wishlist me sukses!</p>
                        </Link>
                        <button className="cancelPopupButtonWishlist" onClick={() => setShowAlertWishlist(false)}>
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                )
            }
        </>
    );
}

export default WishlistItem;