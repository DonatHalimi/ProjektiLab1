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

// Selektimi i userave
app.get("/api/user/get", cors(), (req, res) => {
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

// Selektimi i produkteve
app.get("/api/product/get", cors(), (req, res) => {
    const sqlGet = "SELECT * FROM produktet";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

// Insertimi i userave
app.post("/api/user/post", (req, res) => {
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

// Insertimi i produkteve
app.post("/api/product/post", (req, res) => {
    const { Emri, Detajet, FotoSource } = req.body;
    const sqlInsert = "INSERT INTO produktet (Emri, Detajet, FotoSource)VALUES (?,?,?)";
    db.query(sqlInsert, [Emri, Detajet, FotoSource], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error inserting data into database" });
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});

// Fshirja e userave
app.delete("/api/user/remove/:id", (req, res) => {
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

// Fshirja e produkteve
app.delete("/api/product/remove/:idproduct", (req, res) => {
    const idproduct = req.params.idproduct;
    const sqlRemove = "DELETE FROM produktet WHERE idproduct=?";
    db.query(sqlRemove, idproduct, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error deleting data from userat" });
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});

// Selektimi i userave
app.get("/api/user/get/:id", cors(), (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM userat WHERE id=?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

// Selektimi i produkteve
app.get("/api/product/get/:idproduct", cors(), (req, res) => {
    const { idproduct } = req.params;
    const sqlGet = "SELECT * FROM produktet WHERE idproduct=?";
    db.query(sqlGet, idproduct, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

// Update i userave
app.put("/api/user/update/:id", cors(), (req, res) => {
    const { id } = req.params;
    const { Name, Surname, Email, Password, Role } = req.body;
    const sqlUpdate = "UPDATE userat SET Name=?, Surname=?, Email=?, Password=?, Role=? WHERE id=?";
    db.query(sqlUpdate, [Name, Surname, Email, Password, Role, id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

// Update i produkteve
app.put("/api/product/update/:idproduct", cors(), (req, res) => {
    const { idproduct } = req.params;
    const { Emri, Detajet, FotoSource } = req.body;
    const sqlUpdate = "UPDATE produktet SET Emri=?, Detajet=?, FotoSource=? WHERE idproduct=?";
    db.query(sqlUpdate, [Emri, Detajet, FotoSource, idproduct], (error, result) => {
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