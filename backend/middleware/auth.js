const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token, access denied'
            });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: 'Token verification failed, authorization denied'
        });
    }
};

const expertAuth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token, access denied'
            });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        if (verified.role !== 'expert') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Expert privileges required.'
            });
        }

        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: 'Token verification failed, authorization denied'
        });
    }
};

const adminAuth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token, access denied'
            });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        if (verified.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin privileges required.'
            });
        }

        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: 'Token verification failed, authorization denied'
        });
    }
};

module.exports = {
    auth,
    expertAuth,
    adminAuth
}; 