 import React, { useContext } from 'react';
import { ShopContext } from '../context/shop-context';
import CartItem from './cart-items';
import Navbar from './Navbar';

const Cart = () => {
  const cart=useContext(ShopContext);
  const productsCount= cart.items.reduce((sum, product)=> sum + product.quantity, 0);
  

  return (<>
    <Navbar/>
    <div>
      <h1>Cart</h1>
      <div className="cart-items">
        {productsCount > 0 ?
           <>
        <p>Items in your cart :</p> 
          {cart.items.map((currentProduct, idx) => (
            <CartItem key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartItem>
          ))}
          
          <h1>Total :{cart.getTotalCost().toFixed(2)}</h1>
         
            

          </>
          :
            <h1>There are no items in your cart</h1>
          }
      </div>
    </div>
    </>
  );

};

export default Cart
