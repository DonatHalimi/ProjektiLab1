/* import React, { useContext } from 'react';
import { ShopContext } from '../context/shop-context';
import CartItem from './cart-items';
import Navbar from './Navbar';

const Cart = () => {
  const { cartItems } = useContext(ShopContext);

  return (<>
    <Navbar/>
    <div>
      <h1>Cart</h1>
      <div className="cart-items">
        {Object.keys(cartItems).map((productId) => {
          const quantity = cartItems[productId];
          // Render your cart item component here using the product ID and quantity
          return <CartItem key={productId} productId={productId} quantity={quantity} />;
        })}
      </div>
    </div>
    </>
  );
};

export default Cart
*/