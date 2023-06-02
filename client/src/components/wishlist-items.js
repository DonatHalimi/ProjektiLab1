import React, { useContext } from 'react';
import { WishlistContext } from '../context/wishlist-context';
import { getProductData } from './ProductData';
import { ShopContext } from '../context/shop-context';
import '../styles/WishlistItemsStyle.css';

function WishlistItem(props) {
    const wishlist = useContext(WishlistContext);
    const cart = useContext(ShopContext);

    const id = props.id;
    const productData = getProductData(id);
    const fotoUrl = productData.thumb;

    return (
        <div className="wishlistItem">
            <div className="wishlistCard">
                <div className="wishlistCard_img">
                    <img src={fotoUrl} alt="Item" />
                </div>

                <div className="wishlistCard_header">
                    <h3>{productData.product_name}</h3>
                    <p>${productData.price.toFixed(2)}</p>
                </div>

                <div className="wishlistButtons">
                    <button id='wishlistAddToCartButton' onClick={() => cart.addToCart(id)}>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                    <button id="wishlistRemoveButton" onClick={() => wishlist.removeItemFromWishlist(id)}>
                        <i className='fa-solid fa-trash-can'></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WishlistItem;