const express = require('express')
const router = express.Router()
const pool = require('../db/db')
const cors = require("cors")

// Selektimi i suppliers
router.get("/get", cors(), (req, res) => {
    const sqlGet = "SELECT * FROM suppliers"
    pool.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error retrieving data from database" })
        } else {
            res.status(200).send(result)
        }
    })
})

// Selektimi i suppliers sipas ID
router.get("/get/:SupplierId", cors(), (req, res) => {
    const { SupplierId } = req.params
    const sqlGet = "SELECT * FROM suppliers WHERE SupplierId=?"
    pool.query(sqlGet, SupplierId, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error retrieving data from database" })
        } else {
            res.status(200).send(result)
        }
    })
})

// Insertimi i suppliers
router.post("/post", (req, res) => {
    const { Name, Phone, Address } = req.body
    const sqlInsert = "INSERT INTO suppliers (Name, Phone, Address) VALUES (?, ?, ?)"
    pool.query(sqlInsert, [Name, Phone, Address], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error inserting data into database" })
        } else {
            console.log(result)
            res.sendStatus(200)
        }
    })
})

// Update i suppliers
router.put("/update/:SupplierId", cors(), (req, res) => {
    const SupplierId  = req.params.SupplierId
    const { Name, Phone, Address } = req.body
    const sqlUpdate = "UPDATE suppliers SET Name=?, Phone=?, Address=? WHERE SupplierId=?"
    pool.query(sqlUpdate, [Name, Phone, Address, SupplierId], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error retrieving data from database" })
        } else {
            res.status(200).send(result)
        }
    })
})

// Fshirja e suppliers
router.delete("/remove/:SupplierId", (req, res) => {
    const SupplierId = req.params.SupplierId
    const sqlRemove = "DELETE FROM suppliers WHERE SupplierId=?"
    pool.query(sqlRemove, SupplierId, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error deleting data from suppliers" })
        } else {
            console.log(result)
            res.sendStatus(200)
        }
    })
})

module.exports = router