import React, { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../context/shop-context';
import { Link } from 'react-router-dom';
import CartItem from './cart-items';
import Navbar from './Navbar';
import Footer from '../components/Footer';
import NoProductInCart from '../img/NoProductInCart.png';
import "../styles/CartStyle.css";
import Transport from './Transport';

const Cart = () => {
  document.title = "Ruby | Cart";

  const cart = useContext(ShopContext);
  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);
  const [selectedTransportMode, setSelectedTransportMode] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const checkout = async () => {
    const requestBody = {
      items: cart.items,
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
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData.url) {
        window.location.assign(responseData.url);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  useEffect(() => {
    // Update button disabled state based on selected transport mode
    setIsDisabled(!selectedTransportMode);
  }, [selectedTransportMode]);

  // Scroll to top on component render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <div>
        <div className="cart-items">
          {productsCount > 0 ?
            <>
              {cart.items.map((currentProduct, idx) => (
                <CartItem key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartItem>
              ))
              }

              <Transport setSelectedTransportMode={setSelectedTransportMode} />
              <button id='purchaseButton' variant="success" onClick={checkout} disabled={isDisabled}>Purchase items</button>
            </>
            :
            <div className='noItemsInCart'>
              <img src={NoProductInCart} alt="NoProductInCart" />
              <p>You have no products in your cart.</p>
              <Link to="/">Go back to the main page</Link>
            </div>
          }
        </div>
      </div>

      <div style={{ height: '330px' }}></div>

      <Footer />
    </>
  );
};

export default Cart;