const express = require('express');
const router = express.Router();
const { pool } = require('../db/db');

// POST /api/wishlist/add
router.post('/add', (req, res) => {
    const { productId, user_id } = req.body;

    if (!productId || !user_id) {
        return res.status(400).json({ success: false, message: 'Missing productId or user_id' });
    }

    // Perform database insertion or other operations
    const queryString = 'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)';
    pool.query(queryString, [user_id, productId], (error, results) => {
        if (error) {
            console.error('Error adding wishlist item:', error);
            return res.status(500).json({ success: false, message: 'Failed to add wishlist item' });
        }
        const newItem = { id: results.insertId, user_id, product_id: productId };
        res.json({ success: true, message: 'Wishlist item added successfully', data: newItem });
    });
});
// GET /api/wishlist/get?user_id=:user_id
router.get('/get', (req, res) => {
    const { user_id } = req.query;
    const queryString = 'SELECT product_id FROM wishlist WHERE user_id = ?';
    pool.query(queryString, [user_id], (error, results) => {
        if (error) {
            console.error('Error fetching wishlist items:', error);
            return res.status(500).json({ success: false, message: 'Failed to fetch wishlist items' });
        }
        console.log('Fetched wishlist items:', results); // Log fetched items
        res.json(results);
    });
});



// DELETE /api/wishlist/:wishlist_item_id
router.delete('/delete/:wishlist_item_id', (req, res) => {
    const { wishlist_item_id } = req.params;
    const queryString = 'DELETE FROM wishlist WHERE id = ?';
    pool.query(queryString, [wishlist_item_id], (error, results) => {
        if (error) {
            console.error('Error deleting wishlist item:', error);
            return res.status(500).json({ success: false, message: 'Failed to delete wishlist item' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Wishlist item not found' });
        }
        res.json({ success: true, message: 'Wishlist item deleted successfully' });
    });
});

router.get('/item', (req, res) => {
    const { user_id, product_id } = req.query;
    const queryString = 'SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?';

    pool.query(queryString, [user_id, product_id], (error, results) => {
        if (error) {
            console.error('Error fetching wishlist item:', error);
            return res.status(500).json({ success: false, message: 'Failed to fetch wishlist item' });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Wishlist item not found' });
        }
        res.json({ success: true, data: results[0] });
    });
});

module.exports = router;
