import React, { useContext, useEffect, useState } from "react";
import ProductStyle from "../styles/ProductStyle.css";
import { ShopContext } from "../context/shop-context";
import { getProductData } from "./ProductData";

function Product(props) {
  const product = props.product;
  const [fotoUrl, setFotoUrl] = useState("");

  
  useEffect(() => {
    if (product.thumb instanceof Blob) {
      setFotoUrl(URL.createObjectURL(product.thumb));
    } else if (typeof product.thumb === "string") {
      setFotoUrl(product.thumb);
    }
  }, [product.thumb]);

  const cart = useContext(ShopContext);

  const getProductQuantity=cart.getProductQuantity(product.id);
  console.log(cart.items);

  const handleAddToCart = () => {
    cart.addToCart(product.id);
  };


  if (!product) {
    // Render a loading state or an error message
    return <div>Loading...</div>;
  }

  

  const itemsInCart = cart.items.length;


  return (
    <>
      <div className="product" key={product.id}>
        <div className="card">
          <div className="card_img">
            <img src={fotoUrl} alt="Product" />
          </div>
          <div className="card_header">
            <h3>{product.product_name}</h3>
            <p className="price">${product.price}</p>
          </div>
          <button className="buton" onClick={handleAddToCart}>
            <i className="fa-solid fa-shopping-cart"></i>
          </button>
        </div>
      </div>
     
    </>
  );
}

export default Product;