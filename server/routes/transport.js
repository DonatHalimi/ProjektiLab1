const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const { pool, queryAsync } = require('../db/db');
const saltRounds = 10

// Get all users
router.get('/get', (req, res) => {
    const sqlGet = 'SELECT * FROM transport'
    pool.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: 'Error retrieving data from the database' })
        } else {
            res.status(200).send(result)
        }
    })
})

// Get user by ID
router.get('/get/:transportId', (req, res) => {
    const { transportId } = req.params
    const sqlGet = 'SELECT * FROM transport WHERE transportId=?'
    pool.query(sqlGet, transportId, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: 'Error retrieving data from the database' })
        } else {
            res.status(200).send(result)
        }
    })
})

// Add a new user
router.post('/post', (req, res) => {
    const { companyName, phone, email, transportType, transportFee } = req.body
    const sqlInsert = 'INSERT INTO transport ( companyName, phone, email, transportType, transportFee) VALUES (?,?,?,?,?)'
    pool.query(sqlInsert, [ companyName, phone, email, transportType, transportFee ], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: "Error inserting data into database" })
        } else {
            console.log(result)
            res.sendStatus(200)
        }
    })
})
        


// Update a user
router.put('/update/:transportId', (req, res) => {
    const { transportId } = req.params
    const {  companyName, phone, email, transportType, transportFee  } = req.body
    const sqlUpdate = 'UPDATE transport SET companyName=?, phone=?, email=?, transportType=?, transportFee=? WHERE transportId=?'
    
    pool.query(sqlUpdate, [companyName, phone, email, transportType, transportFee,transportId], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: 'Error updating data in the database' })
        } else {
            res.status(200).send(result)
        }
    })
})

// Delete a user
router.delete('/remove/:transportId', (req, res) => {
    const transportId = req.params.transportId
    const sqlRemove = 'DELETE FROM transport WHERE transportId=?'
    
    pool.query(sqlRemove, transportId, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: 'Error deleting data from the database' })
        } else {
            res.sendStatus(200)
        }
    })
})



module.exports = router