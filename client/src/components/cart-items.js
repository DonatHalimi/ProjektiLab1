import React from 'react';
import { toast } from 'react-toastify';
import { BsTrash3 } from 'react-icons/bs';
import CartService from '../services/cart.service';
import '../styles/CartStyle.css';
import { Link } from 'react-router-dom';

const CartItem = ({ item, handleRemoveItem, userId }) => {
  const { product_id, Emri, Valuta, Cmimi, quantity, Foto } = item;

  const handleRemove = async () => {
    try {
      await CartService.removeItem(userId, product_id);
      toast.success('Product removed from cart!');
      handleRemoveItem(product_id);
      window.location.reload();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart.');
    }
  };

  const handleIncreaseQuantity = async () => {
    try {
      await CartService.increaseQuantity(userId, product_id);
      window.location.reload();
    } catch (error) {
      console.error('Error increasing item quantity:', error);
      toast.error('Failed to increase item quantity.');
    }
  };

  const handleDecreaseQuantity = async () => {
    try {
      if (quantity > 1) {
        await CartService.decreaseQuantity(userId, product_id);
        window.location.reload();
      } else {
        handleRemove();
      }
    } catch (error) {
      console.error('Error decreasing item quantity:', error);
      toast.error('Failed to decrease item quantity.');
    }
  };

  return (
    <>
      <tr key={product_id}>
        <td className="border-b px-4 py-2">
          <Link>
            <img
              src={`data:image/jpeg;base64,${Foto}`}
              alt="Product"
              className="table-auto img"
            />
          </Link>
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
      </tr >
    </>
  );
};

export default CartItem;
