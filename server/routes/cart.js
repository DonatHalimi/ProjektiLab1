const express = require('express');
const router = express.Router();
const {
    getCartItems,
    addCartItem,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeCartItem,
    clearCart,
    getTotalItems
} = require('../controllers/cart.controller.js');

// Get cart items by user ID
router.get('/:userId', getCartItems);

// Add item to cart
router.post('/:userId/add', addCartItem);

// Increase item quantity
router.put('/:userId/increase/:productId', increaseCartItemQuantity);

// Decrease item quantity
router.put('/:userId/decrease/:productId', decreaseCartItemQuantity);

// Remove item from cart
router.delete('/:userId/remove/:productId', removeCartItem);

// Clear cart
router.post('/:userId/clear', clearCart);

// Get total items in cart
router.get('/:userId/total-items', getTotalItems);

module.exports = router;