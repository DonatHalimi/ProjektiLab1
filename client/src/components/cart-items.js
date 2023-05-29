import React from 'react';
import { ShopContext } from '../context/shop-context';
import { useContext, useEffect, useState } from 'react';
import { getProductData } from './ProductData';
import CartItemsStyle from '../styles/CartItemsStyle.css'

function CartItem (props)  {
  const cart = useContext(ShopContext)
  const id= props.id;
  const quantity=props.quantity;
  const productData= getProductData(id);
  const [fotoUrl, setFotoUrl] = useState("");

  useEffect(() => {
    if (productData.thumb instanceof Blob) {
      setFotoUrl(URL.createObjectURL(productData.thumb));
    } else if (typeof productData.thumb === "string") {
      setFotoUrl(productData.thumb);
    }
  }, [productData.thumb]);

  return (
    <>
      
      
    
     
      
   
      <div className="cartItem">
      <div className="card">
          <div className="card_img">
            <img src={fotoUrl} alt="Item" />
          </div>
          <div className="card_header">
          <h3>{productData.product_name}</h3>
          <p>{quantity} Total</p>
          <p>${(quantity * productData.price).toFixed(2)}</p>

          </div>
          <button onClick={()=>cart.addToCart(id)}> <i class="fa fa-plus" aria-hidden="true"></i></button>
          
          <button onClick={()=>cart.removeOneFromCart(id)}><i class='fa fa-minus'></i></button>
          <button onClick={()=>cart.deleteFromCart(id)}><i class='fa fa-trash'></i></button>
        </div>
        </div>
      </>
  );
};

export default CartItem;
