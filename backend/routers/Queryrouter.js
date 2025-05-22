const express = require('express');
const router = express.Router();
const Query = require('../models/QueryModel');
const { validate, schemas } = require('../middleware/validate');

// Create a new query
router.post('/create', validate(schemas.query), (req, res) => {
    new Query(req.body).save()
        .then(query => {
            res.status(201).json({
                success: true,
                data: query
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error creating query',
                error: err.message
            });
        });
});

// Get all queries (with filters and pagination)
router.get('/getall', (req, res) => {
    const { status, search, page = 1, limit = 10, expertId } = req.query;
    const query = {};

    if (status) {
        query.status = status;
    }
    if (search) {
        query.$text = { $search: search };
    }
    if (expertId) {
        query.expertId = expertId;
    }

    Promise.all([
        Query.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit)),
        Query.countDocuments(query)
    ])
    .then(([queries, total]) => {
        res.json({
            success: true,
            data: queries,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: 'Error fetching queries',
            error: err.message
        });
    });
});

// Get single query by ID
router.get('/getbyid/:id', (req, res) => {
    Query.findById(req.params.id)
        .then(query => {
            if (!query) {
                return res.status(404).json({
                    success: false,
                    message: 'Query not found'
                });
            }

            res.json({
                success: true,
                data: query
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error fetching query',
                error: err.message
            });
        });
});

// Add response to query
router.post('/respond/:id', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({
            success: false,
            message: 'Response message is required'
        });
    }

    Query.findById(req.params.id)
        .then(query => {
            if (!query) {
                return res.status(404).json({
                    success: false,
                    message: 'Query not found'
                });
            }

            // Add response
            query.responses.push({
                message
            });

            // Update status if this is the first response
            if (query.status === 'pending') {
                query.status = 'in_progress';
            }

            return query.save();
        })
        .then(updatedQuery => {
            res.json({
                success: true,
                data: updatedQuery
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error adding response',
                error: err.message
            });
        });
});

// Update query status
router.patch('/updatestatus/:id', (req, res) => {
    const { status } = req.body;
    if (!status || !['pending', 'in_progress', 'resolved'].includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid status'
        });
    }

    Query.findById(req.params.id)
        .then(query => {
            if (!query) {
                return res.status(404).json({
                    success: false,
                    message: 'Query not found'
                });
            }

            query.status = status;
            return query.save();
        })
        .then(updatedQuery => {
            res.json({
                success: true,
                data: updatedQuery
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error updating query status',
                error: err.message
            });
        });
});

// Delete query
router.delete('/delete/:id', (req, res) => {
    Query.findById(req.params.id)
        .then(query => {
            if (!query) {
                return res.status(404).json({
                    success: false,
                    message: 'Query not found'
                });
            }

            return query.deleteOne();
        })
        .then(() => {
            res.json({
                success: true,
                message: 'Query deleted successfully'
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error deleting query',
                error: err.message
            });
        });
});

// Get queries assigned to an expert
router.get('/expert/:expertId', async (req, res) => {
    try {
        const queries = await Query.find({ 
            expertId: req.params.expertId 
        })
        .sort({ createdAt: -1 })
        .populate('userId', 'name email');

        res.json({
            success: true,
            data: queries
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching expert queries',
            error: err.message
        });
    }
});

module.exports = router;
