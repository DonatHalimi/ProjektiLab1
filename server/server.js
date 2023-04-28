const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projektilab1'
})

app.use(cors());

app.get("/api/get", cors(), (req, res) => {
    const sqlGet = "SELECT * FROM userat";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

const PORT = 6001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
