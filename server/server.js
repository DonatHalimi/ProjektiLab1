const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// MySQL Connection Configuration
console.log('MySQL Connection Configuration:', {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projektilab1'
});

// Middleware setup
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));

// Increase the JSON payload limit to 50MB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static("public"));
app.use(cookieParser());
app.use(
    session({
        key: "userId",
        secret: "mosikllzkerkujt",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

// Route setup
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
const cartRoutes = require('./routes/cart');
const wishlistRoutes= require('./routes/wishlist');

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
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes)

// Server start
const PORT = 6001;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:6001');
});
