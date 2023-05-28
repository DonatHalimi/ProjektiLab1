import React, { useContext, useEffect, useState } from "react";
import ProductStyle from "../styles/ProductStyle.css";
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "./ProductData";

export const Product = (props) => {
  const { id, product_name, description, price, currency, thumb } = props.data;
  const [fotoUrl, setFotoUrl] = useState("");
  const { addToCart } = useContext(ShopContext);

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
    <div className="product">
     
      <div className="card">
      <div className="card_img">
        <img src={fotoUrl} alt="Product" /> 
        </div>
       <div className="card_header" >
        <h3>{product_name}</h3>
        <p className="price">${price}</p>
        </div>
        <button className="buton" onClick={handleAddToCart}>
          <i className="fa-solid fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  );
};

export default Product;
