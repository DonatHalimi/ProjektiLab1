const express = require('express')
const router = express.Router()
const pool = require('../db/db')
const cors = require("cors");
const multer = require("multer"); 
const path = require('path');
const fs = require('fs');

router.get("/get", cors(), (req, res) => {
    const sqlGet = "SELECT * FROM slideshow";
    pool.query(sqlGet, (error, result) => {
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
router.get("/get/:idslideshow", cors(), (req, res) => {
    const { idslideshow } = req.params;
    const sqlGet = "SELECT * FROM slideshow WHERE idslideshow=?";
    pool.query(sqlGet, idslideshow, (error, result) => {
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
        cb(null, path.join(__dirname, '../../client/src/img'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

var upload = multer({
    storage: storageSlideshow
});


// Insertimi i slideshow
router.post("/post", upload.single('Foto'), (req, res) => {
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

// Update i slideshow
router.put("/update/:idslideshow", cors(), (req, res) => {
    const { idslideshow } = req.params;
    const { EmriFoto, Foto } = req.body;
    const sqlUpdate = "UPDATE slideshow SET EmriFoto=?, Foto=? WHERE idslideshow=?";
    pool.query(sqlUpdate, [EmriFoto, Foto, idslideshow], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ error: "Error retrieving data from database" });
        } else {
            res.status(200).send(result);
        }
    });
});

// Fshirja e slideshow
router.delete("/remove/:idslideshow", (req, res) => {
    const idslideshow = req.params.idslideshow;
    const sqlRemove = "DELETE FROM slideshow WHERE idslideshow=?";
    pool.query(sqlRemove, idslideshow, (error, result) => {
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