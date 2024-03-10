const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const pool = require('../db/db')

// CRUD operations for users

// Get all users
router.get('/get', (req, res) => {
    const sqlGet = 'SELECT * FROM userat'
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
router.get('/get/:id', (req, res) => {
    const { id } = req.params
    const sqlGet = 'SELECT * FROM userat WHERE id=?'
    pool.query(sqlGet, id, (error, result) => {
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
    const { Name, Surname, Email, Password, Role } = req.body
    const sqlInsert = 'INSERT INTO userat (Name, Surname, Email, Password, Role) VALUES (?,?,?,?,?)'
    
    bcrypt.hash(Password, 10, (err, hash) => {
        if (err) {
            console.log(err)
            res.status(500).send({ error: 'Error hashing password' })
        } else {
            pool.query(sqlInsert, [Name, Surname, Email, hash, Role], (error, result) => {
                if (error) {
                    console.log(error)
                    res.status(500).send({ error: 'Error inserting data into the database' })
                } else {
                    res.sendStatus(200)
                }
            })
        }
    })
})

// Update a user
router.put('/update/:id', (req, res) => {
    const { id } = req.params
    const { Name, Surname, Email, Password, Role } = req.body
    const sqlUpdate = 'UPDATE userat SET Name=?, Surname=?, Email=?, Password=?, Role=? WHERE id=?'
    
    pool.query(sqlUpdate, [Name, Surname, Email, Password, Role, id], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: 'Error updating data in the database' })
        } else {
            res.status(200).send(result)
        }
    })
})

// Delete a user
router.delete('/remove/:id', (req, res) => {
    const id = req.params.id
    const sqlRemove = 'DELETE FROM userat WHERE id=?'
    
    pool.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: 'Error deleting data from the database' })
        } else {
            res.sendStatus(200)
        }
    })
})

module.exports = router