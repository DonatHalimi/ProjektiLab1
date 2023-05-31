import React, { useContext, useEffect, useState } from "react";
import "../styles/ProductStyle.css";
import { ShopContext } from "../context/shop-context";
import { WishlistContext } from "../context/wishlist-context";
import { getProductData } from "./ProductData";

function Product(props) {
  const product = props.product;
  const [fotoUrl, setFotoUrl] = useState("");

  // Efekti qe ndryshon URL-ne e fotos bazuar ne llojin e thumbnail-it te produktit
  useEffect(() => {
    if (product.thumb instanceof Blob) {
      setFotoUrl(URL.createObjectURL(product.thumb));
    } else if (typeof product.thumb === "string") {
      setFotoUrl(product.thumb);
    }
  }, [product.thumb]);

  const cart = useContext(ShopContext);
  const wishlist = useContext(WishlistContext);
  const [showCartPopup, setShowCartPopup] = useState(false);

  // Merr sasine e produkteve nga shporta
  const getProductQuantity = cart.getProductQuantity(product.id);

  // Funksioni qe shton nje produkt ne shporte
  const handleAddToCart = () => {
    cart.addToCart(product.id);
    setShowCartPopup(true);
  };

  // Funksioni qe shton nje produkt ne listën e dëshirave
  const handleAddToWishlist = () => {
    wishlist.addItemToWishlist(product.id);
  };

  if (!product) {
    // Rendero gjendjen e ngarkimit ose nje mesazh gabimi
    return <div>Loading...</div>;
  }

  // Numri i produkteve ne shporte
  const itemsInCart = cart.items.length;

  return (
    <>
      <div className="product" key={product.id}>
        <div className="card">
          <div className="card_img">
            <img src={fotoUrl} alt="Product" />
          </div>
          <div className="card_header">
            <h3>{product.product_name}</h3>
            <p className="price">${product.price}</p>
          </div>
          <button className="cartButton" onClick={handleAddToCart}>
            <i className="fa-solid fa-shopping-cart"></i>
          </button>
          <button className="wishlistButton" onClick={handleAddToWishlist}>
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
        {showCartPopup}
      </div>
    </>
  );
}

export default Product;