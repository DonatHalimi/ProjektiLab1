const express = require('express')
const router = express.Router()
const pool = require('../db/db')
const cors = require("cors")

// Selektimi i aboutus
router.get("/get", cors(), (req, res) => {
    const sqlGet = "SELECT * FROM aboutus"
    pool.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error retrieving data from database" })
        } else {
            res.status(200).send(result)
        }
    })
})


// Selektimi i aboutus sipas ID
router.get("/get/:idaboutus", cors(), (req, res) => {
    const { idaboutus } = req.params
    const sqlGet = "SELECT * FROM aboutus WHERE idaboutus=?"
    pool.query(sqlGet, idaboutus, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error retrieving data from database" })
        } else {
            res.status(200).send(result)
        }
    })
})

// Insertimi i aboutus
router.post("/post", (req, res) => {
    const { teksti } = req.body
    const sqlInsert = "INSERT INTO aboutus (teksti)VALUES (?)"
    pool.query(sqlInsert, [teksti], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error inserting data into database" })
        } else {
            console.log(result)
            res.sendStatus(200)
        }
    })
})

// Update i aboutus
router.put("/update/:idaboutus", cors(), (req, res) => {
    const { idaboutus } = req.params
    const { teksti } = req.body
    const sqlUpdate = "UPDATE aboutus SET teksti=? WHERE idaboutus=?"
    pool.query(sqlUpdate, [teksti, idaboutus], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error retrieving data from database" })
        } else {
            res.status(200).send(result)
        }
    })
})

// Fshirja e aboutus
router.delete("/remove/:idaboutus", (req, res) => {
    const idaboutus = req.params.idaboutus
    const sqlRemove = "DELETE FROM aboutus WHERE idaboutus=?"
    pool.query(sqlRemove, idaboutus, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error deleting data from aboutus" })
        } else {
            console.log(result)
            res.sendStatus(200)
        }
    })
})

module.exports = router