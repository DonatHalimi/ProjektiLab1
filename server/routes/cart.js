const express = require('express');
const router = express.Router();
const { queryAsync } = require('../db/db');

const getCart = async (userId) => {
    try {
        let cart = await queryAsync('SELECT * FROM carts WHERE user_id = ?', [userId]);
        if (cart.length === 0) {
            const result = await queryAsync('INSERT INTO carts (user_id) VALUES (?)', [userId]);
            cart = [{ id: result.insertId, user_id: userId }];
        }
        const items = await queryAsync(
            `SELECT ci.*, p.Emri, p.Cmimi, p.Valuta, TO_BASE64(p.Foto) as Foto
             FROM cart_items ci 
             JOIN produktet p ON ci.product_id = p.id 
             WHERE ci.cart_id = ?`,
            [cart[0].id]
        );
        return { ...cart[0], items };
    } catch (error) {
        console.error('Error in getCart:', error);
        throw error;
    }
};

const addItem = async (userId, productId, quantity = 1) => {
    try {
        if (!productId) {
            throw new Error('productId is null');
        }
        const cart = await getCart(userId);
        const existingItem = await queryAsync('SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?', [cart.id, productId]);
        if (existingItem.length > 0) {
            await queryAsync('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?', [quantity, existingItem[0].id]);
        } else {
            await queryAsync('INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)', [cart.id, productId, quantity]);
        }
    } catch (error) {
        console.error('Error in addItem:', error);
        throw error;
    }
};

const removeItem = async (userId, productId) => {
    try {
        const cart = await getCart(userId);
        await queryAsync('DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?', [cart.id, productId]);
    } catch (error) {
        console.error('Error in removeItem:', error);
        throw error;
    }
};

const clearCart = async (userId) => {
    try {
        const cart = await getCart(userId);
        await queryAsync('DELETE FROM cart_items WHERE cart_id = ?', [cart.id]);
    } catch (error) {
        console.error('Error in clearCart:', error);
        throw error;
    }
};

router.get('/:userId', async (req, res) => {
    try {
        const cart = await getCart(req.params.userId);
        res.json(cart);
    } catch (error) {
        console.error('Error in GET /:userId route:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/:userId/add', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        await addItem(req.params.userId, productId, quantity);
        res.json({ message: 'Item added to cart' });
    } catch (error) {
        console.error('Error in POST /:userId/add route:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/:userId/remove', async (req, res) => {
    try {
        const { productId } = req.body;
        await removeItem(req.params.userId, productId);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error in POST /:userId/remove route:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/:userId/clear', async (req, res) => {
    try {
        await clearCart(req.params.userId);
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        console.error('Error in POST /:userId/clear route:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
