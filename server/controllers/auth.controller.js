const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { queryAsync } = require('../db/db');
const secret = process.env.JWT_SECRET_KEY || 'default-secret-key';

exports.signup = async (req, res) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        const existingUser = await queryAsync('SELECT * FROM userat WHERE username = ? OR email = ?', [username, email]);
        if (existingUser.length > 0) {
            return res.status(400).send({ message: 'Username or email already exists' });
        }

        const roleResult = await queryAsync('SELECT * FROM roles WHERE name = ?', [role]);
        const roleId = roleResult.length > 0 ? roleResult[0].id : 1;

        await queryAsync('INSERT INTO userat (username, email, password, role_id) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, roleId]);
        res.send({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const results = await queryAsync('SELECT * FROM userat WHERE email = ?', [email]);
        if (results.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ accessToken: null, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, role: user.role_id }, secret, { expiresIn: 86400 });
        res.status(200).send({ id: user.id, username: user.username, email: user.email, role: user.role_id, accessToken: token });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
