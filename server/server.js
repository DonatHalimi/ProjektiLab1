const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const saltRounds = 10;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const stripe = require('stripe')('sk_test_51NDEMaHB8rLE0wX1MgGBJL3DRWoNhZDfuhUoEnopzmJWlJTekmQxFpADJPMTb8HXtF2QnevzC4OgUiqJlyNyOkqG00HsjmDZax');

// Krijimi i nje lidhje me bazen e te dhenave MySQL duke perdorur te dhenat e qasjes
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'projektilab1',
    port: process.env.DB_PORT || 3307
});

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

// Insertimi i userave nga Register-formi
app.post("/api/user/register", (req, res) => {

    const { Name, Surname, Email, Password, Role } = req.body;
    const sqlInsert = "INSERT INTO userat (Name, Surname, Email, Password, Role)VALUES (?,?,?,?,?)";
    bcrypt.hash(Password, saltRounds, (err, hash) => {
        db.query(sqlInsert, [Name, Surname, Email, hash, Role], (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send({ error: "Error inserting data into database" });
            } else {
                console.log(result);
                res.sendStatus(200);
            }
        });
    })
});

// Krijojme nje API POST per kerkesa te lidhura me autentifikimin e perdoruesit ne aplikacion
app.post('/api/user/login', (req, res) => {
    const { Email, Password } = req.body;

    const sqlGet = "SELECT * FROM userat WHERE Email = ?";
    db.query(sqlGet, Email, (error, result) => {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        }
        console.log("Result:", result);
        if (result && result.length > 0) {
            bcrypt.compare(Password, result[0].Password, (error, response) => {
                if (response) {
                    req.session.user = result;
                    console.log(req.session.user);
                    res.send(result);
                } else {
                    res.send({ message: "Wrong username/password combination" });
                }
            });
        } else {
            res.send({ message: "User not found" });
        }
    });
});

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

// Importing route modules for the below entities
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const aboutusRoutes = require('./routes/aboutus');
const slideshowRoutes = require('./routes/slideshow');
const categoryRoutes = require('./routes/category');

// Assigning specific route modules to corresponding API paths
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/aboutus', aboutusRoutes);
app.use('/api/slideshow', slideshowRoutes);
app.use('/api/category', categoryRoutes);

// Fillimi i serverit ne portin 6001 dhe shfaqja e mesazhit ne terminal duke konfirmuar se serveri eshte aktivizuar
const PORT = 6001;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:6001');
})