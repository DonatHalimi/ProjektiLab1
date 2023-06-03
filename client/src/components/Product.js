import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from "../context/shop-context";
import { WishlistContext } from "../context/wishlist-context";
import { getProductData } from "./ProductData";
import "../styles/ProductStyle.css";

function Product(props) {
  const product = props.product;
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

  // Merr sasine e produkteve nga shporta
  const getProductQuantity = cart.getProductQuantity(product.id);

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

  // Numri i produkteve ne shporte
  const itemsInCart = cart.items.length;

  return (
    <>
      {/* Karta e produkteve */}
      <div className="product" key={product.id}>
        <div className="card">
          <Link to={`/product/${product.id}`} className="product-details-link">
            <div className="cardImg">
              <img src={fotoUrl} alt="Product" />
            </div>
            <div className="card_header">
              <h3>{product.product_name}</h3>
              <p className="price">{product.currency}{product.price}</p>
            </div>
          </Link>

          {/* Butonat per me shtu produktin ne cart/wishlist */}
          <button className="cartButton" onClick={handleAddToCart} title='Add To Cart'>
            <i className="fa-solid fa-shopping-cart"></i>
          </button>
          <button className="wishlistButton" onClick={handleAddToWishlist} title='Add To Wishlist'>
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>

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
    </>
  );
}

export default Product;