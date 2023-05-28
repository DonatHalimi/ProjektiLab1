import React, { useContext } from 'react';
import { ShopContext } from '../context/shop-context';
import CartItem from './cart-items';
import Navbar from "./Navbar";
import { PRODUCTS } from './ProductData'; // Import the PRODUCTS data

export const Cart = () => {
  const { cartItems } = useContext(ShopContext);

  return (
    <>
      <Navbar />

      <div className="cart-container">
        <h2>Your cart items</h2>
        <div className="cart-items">
          {PRODUCTS.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <CartItem key={product.id} data={product} />;
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
};

export default Cart;
