import React from 'react';
import { ShopContext } from '../context/shop-context';
import { useContext, useEffect, useState } from 'react';
import { BsPlusLg, BsTrash3 } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { Link } from 'react-router-dom';
import '../styles/CartItemsStyle.css';

function CartItem(props) {
  const cart = useContext(ShopContext);

  const id = props.id;
  const quantity = props.quantity;

  const [products, setProducts] = useState([]);

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

    document.title = "Ruby | Cart";
  }, []);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return <div>Loading...</div>;
  }

  const price = parseFloat(product.Cmimi);
  const totalCost = (quantity * price).toFixed(2);

  return (
    <div className="cart-item">
      <div className="cart-card">
        <Link to={`/product/${product.id}`} className="product-details-link">
          <div className="cart-card-image">
            <img src={`data:image/jpeg;base64,${product.Foto.toString('base64')}`} alt="Item" />
          </div>
        </Link>

        <div className="cart-card-details">
          <h3 className="product-name">{product.Emri}</h3>
          <p className="quantity">{quantity} Total</p>
          <p className="total-cost">${totalCost}</p>
        </div>

        <div className='edit-buttons'>
          <button className='add-button' onClick={() => cart.addOneToCart(id)} title='Add'>
            <BsPlusLg />
          </button>
          <button className='remove-button' onClick={() => cart.removeOneFromCart(id)} title='Remove'>
            <AiOutlineMinus />
          </button>
          <button className='delete-button' onClick={() => cart.deleteFromCart(id)} title='Delete'>
            <BsTrash3 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;