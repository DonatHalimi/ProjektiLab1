import React, { useContext, useEffect, useState } from "react";
import ProductStyle from "../styles/ProductStyle.css";
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "./ProductData";


function  Product (props) {
  const product = props.data;
  const [fotoUrl, setFotoUrl] = useState("");
  const cart = useContext(ShopContext);
  const getProductQuantity=cart.getProductQuantity(product.id);
  console.log(cart.items);



  const handleAddToCart = () => {
    addToCart(id);
  };

  useEffect(() => {
    if (thumb instanceof Blob) {
      setFotoUrl(URL.createObjectURL(thumb));
    } else if (typeof thumb === "string") {
      setFotoUrl(thumb);
    }
  }, [thumb]);

  return (
    <>
   
    
    <div className="product">
     
      <div className="card">
      <div className="card_img">
        <img src={fotoUrl} alt="Product" /> 
        </div>
       <div className="card_header" >
        <h3>{product_name}</h3>
        <p className="price">${price}</p>
        </div>
        <button className="buton" onClick={()=>cart.addToCart(product.id)}>
          <i className="fa-solid fa-shopping-cart"></i>
        </button>
      </div>
    </div>
      </>
  );
};

export default Product;
