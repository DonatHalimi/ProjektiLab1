const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const { pool, queryAsync } = require('../db/db');
const saltRounds = 10

// Get all userat
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
    const { username, email, password, role_id } = req.body
    const sqlInsert = 'INSERT INTO userat (username, email, password, role_id) VALUES (?,?,?,?)'

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.log(err)
            res.status(500).send({ error: 'Error hashing password' })
        } else {
            pool.query(sqlInsert, [username, email, password, hash, role_id], (error, result) => {
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
    const { username, email, password, role_id } = req.body
    const sqlUpdate = 'UPDATE userat SET username=?, email=?, password=?, role_id=? WHERE id=?'

    pool.query(sqlUpdate, [username, email, password, role_id, id], (error, result) => {
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