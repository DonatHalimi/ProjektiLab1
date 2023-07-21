import React, { createContext, useState, useEffect } from 'react';
import {  getProductData } from '../components/ProductData';

// Krijimi i nje instance te Context per kontekstin e dyqanit
export const ShopContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
});

export function ShopContextProvider({ children }) {


    const [cartProducts, setCartProducts] = useState([]);

   


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
          // product is not in cart
          setCartProducts([
            ...cartProducts,
            {
              id: id,
              quantity: 1,
            },
          ]);
        } else {
          // product is in cart
         
          setCartProducts(
            cartProducts.map(
              (product) =>
                product.id === id // if condition
                  ? { ...product, quantity: product.quantity + 1 } // if statement is true
                  : product // if statement is false
            )
          );
        }
      }

    // Krijimi i nje funksioni per te larguar nje produkt nga Cart
    function removeOneFromCart(id) {
        const quantity = getProductData(id);
    
        if (quantity == 1) {
          deleteFromCart(id);
        } else {
          setCartProducts(
            cartProducts.map(
              (product) =>
                product.id === id // if condition
                  ? { ...product, quantity: product.quantity - 1 } // if statement is true
                  : product // if statement is false
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
            const productData = getProductData(cartItem.id);
    
            if (productData) {
              totalCost += productData.Cmimi * cartItem.quantity;
            }
          });
        }
    
        return totalCost;
      }
    

    // Krijimi i nje funksioni per largimin e nje produkti nga shporta
    function deleteFromCart(id) {
        // [] if an object meets a condition, add the object to array
        // [product1, product2, product3]
        // [product1, product3]
        setCartProducts((cartProducts) =>
          cartProducts.filter((currentProduct) => {
            return currentProduct.id != id;
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


export default ShopContextProvider