import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from "../context/shop-context";
import { WishlistContext } from "../context/wishlist-context";
import { getProductData } from '../components/ProductData';
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import "../styles/ProductStyle.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Product(props) {
  const product = props.product;
  const cart = useContext(ShopContext);
  const wishlist = useContext(WishlistContext);
  // const [productsTable, setProductsTable] = useState([]);

  const navigate = useNavigate();

  const handleAddToCart = () => {
    cart.addOneToCart(product.id);

    toast.success('Produkti është shtuar në shportë!', {
      position: 'top-right',
      style: {
        marginTop: '70px',
        cursor: 'pointer',
        transition: 'opacity 2s ease-in',
      },
      onClick: () => {
        navigate('/Cart');
      },
    }, 50);
  };

  const handleAddToWishlist = () => {
    wishlist.addItemToWishlist(product.id);

    setTimeout(() => {
      toast.success('Produkti është shtuar në wishlist!', {
        position: 'top-right',
        style: {
          marginTop: '70px',
          cursor: 'pointer',
          transition: 'opacity 2s ease-in',
        },
        onClick: () => {
          navigate('/Wishlist');
        },
      });
    }, 50);
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
              <AiOutlineShoppingCart style={{ color: "black", fontSize: "18px" }} />
            </button>

            <button className="wishlistButton" onClick={handleAddToWishlist} title='Add To Wishlist'>
              <AiOutlineHeart style={{ color: "black", fontSize: "18px", fontWeight: "normal" }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;