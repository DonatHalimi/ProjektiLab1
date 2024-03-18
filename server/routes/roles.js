const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const { pool, queryAsync } = require('../db/db');
const saltRounds = 10




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

router.get('/roles/:idroles', (req, res) => {
    const roleId = req.params.idroles;
    const sqlGetRoleById = 'SELECT * FROM roles WHERE idroles = ?';
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
    const { role_name } = req.body;
    const sqlInsertRole = 'INSERT INTO roles (role_name) VALUES (?)';
    pool.query(sqlInsertRole, [role_name], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send({ error: 'Error adding role to the database' });
        } else {
            res.status(200).send({ message: 'Role added successfully', role_id: result.insertId });
        }
    });
});

router.put('/update/:idroles', (req, res) => {
    const roleId = req.params.idroles;
    const { role_name } = req.body;
    const sqlUpdateRole = 'UPDATE roles SET role_name = ? WHERE idroles = ?';
    pool.query(sqlUpdateRole, [role_name, roleId], (error, result) => {
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

router.delete('/remove/:idroles', (req, res) => {
    const roleId = req.params.idroles;
    const sqlDeleteRole = 'DELETE FROM roles WHERE idroles = ?';
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

