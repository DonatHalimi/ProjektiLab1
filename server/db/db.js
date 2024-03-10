const mysql = require('mysql')

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'projektilab1',
    port: process.env.DB_PORT || 3307,
})

module.exports = pool