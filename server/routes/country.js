const express = require('express')
const router = express.Router()
const { pool, queryAsync } = require('../db/db');
const cors = require("cors")

// Selektimi i country
router.get("/get", cors(), (req, res) => {
    const sqlGet = "SELECT * FROM country"
    pool.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error retrieving data from database" })
        } else {
            res.status(200).send(result)
        }
    })
})

// Selektimi i country sipas ID
router.get("/get/:CountryId", cors(), (req, res) => {
    const { CountryId } = req.params
    const sqlGet = "SELECT * FROM country WHERE CountryId=?"
    pool.query(sqlGet, CountryId, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error retrieving data from database" })
        } else {
            res.status(200).send(result)
        }
    })
})

// Insertimi i country
router.post("/post", (req, res) => {
    const { Name} = req.body
    const sqlInsert = "INSERT INTO country (Name) VALUES (?)"
    pool.query(sqlInsert, [Name], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error inserting data into database" })
        } else {
            console.log(result)
            res.sendStatus(200)
        }
    })
})

// Update i country
router.put("/update/:CountryId", cors(), (req, res) => {
    const CountryId  = req.params.CountryId
    const { Name } = req.body
    const sqlUpdate = "UPDATE country SET Name=? WHERE CountryId=?"
    pool.query(sqlUpdate, [Name, CountryId], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error retrieving data from database" })
        } else {
            res.status(200).send(result)
        }
    })
})

// Fshirja e country
router.delete("/remove/:CountryId", (req, res) => {
    const CountryId = req.params.CountryId
    const sqlRemove = "DELETE FROM country WHERE CountryId=?"
    pool.query(sqlRemove, CountryId, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error deleting data from country" })
        } else {
            console.log(result)
            res.sendStatus(200)
        }
    })
})

module.exports = router