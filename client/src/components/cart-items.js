import React from 'react';
import { ShopContext } from '../context/shop-context';
import { useContext, useEffect, useState } from 'react';
// import { getProductData } from './ProductData';
import '../styles/CartItemsStyle.css'

function CartItem(props) {
  const cart = useContext(ShopContext);

  const id = props.id;
  const quantity = props.quantity;

  const [products, setProducts] = useState([]);

  const product = products.find((product) => product.id === id);

  // Krijimi i nje funksioni per te kerkuar te dhenat nga API i produktit
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:6001/api/product/get");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!product) {
    <div>Loading...</div>
    return null;
  }

  const Cmimi = parseFloat(product.Cmimi).toFixed(2);
  const totalCost = (quantity * Cmimi).toFixed(2);

  return (
    <>
      <div className="cartItem">
        <div className="cartCard">
          <div className="cartCard_img">
            <img src={`data:image/jpeg;base64,${product.Foto.toString('base64')}`} alt="Item" />
          </div>

          <div className="cartCard_header">
            <h3>{product.Emri}</h3>
            <p>{quantity} Total</p>
            <p>${totalCost}</p>
          </div>

          {/* Butonat per me ndryshu, largu, dhe fshi produkte prej cart */}
          <div className='editButtons'>
            <button id='addButton' onClick={() => cart.addToCart(id)} title='Add'>
              <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
            <button id='removeButton' onClick={() => cart.removeOneFromCart(id)} title='Remove'>
              <i class='fa fa-minus'></i>
            </button>
            <button id='deleteButton' onClick={() => cart.deleteFromCart(id)} title='Delete'>
              <i class='fa fa-trash'></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
