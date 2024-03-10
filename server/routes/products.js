const express = require('express')
const router = express.Router()
const pool = require('../db/db')
const cors = require("cors");
const multer = require("multer"); 

// Selektimi i produkteve
router.get("/get", cors(), (req, res) => {
    const sqlGet = "SELECT * FROM produktet";
    pool.query(sqlGet, (error, result) => {
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
router.get("/get/:id", cors(), (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM produktet WHERE id=?";
    pool.query(sqlGet, id, (error, result) => {
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
router.post("/post", upload.single('Foto'), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        console.log("No file upload");
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Retrieve form data
    const { id, Emri, Cmimi, Valuta, Detajet, idcategory } = req.body;

    // Retrieve uploaded file path
    const filePath = req.file.path;

    // Read file from path
    fs.readFile(filePath, (error, fileData) => {
        if (error) {
            console.log("Error reading file:", error);
            return res.status(500).json({ error: "Error reading file" });
        }

        // Insert into produktet table
        const sqlInsert = "INSERT INTO produktet (id,Emri, Cmimi, Valuta, Detajet, Foto, idcategory) VALUES (?,?,?,?,?,?,?)";
        const values = [id, Emri, Cmimi, Valuta, Detajet, fileData, idcategory];

        pool.query(sqlInsert, values, (error, result) => {
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
router.put("/update/:id", updateProductUpload.single('Foto'), (req, res) => {
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
    pool.query(sqlUpdate, values, (error, result) => {
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
router.delete("/remove/:id", (req, res) => {
    const id = req.params.id;
    console.log("ID received from request:", id);

    if (id === undefined) {
        return res.status(400).send("Invalid request. ID is missing.");
    }

    // Kontrollo nese produkti me ID e dhene ekziston para se me fshi
    pool.query("SELECT * FROM produktet WHERE id=?", id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Error checking if the product exists");
        } else if (result.length === 0) {
            res.status(404).send(`Produkti me ID ${id} nuk eshte gjetur`);
        } else {
            // Nese produkti ekziston, fshije ate produkt
            pool.query("DELETE FROM produktet WHERE id=?", id, (deleteError) => {
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

// Route per me i marr produktet me te njejten kategori
router.get("/get-by-category/:categoryId", cors(), (req, res) => {
    const { categoryId } = req.params;
    const sqlGetByCategory = "SELECT * FROM produktet WHERE idcategory=?";
    pool.query(sqlGetByCategory, [categoryId], (error, result) => {
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

module.exports = router