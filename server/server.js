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
app.use(express.json());

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

app.post("/api/post", (req, res) => {
    const { Name, Surname, Email, Password, Role } = req.body;
    const sqlInsert = "INSERT INTO userat (Name, Surname, Email, Password, Role)VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [Name, Surname, Email, Password, Role], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error inserting data into database" });
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});

app.delete("/api/remove/:id", (req, res) => {
    const id = req.params.id;
    const sqlRemove = "DELETE FROM userat WHERE id=?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error deleting data from userat" });
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});

app.get("/api/get/:id", cors(), (req, res) => {
    const {id}=req.params;
    const sqlGet = "SELECT * FROM userat where id=?";
    db.query(sqlGet, id,(error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

app.put("/api/update/:id", cors(), (req, res) => {
    const { id }=req.params;
    const {Name, Surname, Email, Password, Role}=req.body;
    const sqlUpdate = "UPDATE userat SET Name=?, Surname=?, Email=?, Password=?, Role=? WHERE id=?";
    db.query(sqlUpdate, [Name, Surname, Email, Password, Role,id],(error, result) => {
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