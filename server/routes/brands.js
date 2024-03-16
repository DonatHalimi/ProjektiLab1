const express = require('express')
const router = express.Router()
const { pool, queryAsync } = require('../db/db');
const cors = require("cors")

// Selektimi i brands
router.get("/get", cors(), (req, res) => {
    const sqlGet = "SELECT * FROM brands"
    pool.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error retrieving data from database" })
        } else {
            res.status(200).send(result)
        }
    })
})

// Selektimi i brands sipas ID
router.get("/get/:BrandId", cors(), (req, res) => {
    const { BrandId } = req.params
    const sqlGet = "SELECT * FROM brands WHERE BrandId=?"
    pool.query(sqlGet, BrandId, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error retrieving data from database" })
        } else {
            res.status(200).send(result)
        }
    })
})

// Insertimi i brands
router.post("/post", (req, res) => {
    const { Name, Description, idcountry } = req.body
    const sqlInsert = "INSERT INTO brands (Name, Description, idcountry) VALUES (?, ?, ?)"
    pool.query(sqlInsert, [Name, Description, idcountry], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error inserting data into database" })
        } else {
            console.log(result)
            res.sendStatus(200)
        }
    })
})

// Update i brands
router.put("/update/:BrandId", cors(), (req, res) => {
    const BrandId = req.params.BrandId
    const { Name, Description, idcountry } = req.body
    const sqlUpdate = "UPDATE brands SET Name=?, Description=?, idcountry=? WHERE BrandId=?"
    pool.query(sqlUpdate, [Name, Description, idcountry, BrandId], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error retrieving data from database" })
        } else {
            res.status(200).send(result)
        }
    })
})

// Fshirja e brands
router.delete("/remove/:BrandId", (req, res) => {
    const BrandId = req.params.BrandId
    const sqlRemove = "DELETE FROM brands WHERE BrandId=?"
    pool.query(sqlRemove, BrandId, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error deleting data from brands" })
        } else {
            console.log(result)
            res.sendStatus(200)
        }
    })
})

module.exports = router