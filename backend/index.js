const express = require('express');
const cors = require('cors');
const { connectDB } = require('./connection');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { apiLimiter, authLimiter, incidentLimiter } = require('./middleware/rateLimiter');
const UserRouter = require('./routers/userRouter'); //importing user router
const articleRouter = require('./routers/articlerouter'); //importing article router
const expertRouter = require('./routers/expertRouter');   //importing expert router
const newsRouter = require('./routers/newsRouter'); //importing news router
const QueryRouter = require('./routers/QueryRouter'); //importing Query router
const incidentRouter = require('./routers/incidentRouter'); //importing incident router

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    // origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    // credentials: true
    origin: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting
app.use('/api', apiLimiter);
app.use('/auth', authLimiter);
app.use('/incidents', incidentLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use('/users', UserRouter);
app.use('/experts', expertRouter);
app.use('/articles', articleRouter);
app.use('/news', newsRouter);
app.use('/queries', QueryRouter);
app.use('/incidents', incidentRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error logging
app.use(errorLogger);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Start server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    server.close(() => process.exit(1));
});