import React, { useContext } from 'react';
import { ShopContext } from '../context/shop-context';
import { Link } from 'react-router-dom';
import CartItem from './cart-items';
import Navbar from './Navbar';
import "../styles/CartStyle.css"
import Footer from './Footer';

// Krijimi i funksionit per Cart
const Cart = () => {

  // Merr kontekstin e dyqanit nga komponenti ShopContext
  const cart = useContext(ShopContext);

  // Krijojme funksionin per me llogarit numrin total te produkteve ne shporte
  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  // Krijimi i nje funksioni per blerjen e produkteve
  const checkout = async () => {
    await fetch(`http://localhost:6001/checkout`, {
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

  return (
    <>
      <Navbar />
      <div>
        <h1>Cart</h1>
        <div className="cart-items">
          {productsCount > 0 ?
            <>
              <p>Items in your cart :</p>
              {/* Per secilin produkt ne shporte, shfaqe komponentin CartItem */}
              {cart.items.map((currentProduct, idx) => (
                <CartItem key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartItem>
              ))}

              {/* Shfaqe vleren totale te shportes me 2 shifra pas presjes */}
              <h1>Total: ${cart.getTotalCost().toFixed(2)}</h1>

              <button id='purchaseButton' variant="success" onClick={checkout}>Purchase items</button>
            </>
            :
            <div className='noItemsInCart'>
              <img src='https://o.remove.bg/downloads/9c2ba529-89a6-4e4e-8b83-4d48e54a5e1d/5034313-middle-removebg-preview.png' alt="Empty Cart"></img>
              <p>Ju nuk keni ndonje produkt ne cart.</p>
              <Link to="/">Kthehu ne faqen kryesore</Link>
            </div>
          }
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Cart;