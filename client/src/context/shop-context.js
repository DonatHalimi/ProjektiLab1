import React, { createContext, useState } from 'react';
import { PRODUCTS ,getProductData } from '../components/ProductData';

export const ShopContext = createContext({
    items:[],
    getProductQuantity: ()=>{},
    addToCart: ()=>{},
    removeOneFromCart: ()=>{},
    deleteFromCart: ()=>{},
    getTotalCost: ()=>{},


});



export function ShopContextProvider ({children})  {
  const[cartProducts,setCartProducts]=useState([]);

    function getProductQuantity(id){
       const quantity= cartProducts.find(product=>product.id===id)?.quantity

        if(quantity === undefined){
            return 0;
        }
        return quantity;
    }

    function addToCart(id){
        const quantity=getProductQuantity(id);

        if(quantity===0){
            setCartProducts(
            [
                ...cartProducts,
                {
                    id:id,
                    quantity:1
                }
            ]
            )
        }else{
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ?{...product, quantity:product.quantity + 1}
                    : product
                )
            )
        }
    }

   function removeOneFromCart(id){
        const quantity=getProductQuantity(id);

        if(quantity ==1){
            deleteFromCart(id);
        }else{
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ?{...product,quantity:product.quantity - 1}
                    : product
            )
            )
        }
    }
    function getTotalCost(){
        let totalCost=0;
        cartProducts.map((cartItem)=>{
            const productData =getProductData (cartItem.id);
            totalCost += (productData.price * cartItem.quantity)
        });
        return totalCost;
    }


    function deleteFromCart(id){
        setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct =>{
                return currentProduct.id != id;
            })
        )
    }

  const contextValue = { 
    items:[],
    getProductQuantity,
    addToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,



   };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};


export default ShopContextProvider;
