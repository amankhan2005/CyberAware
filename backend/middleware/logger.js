const path = require('path');

// Request logging middleware (no-op)
const requestLogger = (req, res, next) => {
    next();
};

// Error logging middleware (no-op)
const errorLogger = (err, req, res, next) => {
    next(err);
};

module.exports = {
    // Logging removed
};