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

// Definimi i nje route per root endpoint
app.get('/', (req, res) => {
    res.send('Hello, this is the root endpoint!');
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

// CRUDAT PER USERA

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
    });
}
)

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


// CRUDAT PER PRODUKTE

// Selektimi i produkteve
app.get("/api/product/get", cors(), (req, res) => {
    const sqlGet = "SELECT * FROM produktet";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from the database" });
        } else {
            // Convert the image data to base64 strings
            const productsWithImageData = result.map((product) => {
                const base64Data = Buffer.from(product.Foto).toString("base64");
                return { ...product, Foto: base64Data };
            });

            res.status(200).send(productsWithImageData);
        }
    });
});

// Selektimi i produkteve sipas ID
app.get("/api/product/get/:id", cors(), (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM produktet WHERE id=?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

// Set up multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../client/src/img'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

var upload = multer({
    storage: storage
});


// Insertimi i produkteve
app.post("/api/product/post", upload.single('Foto'), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        console.log("No file upload");
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Retrieve form data
    const { Emri, Cmimi, Valuta, Detajet, idcategory } = req.body;

    // Retrieve uploaded file path
    const filePath = req.file.path;

    // Read file from path
    fs.readFile(filePath, (error, fileData) => {
        if (error) {
            console.log("Error reading file:", error);
            return res.status(500).json({ error: "Error reading file" });
        }

        // Insert into produktet table
        const sqlInsert = "INSERT INTO produktet (Emri, Cmimi, Valuta, Detajet, Foto, idcategory) VALUES (?,?,?,?,?,?)";
        const values = [Emri, Cmimi, Valuta, Detajet, fileData, idcategory];

        db.query(sqlInsert, values, (error, result) => {
            if (error) {
                console.log("Database error:", error);
                res.status(500).json({ error: "Error inserting data into the database" });
            } else {
                console.log("Database result:", result);
                res.sendStatus(200);
            }
        });
    });
});

// Update i produkteve
// CRUDI I VJETER PER UPDATE
// app.put("/api/product/update/:id", cors(), (req, res) => {
//     const { id } = req.params;
//     const { Emri, Cmimi, Valuta, Detajet, Foto, idcategory } = req.body;
//     const sqlUpdate = "UPDATE produktet SET Emri=?, Cmimi=?, Valuta=?, Detajet=?, Foto=?, idcategory=? WHERE id=?";
//     db.query(sqlUpdate, [Emri, Cmimi, Valuta, Detajet, Foto, idcategory, id], (error, result) => {
//         if (error) {
//             console.log(error);
//             res.status(500).send({ error: "Error retrieving data from database" });
//         } else {
//             res.status(200).send(result);
//         }
//     });
// });

const updateProductStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../client/src/img'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const updateProductUpload = multer({ storage: updateProductStorage });

// Update produktet
app.put("/api/product/update/:id", updateProductUpload.single('Foto'), (req, res) => {
    const { id } = req.params;
    const { Emri, Cmimi, Valuta, Detajet, idcategory } = req.body;

    let sqlUpdate;
    let values;

    if (!Emri || !Cmimi || !Valuta || !Detajet || !idcategory) {
        return res.status(400).json({ error: "All fields are required." });
    }

    if (req.file) {
        const filePath = req.file.path;

        // Update product with the new file path
        sqlUpdate = "UPDATE produktet SET Emri=?, Cmimi=?, Valuta=?, Detajet=?, Foto=?, idcategory=? WHERE id=?";
        values = [Emri, Cmimi, Valuta, Detajet, filePath, idcategory, id];
    } else {
        // Update product without changing the photo
        sqlUpdate = "UPDATE produktet SET Emri=?, Cmimi=?, Valuta=?, Detajet=?, idcategory=? WHERE id=?";
        values = [Emri, Cmimi, Valuta, Detajet, idcategory, id];
    }

    // Execute the query with error handling
    db.query(sqlUpdate, values, (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Error updating data in the database" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        const successMessage = req.file ? "Product updated with a new photo" : "Product updated without changing the photo";
        res.status(200).json({ message: successMessage, updatedProduct: { id, Emri, Cmimi, Valuta, Detajet, idcategory } });
    });
});


// Fshirja e produkteve
// CRUDI I VJETER PER FSHIRJE
// app.delete("/api/product/remove/:id", (req, res) => {
//     const id = req.params.id;
//     console.log("ID received from request:", id); // Add this line for debugging
//     if (id === undefined) {
//         return res.status(400).send("Invalid request. ID is missing.");
//     }

//     db.query("DELETE FROM produktet WHERE id=?", id, (error, result) => {
//         if (error) {
//             console.error(error);
//             res.status(500).send("Error deleting product");
//         } else {
//             console.log(`Deleted product with ID ${id}`);
//             res.status(200).send("Product deleted successfully");
//         }
//     });
// });

// Remove produkte
app.delete("/api/product/remove/:id", (req, res) => {
    const id = req.params.id;
    console.log("ID received from request:", id);

    if (id === undefined) {
        return res.status(400).send("Invalid request. ID is missing.");
    }

    // Kontrollo nese produkti me ID e dhene ekziston para se me fshi
    db.query("SELECT * FROM produktet WHERE id=?", id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Error checking if the product exists");
        } else if (result.length === 0) {
            res.status(404).send(`Produkti me ID ${id} nuk eshte gjetur`);
        } else {
            // Nese produkti ekziston, fshije ate produkt
            db.query("DELETE FROM produktet WHERE id=?", id, (deleteError) => {
                if (deleteError) {
                    console.error(deleteError);
                    res.status(500).send("Error deleting product");
                } else {
                    console.log(`Eshte fshire produkti me id: ${id}`);
                    res.status(200).send("Produkti eshte fshire me sukses");
                }
            });
        }
    });
});



