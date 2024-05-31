const jwt = require('jsonwebtoken');
const { queryAsync } = require('../db/db');
const secret = process.env.JWT_SECRET_KEY || 'default-secret-key';

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
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
