const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const stripe = require('stripe')('sk_test_51NDEMaHB8rLE0wX1MgGBJL3DRWoNhZDfuhUoEnopzmJWlJTekmQxFpADJPMTb8HXtF2QnevzC4OgUiqJlyNyOkqG00HsjmDZax');
const { pool, queryAsync } = require('./db/db');



console.log('MySQL Connection Configuration:', {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projektilab1'
});

// Konfigurimi i middleware per me kriju CORS, JSON
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));

app.use(express.json());
app.use(express.static("public"));

// Konfigurimi i middleware per trajtimin e parserit te cookies edhe encoding e trupit te kerkeses se klientit
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Konfigurimi i middleware per sessionin e perdoruesit duke i percaktuar parametrat e atij sessioni
app.use(
    session({
        key: "userId",
        secret: "mosikllzkerkujt",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    },)
)

// Secret key: sk_test_51NDEMaHB8rLE0wX1MgGBJL3DRWoNhZDfuhUoEnopzmJWlJTekmQxFpADJPMTb8HXtF2QnevzC4OgUiqJlyNyOkqG00HsjmDZax
// Maic:price_1NDESDHB8rLE0wX1TGxQmkVO
// Pantolla:price_1NDETcHB8rLE0wX1hBgetkUb

app.post('/checkout', async (req, res) => {
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

// Route to fetch payments
app.get('/fetch-payments', async (req, res) => {
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
                    throw error; // Rethrow other errors
                }
            }
        }
    } catch (error) {
        console.error('Error inserting payment data into database:', error);
        throw error;
    }
}

// Importing route modules for the below entities
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const aboutusRoutes = require('./routes/aboutus');
const slideshowRoutes = require('./routes/slideshow');
const categoryRoutes = require('./routes/category');
const supplierRoutes = require('./routes/suppliers');
const brandRoutes = require('./routes/brands');
const countryRoutes = require('./routes/country');
// Assigning specific route modules to corresponding API paths
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/aboutus', aboutusRoutes);
app.use('/api/slideshow', slideshowRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/countries', countryRoutes);
// Fillimi i serverit ne portin 6001 dhe shfaqja e mesazhit ne terminal duke konfirmuar se serveri eshte aktivizuar
const PORT = 6001;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:6001');
})