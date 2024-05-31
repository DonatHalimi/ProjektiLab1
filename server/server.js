const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

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

// Importing route modules for the below entities
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const aboutusRoutes = require('./routes/aboutus');
const slideshowRoutes = require('./routes/slideshow');
const categoryRoutes = require('./routes/category');
const supplierRoutes = require('./routes/suppliers');
const brandRoutes = require('./routes/brands');
const countryRoutes = require('./routes/country');
const rolesRoutes = require('./routes/roles');
const transportRoutes = require('./routes/transport');
const paymentsRoute = require('./routes/payments');
const authRoutes = require('./routes/auth.routes');

// Assigning specific route modules to corresponding API paths
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/aboutus', aboutusRoutes);
app.use('/api/slideshow', slideshowRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/payments', paymentsRoute);
app.use('/api/auth', authRoutes);

// Fillimi i serverit ne portin 6001 dhe shfaqja e mesazhit ne terminal duke konfirmuar se serveri eshte aktivizuar
const PORT = 6001;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:6001');
})