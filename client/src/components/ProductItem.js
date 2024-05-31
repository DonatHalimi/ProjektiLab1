import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from "../context/shop-context";
import { WishlistContext } from "../context/wishlist-context";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import "../styles/ProductStyle.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

function Product(props) {
  const product = props.product;
  const cart = useContext(ShopContext);
  const wishlist = useContext(WishlistContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // Check if the user is logged in
    const isLoggedIn = AuthService.getCurrentUser();

    if (!isLoggedIn) {
      // Inform the user and redirect to login page
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

    // If user is logged in, add the product to the cart
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
    // Check if the user is logged in
    const isLoggedIn = AuthService.getCurrentUser();

    if (!isLoggedIn) {
      // Inform the user and redirect to login page
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

    // If user is logged in, add the product to the wishlist
    wishlist.addItemToWishlist(product.id);

    toast.success('Produkti është shtuar në wishlist!', {
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

  if (!product) {
    // Render loading state or an error message
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Product card */}
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

              {/* Buttons to add product to Cart & Wishlist */}
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
    </>
  );
}

export default Product;