// CRUDAT PER ABOUTUS

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

// CRUDAT PER SLIDESHOW

app.get("/api/slideshow/get", cors(), (req, res) => {
    const sqlGet = "SELECT * FROM slideshow";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from the database" });
        } else {
            // Convert the image data to base64 strings
            const slideshowWithImageData = result.map((slideshow) => {
                const base64Data = Buffer.from(slideshow.Foto).toString("base64");
                return { ...slideshow, Foto: base64Data };
            });

            res.status(200).send(slideshowWithImageData);
        }
    });
});

// Selektimi i slideshow sipas ID
app.get("/api/slideshow/get/:idslideshow", cors(), (req, res) => {
    const { idslideshow } = req.params;
    const sqlGet = "SELECT * FROM slideshow WHERE idslideshow=?";
    db.query(sqlGet, idslideshow, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

// Set up multer configuration
const storageSlideshow = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../client/src/img'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

var upload = multer({
    storage: storageSlideshow
});


// Insertimi i slideshow
app.post("/api/slideshow/post", upload.single('Foto'), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        console.log("No file upload");
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Retrieve form data
    const { EmriFoto } = req.body;

    // Retrieve uploaded file path
    const filePath = req.file.path;

    // Read file from path
    fs.readFile(filePath, (error, fileData) => {
        if (error) {
            console.log("Error reading file:", error);
            return res.status(500).json({ error: "Error reading file" });
        }

        // Insert into slideshow table
        const sqlInsert = "INSERT INTO slideshow (EmriFoto, Foto) VALUES (?,?)";
        const values = [EmriFoto, fileData];

        db.query(sqlInsert, values, (error, result) => {
            if (error) {
                console.log("Database error:", error);
                res.status(500).json({ error: "Error inserting data into the database" });
            } else {
                console.log("Database result:", result);
                res.sendStatus(200);
            }
        });
    });
});

// Update i slideshow
app.put("/api/slideshow/update/:idslideshow", cors(), (req, res) => {
    const { idslideshow } = req.params;
    const { EmriFoto, Foto } = req.body;
    const sqlUpdate = "UPDATE slideshow SET EmriFoto=?, Foto=? WHERE idslideshow=?";
    db.query(sqlUpdate, [EmriFoto, Foto, idslideshow], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

// Fshirja e slideshow
app.delete("/api/slideshow/remove/:idslideshow", (req, res) => {
    const idslideshow = req.params.idslideshow;
    const sqlRemove = "DELETE FROM slideshow WHERE idslideshow=?";
    db.query(sqlRemove, idslideshow, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error deleting data from database" });
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});

// CRUDAT PER KATEGORI TE PRODUKTEVE

app.get("/api/category/get", cors(), (req, res) => {
    const sqlGet = "SELECT * FROM kategoria";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from the database" });
        } else {
            // Convert the image data to base64 strings
            const categoryWithImageData = result.map((kategoria) => {
                const base64Data = Buffer.from(kategoria.FotoKategori).toString("base64");
                return { ...kategoria, FotoKategori: base64Data };
            });

            res.status(200).send(categoryWithImageData);
        }
    });
});

// Selektimi i slideshow sipas ID
app.get("/api/category/get/:idcategory", cors(), (req, res) => {
    const { idcategory } = req.params;
    const sqlGet = "SELECT * FROM kategoria WHERE idcategory=?";
    db.query(sqlGet, idcategory, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

// Set up multer configuration
const storageCategory = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../client/src/img'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

var upload = multer({
    storage: storageCategory
});


// Insertimi i kategorise
app.post("/api/category/post", upload.single('FotoKategori'), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        console.log("No file upload");
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Retrieve form data
    const { EmriKategorise } = req.body;

    // Retrieve uploaded file path
    const filePath = req.file.path;

    // Read file from path
    fs.readFile(filePath, (error, fileData) => {
        if (error) {
            console.log("Error reading file:", error);
            return res.status(500).json({ error: "Error reading file" });
        }

        // Insert into category table
        const sqlInsert = "INSERT INTO kategoria (EmriKategorise, FotoKategori) VALUES (?,?)";
        const values = [EmriKategorise, fileData];

        db.query(sqlInsert, values, (error, result) => {
            if (error) {
                console.log("Database error:", error);
                res.status(500).json({ error: "Error inserting data into the database" });
            } else {
                console.log("Database result:", result);
                res.sendStatus(200);
            }
        });
    });
});

// Update i kategorise
app.put("/api/category/update/:idcategory", cors(), (req, res) => {
    const { idcategory } = req.params;
    const { EmriKategorise, FotoKategori } = req.body;
    const sqlUpdate = "UPDATE kategoria SET EmriKategorise=?, FotoKategori=? WHERE idcategory=?";
    db.query(sqlUpdate, [EmriKategorise, FotoKategori, idcategory], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

// Fshirja e kategorise
app.delete("/api/category/remove/:idcategory", (req, res) => {
    const idcategory = req.params.idcategory;
    const sqlRemove = "DELETE FROM kategoria WHERE idcategory=?";
    db.query(sqlRemove, idcategory, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error deleting data from database" });
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});

// Route per me i marr produktet me te njejten kategori
app.get("/api/products/get-by-category/:categoryId", cors(), (req, res) => {
    const { categoryId } = req.params;
    const sqlGetByCategory = "SELECT * FROM produktet WHERE idcategory=?";
    db.query(sqlGetByCategory, [categoryId], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from the database" });
        } else {
            // Convert the image data to base64 strings
            const productsWithImageData = result.map((product) => {
                const base64Data = Buffer.from(product.Foto).toString("base64");
                return { ...product, Foto: base64Data };
            });

            res.status(200).json(productsWithImageData);
        }
    });
});


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


// Fillimi i serverit ne portin 6001 dhe shfaqja e mesazhit ne terminal duke konfirmuar se serveri eshte aktivizuar
const PORT = 6001;
app.listen(PORT, (res) => {
    res.send('Hello, this is the root endpoint!');
    console.log('Server is running on port ${PORT}');
});