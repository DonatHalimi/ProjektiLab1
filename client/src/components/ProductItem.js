import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from "../context/shop-context";
import { WishlistContext } from "../context/wishlist-context";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import "../styles/ProductStyle.css";
import { toast } from 'react-toastify';
import AuthService from '../services/auth.service';
import CartService from '../services/cart.service';

function Product(props) {
  const product = props.product;
  const cart = useContext(ShopContext);
  const wishlist = useContext(WishlistContext);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const isLoggedIn = AuthService.getCurrentUser();

    if (!isLoggedIn) {
      toast.info('You need to be logged in to add items to cart!', {
        position: 'top-right',
        style: {
          marginTop: '70px',
          cursor: 'pointer',
          transition: 'opacity 2s ease-in',
        },
      });
      navigate('/login');
      return;
    }

    try {
      await CartService.addItem(isLoggedIn.id, product.id, 1);
      toast.success('Product added to cart!', {
        position: 'top-right',
        style: {
          marginTop: '70px',
          cursor: 'pointer',
          transition: 'opacity 2s ease-in',
        },
        onClick: () => {
          navigate('/Cart');
        },
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart.', {
        position: 'top-right',
        style: {
          marginTop: '70px',
          cursor: 'pointer',
          transition: 'opacity 2s ease-in',
        },
      });
    }
  };

  const handleAddToWishlist = () => {
    const isLoggedIn = AuthService.getCurrentUser();

    if (!isLoggedIn) {
      toast.info('You need to be logged in to add items to wishlist!', {
        position: 'top-right',
        style: {
          marginTop: '70px',
          cursor: 'pointer',
          transition: 'opacity 2s ease-in',
        },
      });
      navigate('/login');
      return;
    }

    wishlist.addItemToWishlist(product.id);

    toast.success('Product added to wishlist!', {
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
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-md overflow-hidden mb-10 gap-5">
        <div className="product" key={product.id}>
          <div className="card">
            <Link to={`/product/${product.id}`} className="product-details-link">
              <div className="cardImg">
                <img src={`data:image/jpeg;base64,${product.Foto.toString('base64')}`} alt="Product" id="photo" />
              </div>
              <div className="card_header">
                <h3>{product.Emri}</h3>
                <p className="price">{product.Valuta}{product.Cmimi}</p>
              </div>
            </Link>
            <button className="cartButton" onClick={handleAddToCart} title="Add To Cart">
              <AiOutlineShoppingCart style={{ color: "black", fontSize: "18px" }} />
            </button>
            <button className="wishlistButton" onClick={handleAddToWishlist} title="Add To Wishlist">
              <AiOutlineHeart style={{ color: "black", fontSize: "18px", fontWeight: "normal" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
