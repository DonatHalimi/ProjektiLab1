import React from 'react';
import { toast } from 'react-toastify';
import { BsTrash3 } from 'react-icons/bs';
import CartService from '../services/cart.service';
import '../styles/CartStyle.css';

const CartItem = ({ item, handleRemoveItem, handleUpdateItemQuantity }) => {
  const { product_id, Emri, Valuta, Cmimi, quantity, Foto } = item;

  const handleRemove = async () => {
    try {
      await CartService.removeItem(product_id);
      toast.success('Product removed from cart!');
      handleRemoveItem(product_id);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart.');
    }
  };

  const handleIncreaseQuantity = async () => {
    try {
      await CartService.addItem(product_id, 1);
      handleUpdateItemQuantity(product_id, quantity + 1);
    } catch (error) {
      console.error('Error increasing item quantity:', error);
      toast.error('Failed to increase item quantity.');
    }
  };

  const handleDecreaseQuantity = async () => {
    if (quantity > 1) {
      try {
        await CartService.addItem(product_id, -1);
        handleUpdateItemQuantity(product_id, quantity - 1);
      } catch (error) {
        console.error('Error decreasing item quantity:', error);
        toast.error('Failed to decrease item quantity.');
      }
    } else {
      handleRemove();
    }
  };

  return (
    <tr key={product_id}>
      <td className="border-b px-4 py-2">
        <img
          src={`data:image/jpeg;base64,${Foto}`}
          alt="Product"
          className="table-auto img"
        />
      </td>
      <td className="border-b px-4 py-2">{Emri}</td>
      <td className="border-b px-4 py-2">{Valuta}{Cmimi}</td>
      <td className="border-b px-4 py-2">
        <button onClick={handleDecreaseQuantity} className="quantity-btn">-</button>
        {quantity}
        <button onClick={handleIncreaseQuantity} className="quantity-btn">+</button>
      </td>
      <td className="border-b px-4 py-2">
        <button
          className="button-remove"
          onClick={handleRemove}
        >
          <BsTrash3 />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
