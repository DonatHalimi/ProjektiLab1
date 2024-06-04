const express = require('express')
const router = express.Router()
const { pool } = require('../db/db');
const { insertUser, editUser, deleteUser } = require('../controllers/auth.controller');

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

// Route to insert a new user
router.post('/post', insertUser);

// Route to edit a user
router.put('/update/:id', editUser);

// Route to delete a user
router.delete('/remove/:id', deleteUser);

module.exports = router