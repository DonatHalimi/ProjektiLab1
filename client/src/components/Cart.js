import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsTrash3 } from 'react-icons/bs';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import AuthService from '../services/auth.service';
import CartService from '../services/cart.service';
import Navbar from './Navbar';
import Footer from '../components/Footer';
import Transport from './Transport';
import CartItem from './cart-items';
import '../styles/CartStyle.css';
import NoProductInCart from '../img/NoProductInCart.png';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [selectedTransportMode, setSelectedTransportMode] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const userId = AuthService.getCurrentUser()?.id;

  useEffect(() => {
    if (userId) {
      const fetchCart = async () => {
        try {
          const cartData = await CartService.getCart(userId);
          setCart(cartData);
        } catch (error) {
          console.error('Error fetching cart:', error);
          toast.error('Failed to fetch cart.');
        }
      };
      fetchCart();
    } else {
      navigate('/login');
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [userId, navigate]);

  const handleRemoveItem = async (productId) => {
    try {
      await CartService.removeItem(userId, productId);
      const cartData = await CartService.getCart(userId);
      setCart(cartData);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart.');
    }
  };

  const handleUpdateItemQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => {
        if (item.product_id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return { ...prevCart, items: updatedItems };
    });
  };

  const handleClearCart = async () => {
    try {
      await CartService.clearCart(userId);
      setCart({ id: cart.id, userId: cart.userId, items: [] });
      toast.success('Products removed from cart!', {
        position: 'top-right',
        style: {
          marginTop: '70px',
          cursor: 'pointer',
          transition: 'opacity 2s ease-in',
        }
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart.');
    }
  };

  const confirmClearCart = () => {
    confirmAlert({
      title: 'Confirm Clear Cart',
      message: 'Are you sure you want to clear your cart?',
      buttons: [
        {
          label: 'Cancel',
          onClick: () => { }
        },
        {
          label: 'Yes',
          onClick: handleClearCart
        }
      ]
    });
  };

  const checkout = async () => {
    if (!cart || !selectedTransportMode) {
      return;
    }

    const lineItems = cart.items.map(item => ({
      id: item.product_id,
      quantity: item.quantity,
    }));

    const requestBody = {
      items: lineItems,
      transportMode: selectedTransportMode
    };

    try {
      const response = await fetch(`http://localhost:6001/api/payments/checkout`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (responseData.url) {
        window.location.assign(responseData.url);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to create checkout session. Please try again later.');
    }
  };

  useEffect(() => {
    setIsDisabled(!selectedTransportMode);
  }, [selectedTransportMode]);

  if (!cart) {
    return <div>Loading...</div>;
  }

  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <>
      <Navbar />

      <div className="shoppingCart-container">
        <h1 className='shoppingCart-header'>Your Cart</h1>
        {productsCount > 0 ? (
          <div>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                  <th onClick={confirmClearCart} style={{ cursor: 'pointer' }}><BsTrash3 /></th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map(item => (
                  <CartItem
                    key={item.product_id}
                    item={item}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateItemQuantity={handleUpdateItemQuantity}
                  />
                ))}
              </tbody>
            </table>
            <Transport setSelectedTransportMode={setSelectedTransportMode} />
            <div className="button-group">
              <button
                className="button-purchase"
                onClick={checkout}
                disabled={isDisabled}>
                Purchase items
              </button>
            </div>
          </div>
        ) : (
          <div className='noItemsInCart'>
            <img src={NoProductInCart} alt="NoProductInCart" />
            <p>You have no products in your cart.</p>
            <Link to="/">Go back to the main page</Link>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
