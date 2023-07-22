import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from "../context/shop-context";
import { WishlistContext } from "../context/wishlist-context";
import "../styles/ProductStyle.css";
import { getProductData } from '../components/ProductData';

function Product(props) {
  const product = props.product;
  const cart = useContext(ShopContext);
  const wishlist = useContext(WishlistContext);
  const [productsTable, setProductsTable] = useState([]);

  const [showAlertCart, setShowAlertCart] = useState(false);
  const [showAlertWishlist, setShowAlertWishlist] = useState(false);

  // Funksioni qe shton nje produkt ne shporte
  const handleAddToCart = () => {
    cart.addOneToCart(product.id);
    setShowAlertCart(true);

    setTimeout(() => {
      setShowAlertCart(false);
    }, 5000);
  };

  // Funksioni qe shton nje produkt ne listen e deshirave
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
      <div className="product-container">
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
            <button className="cartButton" onClick={handleAddToCart} title='Add To Cart'>
              <i className="fa-solid fa-shopping-cart"></i>
            </button>

            <button className="wishlistButton" onClick={handleAddToWishlist} title='Add To Wishlist'>
              <i className="fa-solid fa-heart"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Thirrja e funksionit per me shfaq mesazhin e konfirmimit te shtimit te produktit ne Cart & Wishlist */}
      {showAlertCart && (
        <div className="alertCart">
          <Link to="/Cart" className="cartLink">
            <p>Produkti është shtuar në shportë me sukses!</p>
          </Link>
          <button className="cancelPopupButtonCart" onClick={() => setShowAlertCart(false)}>
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      {showAlertWishlist && (
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

export default Product;