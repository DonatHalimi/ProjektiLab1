const express = require('express')
const router = express.Router()
const { pool, queryAsync } = require('../db/db');
const cors = require("cors");
const multer = require("multer"); 
const path = require('path');
const fs = require('fs');

router.get("/get", cors(), (req, res) => {
    const sqlGet = "SELECT * FROM kategoria";
    pool.query(sqlGet, (error, result) => {
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
router.get("/get/:idcategory", cors(), (req, res) => {
    const { idcategory } = req.params;
    const sqlGet = "SELECT * FROM kategoria WHERE idcategory=?";
    pool.query(sqlGet, idcategory, (error, result) => {
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
        cb(null, path.join(__dirname, '../../client/src/img'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

var upload = multer({
    storage: storageCategory
});


// Insertimi i kategorise
router.post("/post", upload.single('FotoKategori'), (req, res) => {
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

// Update i kategorise
router.put("/update/:idcategory", cors(), (req, res) => {
    const { idcategory } = req.params;
    const { EmriKategorise, FotoKategori } = req.body;
    const sqlUpdate = "UPDATE kategoria SET EmriKategorise=?, FotoKategori=? WHERE idcategory=?";
    pool.query(sqlUpdate, [EmriKategorise, FotoKategori, idcategory], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

// Fshirja e kategorise
router.delete("/remove/:idcategory", (req, res) => {
    const idcategory = req.params.idcategory;
    const sqlRemove = "DELETE FROM kategoria WHERE idcategory=?";
    pool.query(sqlRemove, idcategory, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error deleting data from database" });
        } else {
            console.log(result);
            res.sendStatus(200);
        }
    });
});

module.exports = router