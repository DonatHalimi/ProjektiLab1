import React, { createContext, useState } from 'react';
// import { getProductData } from '../components/ProductData';

// Krijimi i nje instance te Context per kontekstin e dyqanit
export const ShopContext = createContext({
  items: [],
  getProductQuantity: () => { },
  addOneToCart: () => { },
  removeOneFromCart: () => { },
  deleteFromCart: () => { },
  getTotalCost: () => { },
});

export function ShopContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([]);

  // Funksioni per te marrur sasine e produktit
  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  // Krijimi i nje funksioni per te shtuar produkt ne Cart
  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      // Produkti nuk eshte ne cart
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      // Produkti eshte ne cart
      setCartProducts(
        cartProducts.map(
          (product) =>
            product.id === id
              ? { ...product, quantity: product.quantity + 1 } // if statement is true
              : product // if statement is false
        )
      );
    }
  }

  // Krijimi i nje funksioni per te larguar nje produkt nga Cart
  function removeOneFromCart(id) {
    const product = cartProducts.find((product) => product.id === id);

    if (product && product.quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts((cartProducts) =>
        cartProducts.map((product) =>
          product.id === id ? { ...product, quantity: product.quantity - 1 } : product
        )
      );
    }
  }

  // Krijimi i nje funksioni per kthimin e kostose totale te shportes
  function getTotalCost() {
    let totalCost = 0;
    console.log(cartProducts);
    if (cartProducts && Array.isArray(cartProducts)) {
      cartProducts.forEach((cartItem) => {
        const product = products.find((product) => product.id === cartItem.id);
        if (product) {
          totalCost += product.Cmimi * cartItem.quantity;
        }
      });
    }
    return totalCost;
  }
  function displayTotalCost() {
    // Thirr funksionin per te marrur koston totale
    const totalCost = getTotalCost();

    // Kthe nje tekst qe permban koston totale dhe formatizoje si deshirohet
    return `Total Cost: $${totalCost.toFixed(2)}`; // Format as desired
  }



  // Krijimi i nje funksioni per largimin e produkteve nga shporta
  function deleteFromCart(id) {
    // [] if an object meets a condition, add the object to array
    // [product1, product2, product3]
    // [product1, product3]
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id !== id;
      })
    );
  }

  // Krijimi i nje konteksti te shportes me vlerat e nevojshme
  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    
  };

  // Kthen kontekstin e shportes te mbeshtjelle me <ShopContext.Provider> per te qene i perdorshem nga komponentet femije
  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;