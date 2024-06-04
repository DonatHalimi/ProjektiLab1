const jwt = require('jsonwebtoken');
const { queryAsync } = require('../db/db');
const secret = process.env.JWT_SECRET_KEY || 'default-secret-key';

/**
 * Middleware function to verify the JWT token in the request header.
 * If the token is valid, it adds the user's id and role to the request object.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const verifyToken = (req, res, next) => {
    // Get the token from the request header
    const token = req.headers['x-access-token'];

    // If no token is provided, return a 403 error
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    // Verify the token using the secret key
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            // If the token is invalid, return a 401 error
            return res.status(401).send({ message: 'Unauthorized!' });
        }

        // Add the user's id and role to the request object
        req.userId = decoded.id;
        req.userRole = decoded.role;

        // Call the next middleware function
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.userRole !== 2) {
        return res.status(403).send({ message: 'Require Admin Role!' });
    }
    next();
};

module.exports = { verifyToken, isAdmin };
