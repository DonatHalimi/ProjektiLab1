const express = require('express');
const router = express.Router();
const { pool } = require('../db/db');

router.get('/get', (req, res) => {
    const sqlGetRoles = 'SELECT * FROM roles';
    pool.query(sqlGetRoles, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send({ error: 'Error retrieving roles from the database' });
        } else {
            res.status(200).send(result);
        }
    });
});

router.get('/get/:id', (req, res) => {
    const roleId = req.params.id;
    const sqlGetRoleById = 'SELECT * FROM roles WHERE id = ?';
    pool.query(sqlGetRoleById, roleId, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send({ error: 'Error retrieving role from the database' });
        } else {
            if (result.length === 0) {
                res.status(404).send({ error: 'Role not found' });
            } else {
                res.status(200).send(result[0]);
            }
        }
    });
});

router.post('/post', (req, res) => {
    const { name } = req.body;
    const sqlInsertRole = 'INSERT INTO roles (name) VALUES (?)';
    pool.query(sqlInsertRole, [name], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send({ error: 'Error adding role to the database' });
        } else {
            res.status(200).send({ message: 'Role added successfully', role_id: result.insertId });
        }
    });
});

router.put('/update/:id', (req, res) => {
    const roleId = req.params.id;
    const { name } = req.body;
    const sqlUpdateRole = 'UPDATE roles SET name = ? WHERE id = ?';
    pool.query(sqlUpdateRole, [name, roleId], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send({ error: 'Error updating role in the database' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).send({ error: 'Role not found' });
            } else {
                res.status(200).send({ message: 'Role updated successfully' });
            }
        }
    });
});

router.delete('/remove/:id', (req, res) => {
    const roleId = req.params.id;
    const sqlDeleteRole = 'DELETE FROM roles WHERE id = ?';
    pool.query(sqlDeleteRole, roleId, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send({ error: 'Error deleting role from the database' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).send({ error: 'Role not found' });
            } else {
                res.status(200).send({ message: 'Role deleted successfully' });
            }
        }
    });
});

module.exports = router;