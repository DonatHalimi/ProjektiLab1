const { pool } = require('../db/db');

// Get cart items by user ID
const getCartItems = async (req, res) => {
    try {
        const { userId } = req.params;
        const sqlGetCart = 'SELECT * FROM carts WHERE user_id = ?';
        pool.query(sqlGetCart, [userId], (error, cartResult) => {
            if (error) {
                console.error('Error in getCartItems:', error);
                res.status(500).send({ error: 'Error retrieving cart' });
                return;
            }
            if (cartResult.length === 0) {
                const sqlInsertCart = 'INSERT INTO carts (user_id) VALUES (?)';
                pool.query(sqlInsertCart, [userId], (error, insertResult) => {
                    if (error) {
                        console.error('Error in creating new cart:', error);
                        res.status(500).send({ error: 'Error creating new cart' });
                        return;
                    }
                    res.send({ id: insertResult.insertId, user_id: userId, items: [] });
                });
            } else {
                const cartId = cartResult[0].id;
                const sqlGetItems = `
                    SELECT ci.*, p.Emri, p.Cmimi, p.Valuta, TO_BASE64(p.Foto) as Foto
                    FROM cart_items ci
                    JOIN produktet p ON ci.product_id = p.id
                    WHERE ci.cart_id = ?
                `;
                pool.query(sqlGetItems, [cartId], (error, itemsResult) => {
                    if (error) {
                        console.error('Error in getCartItems:', error);
                        res.status(500).send({ error: 'Error retrieving cart items' });
                        return;
                    }
                    res.send({ ...cartResult[0], items: itemsResult });
                });
            }
        });
    } catch (error) {
        console.error('Error in getCartItems:', error);
        res.status(500).json({ message: error.message });
    }
};

