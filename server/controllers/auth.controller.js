const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { queryAsync } = require('../db/db');
const secret = process.env.JWT_SECRET_KEY || 'default-secret-key';

/**
 * Sign up a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The success message or error message.
 */
exports.signup = async (req, res) => {
    // Destructure the request body
    const { username, email, password, role } = req.body;

    // Hash the password using bcrypt with a salt rounds of 8
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        // Query the database for an existing user with the given username or email
        const existingUser = await queryAsync(
            'SELECT * FROM userat WHERE username = ? OR email = ?',
            [username, email]
        );

        // If the user already exists, return a 400 error
        if (existingUser.length > 0) {
            return res.status(400).send({ message: 'Username or email already exists' });
        }

        // Query the database for the role id of the given role
        const roleResult = await queryAsync('SELECT * FROM roles WHERE name = ?', [role]);
        const roleId = roleResult.length > 0 ? roleResult[0].id : 1;

        // Insert the new user into the database
        await queryAsync(
            'INSERT INTO userat (username, email, password, role_id) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, roleId]
        );

        // Return a success message
        res.send({ message: 'User registered successfully!' });
    } catch (err) {
        // If there is an error, return a 500 error
        res.status(500).send({ message: err.message });
    }
};

/**
 * Sign in a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The user object or error message.
 */
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query the database for the user with the given email
        const results = await queryAsync('SELECT * FROM userat WHERE email = ?', [email]);

        // If no user is found, return a 404 error
        if (results.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        const user = results[0];

        // Check if the provided password matches the hashed password in the database
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        // If the password is invalid, return a 401 error
        if (!isPasswordValid) {
            return res.status(401).send({ accessToken: null, message: 'Invalid password' });
        }

        // Generate a JWT token for the user
        const token = jwt.sign({ id: user.id, role: user.role_id }, secret, { expiresIn: 86400 });

        // Return the user object with the JWT token
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role_id,
            accessToken: token
        });
    } catch (err) {
        // If there is an error, return a 500 error
        res.status(500).send({ message: err.message });
    }
};

/**
 * Insert a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The success message or error message.
 */
exports.insertUser = async (req, res) => {
    // Destructure the request body
    const { username, email, password, role_id } = req.body;

    // Hash the password using bcrypt with a salt rounds of 8
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        // Query the database for an existing user with the given username or email
        const existingUser = await queryAsync(
            'SELECT * FROM userat WHERE username = ? OR email = ?',
            [username, email]
        );

        // If the user already exists, return a 400 error
        if (existingUser.length > 0) {
            return res.status(400).send({ message: 'Username or email already exists' });
        }

        // Query the database for the role id of the given role
        const roleResult = await queryAsync('SELECT * FROM roles WHERE id = ?', [role_id]);
        const roleId = roleResult.length > 0 ? roleResult[0].id : 1;

        // Insert the new user into the database
        await queryAsync(
            'INSERT INTO userat (username, email, password, role_id) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, roleId]
        );

        // Return a success message
        res.send({ message: 'User registered successfully!' });
    } catch (err) {
        // If there is an error, return a 500 error
        res.status(500).send({ message: err.message });
    }
};

exports.editUser = async (req, res) => {
    const { id } = req.params;
    // Destructure the request body
    const { username, email, password, role_id } = req.body;

    try {
        // Query the database for the user with the given id
        const user = await queryAsync('SELECT * FROM userat WHERE id = ?', [id]);

        // If the user doesn't exist, return a 404 error
        if (user.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Hash the password using bcrypt with a salt rounds of 8
        const hashedPassword = password ? bcrypt.hashSync(password, 8) : user[0].password;

        // Query the database for the role id of the given role
        const roleResult = await queryAsync('SELECT * FROM roles WHERE id = ?', [role_id]);
        const roleId = roleResult.length > 0 ? roleResult[0].id : user[0].role_id;

        // Update the user's details in the database
        await queryAsync(
            'UPDATE userat SET username = ?, email = ?, password = ?, role_id = ? WHERE id = ?',
            [username, email, hashedPassword, roleId, id]
        );

        // Return a success message
        res.send({ message: 'User updated successfully!' });
    } catch (err) {
        // If there is an error, return a 500 error
        res.status(500).send({ message: err.message });
    }
};

/**
* Delete a user.
*
* @param {Object} req - The request object.
* @param {Object} res - The response object.
* @returns {Object} The success message or error message.
*/
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Query the database to delete the user with the given id
        await queryAsync('DELETE FROM userat WHERE id = ?', [id]);

        // Return a success message
        res.send({ message: 'User deleted successfully!' });
    } catch (err) {
        // If there is an error, return a 500 error
        res.status(500).send({ message: err.message });
    }
};