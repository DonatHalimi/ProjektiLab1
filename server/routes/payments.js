const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NDEMaHB8rLE0wX1MgGBJL3DRWoNhZDfuhUoEnopzmJWlJTekmQxFpADJPMTb8HXtF2QnevzC4OgUiqJlyNyOkqG00HsjmDZax');
const { pool, queryAsync } = require('../db/db');

// Constants for the Stripe secret key, sample product prices, and Stripe Product IDs.

// Secret key: sk_test_51NDEMaHB8rLE0wX1MgGBJL3DRWoNhZDfuhUoEnopzmJWlJTekmQxFpADJPMTb8HXtF2QnevzC4OgUiqJlyNyOkqG00HsjmDZax
// Maic:price_1NDESDHB8rLE0wX1TGxQmkVO
// Pantolla:price_1NDETcHB8rLE0wX1hBgetkUb

// New Checkout Session with the specified line items and Stripe settings.
router.post('/checkout', async (req, res) => {
    try {
        const { items, transportMode } = req.body;

        console.log('Received request:', req.body);

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Items array is missing or empty.' });
        }

        // Fetch all transport options for the selected transport mode
        const transportOptions = await getTransportOptions(transportMode);

        const lineItems = items.map(item => ({
            price: item.id,
            quantity: item.quantity,
        }));

        transportOptions.forEach(transport => {
            lineItems.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: transport.transportType,
                    },
                    unit_amount: transport.transportFee * 100,
                },
                quantity: 1,
            });
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: "http://localhost:3000/Success",
            cancel_url: "http://localhost:3000/Cancel",
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'AL'],
            },
        });

        res.json({ url: session.url });

    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Unable to create checkout session.' });
    }
});

async function getTransportOptions(transportMode) {
    try {
        const sql = 'SELECT * FROM transport WHERE transportType = ?';
        const params = [transportMode];
        const results = await queryAsync(sql, params);
        return results;
    } catch (error) {
        console.error('Error retrieving transport options:', error);
        return [];
    }
}

module.exports = router;