// Add item to cart
const addCartItem = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        const sqlGetCart = 'SELECT id FROM carts WHERE user_id = ?';
        pool.query(sqlGetCart, [userId], (error, cartResult) => {
            if (error) {
                console.error('Error in addCartItem:', error);
                res.status(500).send({ error: 'Error retrieving cart' });
                return;
            }

            const cartId = cartResult[0].id;

            const sqlGetCartItem = 'SELECT quantity FROM cart_items WHERE cart_id = ? AND product_id = ?';
            pool.query(sqlGetCartItem, [cartId, productId], (error, cartItemResult) => {
                if (error) {
                    console.error('Error in addCartItem:', error);
                    res.status(500).send({ error: 'Error checking cart item' });
                    return;
                }

                if (cartItemResult.length > 0) {
                    const newQuantity = cartItemResult[0].quantity + quantity;
                    const sqlUpdateCartItem = 'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?';
                    pool.query(sqlUpdateCartItem, [newQuantity, cartId, productId], (error, updateResult) => {
                        if (error) {
                            console.error('Error in addCartItem:', error);
                            res.status(500).send({ error: 'Error updating cart item quantity' });
                            return;
                        }
                        res.status(200).send({ message: 'Item quantity updated', itemId: productId });
                    });
                } else {
                    const sqlInsertCartItem = 'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)';
                    pool.query(sqlInsertCartItem, [cartId, productId, quantity], (error, insertResult) => {
                        if (error) {
                            console.error('Error in addCartItem:', error);
                            res.status(500).send({ error: 'Error adding item to the cart' });
                            return;
                        }
                        res.status(201).send({ message: 'Item added to cart', itemId: insertResult.insertId });
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error in addCartItem:', error);
        res.status(500).json({ message: error.message });
    }
};

// Increase item quantity
const increaseCartItemQuantity = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const sqlGetCart = 'SELECT id FROM carts WHERE user_id = ?';
        pool.query(sqlGetCart, [userId], (error, cartResult) => {
            if (error) {
                console.error('Error in increaseCartItemQuantity:', error);
                res.status(500).send({ error: 'Error retrieving cart' });
                return;
            }

            if (cartResult.length === 0) {
                res.status(400).send({ error: 'Cart not found' });
                return;
            }

            const cartId = cartResult[0].id;

            const sqlGetCartItem = 'SELECT quantity FROM cart_items WHERE cart_id = ? AND product_id = ?';
            pool.query(sqlGetCartItem, [cartId, productId], (error, result) => {
                if (error) {
                    console.error('Error in getting item quantity:', error);
                    res.status(500).send({ error: 'Error getting item quantity' });
                    return;
                }

                if (result.length === 0) {
                    res.status(400).send({ error: 'Item not found in cart' });
                    return;
                }

                const currentQuantity = result[0].quantity;
                const newQuantity = currentQuantity + 1;

                const sqlUpdate = 'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?';
                pool.query(sqlUpdate, [newQuantity, cartId, productId], (error, result) => {
                    if (error) {
                        console.error('Error in increaseCartItemQuantity:', error);
                        res.status(500).send({ error: 'Error updating item quantity' });
                        return;
                    }
                    res.status(200).send({ message: 'Item quantity updated' });
                });
            });
        });
    } catch (error) {
        console.error('Error in increaseCartItemQuantity:', error);
        res.status(500).json({ message: error.message });
    }
};

// Decrease item quantity
const decreaseCartItemQuantity = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const sqlGetCart = 'SELECT id FROM carts WHERE user_id = ?';
        pool.query(sqlGetCart, [userId], (error, cartResult) => {
            if (error) {
                console.error('Error in decreaseCartItemQuantity:', error);
                res.status(500).send({ error: 'Error retrieving cart' });
                return;
            }

            const cartId = cartResult[0].id;

            const sqlGetCartItem = 'SELECT quantity FROM cart_items WHERE cart_id = ? AND product_id = ?';
            pool.query(sqlGetCartItem, [cartId, productId], (error, result) => {
                if (error) {
                    console.error('Error in getting item quantity:', error);
                    res.status(500).send({ error: 'Error getting item quantity' });
                    return;
                }

                if (result.length === 0) {
                    res.status(400).send({ error: 'Item not found in cart' });
                    return;
                }

                const currentQuantity = result[0].quantity;
                const newQuantity = currentQuantity - 1;

                if (newQuantity <= 0) {
                    const sqlDelete = 'DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?';
                    pool.query(sqlDelete, [cartId, productId], (error, result) => {
                        if (error) {
                            console.error('Error in decreaseCartItemQuantity:', error);
                            res.status(500).send({ error: 'Error removing item from cart' });
                            return;
                        }
                        res.status(200).send({ message: 'Item removed from cart' });
                    });
                } else {
                    const sqlUpdate = 'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?';
                    pool.query(sqlUpdate, [newQuantity, cartId, productId], (error, result) => {
                        if (error) {
                            console.error('Error in decreaseCartItemQuantity:', error);
                            res.status(500).send({ error: 'Error updating item quantity' });
                            return;
                        }
                        res.status(200).send({ message: 'Item quantity updated' });
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error in decreaseCartItemQuantity:', error);
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart
const removeCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const sqlGetCart = 'SELECT id FROM carts WHERE user_id = ?';
        pool.query(sqlGetCart, [userId], (error, cartResult) => {
            if (error) {
                console.error('Error in removeCartItem:', error);
                res.status(500).send({ error: 'Error retrieving cart' });
                return;
            }

            const cartId = cartResult[0].id;
            const sqlDelete = 'DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?';
            pool.query(sqlDelete, [cartId, productId], (error, result) => {
                if (error) {
                    console.error('Error in removeCartItem:', error);
                    res.status(500).send({ error: 'Error removing item from cart' });
                    return;
                }
                res.status(200).send({ message: 'Item removed from cart' });
            });
        });
    } catch (error) {
        console.error('Error in removeCartItem:', error);
        res.status(500).json({ message: error.message });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const sqlGetCart = 'SELECT id FROM carts WHERE user_id = ?';
        pool.query(sqlGetCart, [userId], (error, cartResult) => {
            if (error) {
                console.error('Error in clearCart:', error);
                res.status(500).send({ error: 'Error retrieving cart' });
                return;
            }

            const cartId = cartResult[0].id;
            const sqlClear = 'DELETE FROM cart_items WHERE cart_id = ?';
            pool.query(sqlClear, [cartId], (error, result) => {
                if (error) {
                    console.error('Error in clearCart:', error);
                    res.status(500).send({ error: 'Error clearing the cart' });
                    return;
                }
                res.status(200).send({ message: 'Cart cleared' });
            });
        });
    } catch (error) {
        console.error('Error in clearCart:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get total items in cart
const getTotalItems = async (req, res) => {
    try {
        const { userId } = req.params;
        const sqlGetCart = 'SELECT id FROM carts WHERE user_id = ?';
        pool.query(sqlGetCart, [userId], (error, cartResult) => {
            if (error) {
                console.error('Error in getTotalItems:', error);
                res.status(500).send({ error: 'Error retrieving cart' });
                return;
            }

            const cartId = cartResult[0]? cartResult[0].id : null;

            const sqlTotalItems = 'SELECT SUM(quantity) as totalItems FROM cart_items WHERE cart_id = ?';
            pool.query(sqlTotalItems, [cartId], (error, result) => {
                if (error) {
                    console.error('Error in getTotalItems:', error);
                    res.status(500).send({ error: 'Error calculating total items' });
                    return;
                }
                res.status(200).send({ totalItems: result[0].totalItems || 0 });
            });
        });
    } catch (error) {
        console.error('Error in getTotalItems:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCartItems,
    addCartItem,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeCartItem,
    clearCart,
    getTotalItems
};
