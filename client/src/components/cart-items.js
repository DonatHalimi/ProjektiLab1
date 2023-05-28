import React from 'react';

const CartItem = (props) => {
  const { id, product_name, description, price, currency, thumb } = props.data || {};
  console.log(props.data); 
   if (!id) {
    // Handle the case where props.data is undefined or doesn't contain the expected properties
    return null;
  }
  return (
    <div className="cartItem">
      <img src={thumb} alt={product_name} />
      <div className="description">
        
        <p>
          <b>{product_name}</b>
        </p>
        <p>{description}</p>
        <p>
          {currency} {price}
        </p>
       
      </div>
    </div>
   
  );
};

export default CartItem;
