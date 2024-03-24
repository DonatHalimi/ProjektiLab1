const express = require('express')
const router = express.Router()
const stripe = require('stripe')('sk_test_51NDEMaHB8rLE0wX1MgGBJL3DRWoNhZDfuhUoEnopzmJWlJTekmQxFpADJPMTb8HXtF2QnevzC4OgUiqJlyNyOkqG00HsjmDZax');
const { pool, queryAsync } = require('../db/db');

// Constants for the Stripe secret key, sample product prices, and Stripe Product IDs.

// Secret key: sk_test_51NDEMaHB8rLE0wX1MgGBJL3DRWoNhZDfuhUoEnopzmJWlJTekmQxFpADJPMTb8HXtF2QnevzC4OgUiqJlyNyOkqG00HsjmDZax
// Maic:price_1NDESDHB8rLE0wX1TGxQmkVO
// Pantolla:price_1NDETcHB8rLE0wX1hBgetkUb

// New Checkout Session with the specified line items and Stripe settings.
router.post('/checkout', async (req, res) => {
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/Success",
        cancel_url: "http://localhost:3000/Cancel"
    })

    res.send(JSON.stringify({
        url: session.url
    }))
});

// Route to fetch payment data
router.get('/fetch-payments', async (req, res) => {
    try {
        const paymentsData = await fetchPayments();
        res.json(paymentsData);
        // Insert payments into the database
        await insertPaymentsIntoDatabase(paymentsData);
    } catch (error) {
        console.error('Error fetching or inserting payments:', error);
        res.status(500).json({ error: 'Error fetching or inserting payments' });
    }
});

// Function to fetch payments from Stripe
async function fetchPayments() {
    try {
        const payments = await stripe.charges.list({ limit: 100 });
        console.log(payments.data);

        return payments.data;
    } catch (error) {
        throw error;
    }
}

async function insertPaymentsIntoDatabase(paymentsData) {
    try {
        for (const payment of paymentsData) {
            const { id, amount, billing_details, payment_method_details, status } = payment;
            const { email, name } = billing_details;
            const { type } = payment_method_details;

            const query = 'INSERT INTO payments (id, amount, email, name, payment_method_type, status) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [id, amount, email, name, type, status];

            // Execute the query
            try {
                await queryAsync(query, values);
                console.log(`Payment with id ${id} inserted successfully`);
            } catch (error) {
                // Handle duplicate entry error
                if (error.code === 'ER_DUP_ENTRY') {
                    console.log(`Payment with id ${id} already exists in the database. Skipping insertion.`);
                } else {
                    throw error;
                }
            }
        }
    } catch (error) {
        console.error('Error inserting payment data into database:', error);
        throw error;
    }
}

module.exports = router;