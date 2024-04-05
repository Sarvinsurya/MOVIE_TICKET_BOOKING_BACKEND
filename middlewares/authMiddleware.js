const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization || req.query.token;
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, 'secretKey');
        req.user = decoded; // Attach decoded user information to request object
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = { verifyToken };
