import React, { useContext } from 'react';
import { ShopContext } from '../context/shop-context';
import { Link } from 'react-router-dom';
import CartItem from './cart-items';
import Navbar from './Navbar';
import "../styles/CartStyle.css"
import Footer from '../Pages/Footer';

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
        <h1 className='cart-name'>Cart</h1>
        <div className="cart-items">
          {productsCount > 0 ?
            <>
              {/* Per secilin produkt ne shporte, shfaqe komponentin CartItem */}
              {cart.items.map((currentProduct, idx) => (
                <CartItem key={idx} id={currentProduct.idproduct} quantity={currentProduct.quantity}></CartItem>
              ))}

              {/* Shfaqe vleren totale te shportes me 2 shifra pas presjes */}
              <h1 className='cart-total'>Total: ${cart.getTotalCost().toFixed(2)}</h1>

              <button id='purchaseButton' variant="success" onClick={checkout}>Purchase items</button>
            </>
            :
            <div className='noItemsInCart'>
              <img src='https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0=' alt="Empty Cart"></img>
              <p>Ju nuk keni ndonjë produkt në cart.</p>
              <Link to="/">Kthehu në faqen kryesore</Link>
            </div>
          }
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Cart;