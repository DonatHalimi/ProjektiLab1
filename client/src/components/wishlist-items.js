import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../context/wishlist-context';
// import { getProductData } from './ProductData';
import { ShopContext } from '../context/shop-context';
import '../styles/WishlistItemsStyle.css';

function WishlistItem(props) {
    const wishlist = useContext(WishlistContext);
    const cart = useContext(ShopContext);

    const [products, setProducts] = useState([]);

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
                        <button id='wishlistAddToCartButton' onClick={() => cart.addToCart(id)} title='Add To Cart'>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                        <button id="wishlistRemoveButton" onClick={() => wishlist.removeItemFromWishlist(id)} title='Remove'>
                            <i className='fa-solid fa-trash-can'></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* {
        showAlertCart && (
            <div className="alertCart">
                <p>Produkti është shtuar në cart me sukses! </p>
                <button className="cancelPopupButtonCart" onClick={() => setShowAlertCart(false)}>
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        )
    } */}
        </>
    );
}

export default WishlistItem;