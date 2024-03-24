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
 
  const checkout = async () => {
    await fetch(`http://localhost:6001/api/payments/checkout`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart.items })
    }).then((response) => {
      return response.json();
    }).then((response) => {
      if (response.url) {
        window.location.assign(response.url);
      }
    })
  }

  // Scroll to top on component render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <div>
        {/* <h1 className='cart-name'></h1> */}
        <div className="cart-items">
          {productsCount > 0 ?
            <>
              {/* Per secilin produkt ne shporte, shfaqe komponentin CartItem */}
              {cart.items.map((currentProduct, idx) => (
                <CartItem key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartItem>
                
              ))
              }

              <Transport/>
              <button id='purchaseButton' variant="success" onClick={checkout}>Purchase items</button>
            </>
            :
            <div className='noItemsInCart'>
              <img src={NoProductInCart} alt="NoProductInCart" />
              <p>Ju nuk keni ndonjë produkt në shportë.</p>
              <Link to="/">Kthehu në faqen kryesore</Link>
            </div>
          }
        </div>
      </div>

      <div style={{ height: '500px' }}></div>

      <Footer />
    </>
  );
};

export default Cart;