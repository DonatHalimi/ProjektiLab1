const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const saltRounds = 10;


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projektilab1'
})

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true,
}));
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));


app.use(
    session({
        key:"userId",
        secret:"mosikllzkerkujt",
        resave:false,
        saveUninitialized:false,
        cookie:{
            expires:60*60*24,
        },

    },)
)

// SQL KOMANDAT PER USERA

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

// Selektimi i userave sipas ID
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


// SQL KOMANDAT PER PRODUKTE

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

// Selektimi i produkteve sipas ID
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

// Insertimi i produkteve
app.post("/api/product/post", (req, res) => {
    const { Emri, Cmimi, Valuta, Detajet, Kategoria, FotoSource } = req.body;
    const sqlInsert = "INSERT INTO produktet (Emri, Cmimi, Valuta, Detajet, Kategoria, FotoSource)VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert, [Emri, Cmimi, Valuta, Detajet, Kategoria, FotoSource], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error inserting data into database" });
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});

// Update i produkteve
app.put("/api/product/update/:idproduct", cors(), (req, res) => {
    const { idproduct } = req.params;
    const { Emri, Cmimi, Valuta, Detajet, Kategoria, FotoSource } = req.body;
    const sqlUpdate = "UPDATE produktet SET Emri=?, Cmimi=?, Valuta=?, Detajet=?, Kategoria=?, FotoSource=? WHERE idproduct=?";
    db.query(sqlUpdate, [Emri, Cmimi, Valuta, Detajet, Kategoria, FotoSource, idproduct], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
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
            res.status(500).send({ error: "Error deleting data from produkti" });
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});


// SQL KOMANDAT PER ABOUTUS

// Selektimi i aboutus
app.get("/api/aboutus/get", cors(), (req, res) => {
    const sqlGet = "SELECT * FROM aboutus";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});


// Selektimi i aboutus sipas ID
app.get("/api/aboutus/get/:idaboutus", cors(), (req, res) => {
    const { idaboutus } = req.params;
    const sqlGet = "SELECT * FROM aboutus WHERE idaboutus=?";
    db.query(sqlGet, idaboutus, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

// Insertimi i aboutus
app.post("/api/aboutus/post", (req, res) => {
    const { teksti } = req.body;
    const sqlInsert = "INSERT INTO aboutus (teksti)VALUES (?)";
    db.query(sqlInsert, [teksti], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error inserting data into database" });
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});

// Update i aboutus
app.put("/api/aboutus/update/:idaboutus", cors(), (req, res) => {
    const { idaboutus } = req.params;
    const { teksti } = req.body;
    const sqlUpdate = "UPDATE aboutus SET teksti=? WHERE idaboutus=?";
    db.query(sqlUpdate, [teksti, idaboutus], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

// Fshirja e aboutus
app.delete("/api/aboutus/remove/:idaboutus", (req, res) => {
    const idaboutus = req.params.idaboutus;
    const sqlRemove = "DELETE FROM aboutus WHERE idaboutus=?";
    db.query(sqlRemove, idaboutus, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error deleting data from aboutus" });
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});

//Insertimi i userave nga Register-formi

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

app.post('/api/user/login', (req, res) => {
    const { Email, Password } = req.body;
    const sqlGet = "SELECT * FROM userat WHERE Email = ?";
    db.query(sqlGet, [Email], (error, result) => {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } 
        if (result.length > 0) {
            bcrypt.compare(Password, result[0].Password, (error, response) => {
                if (response) {
                    req.session.user = result;
                    console.log(req.session.user);
                    res.send(result);
                } else {
                    res.send({ message: "Wrong username/password combination" })
                }
            })
        }
    });
});












const PORT = 6001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});