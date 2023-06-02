import React from 'react';
import { ShopContext } from '../context/shop-context';
import { useContext, useEffect, useState } from 'react';
import { getProductData } from './ProductData';
import '../styles/CartItemsStyle.css'

function CartItem(props) {
  const cart = useContext(ShopContext)
  const id = props.id;
  const quantity = props.quantity;
  const productData = getProductData(id);
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
        <div className="cartCard">
          <div className="cartCard_img">
            <img src={fotoUrl} alt="Item" />
          </div>

          <div className="cartCard_header">
            <h3>{productData.product_name}</h3>
            <p>{quantity} Total</p>
            <p>${(quantity * productData.price).toFixed(2)}</p>
          </div>

          <div className='editButtons'>
            <button id='addButton' onClick={() => cart.addToCart(id)} title='Add'> <i class="fa fa-plus" aria-hidden="true"></i></button>
            <button id='removeButton' onClick={() => cart.removeOneFromCart(id)} title='Remove'><i class='fa fa-minus'></i></button>
            <button id='deleteButton' onClick={() => cart.deleteFromCart(id)} title='Delete'><i class='fa fa-trash'></i></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
