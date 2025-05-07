const express = require('express');
const router = express.Router();
const Query = require('../models/queryModel');
const { auth, expertAuth } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Create a new query (User only)
router.post('/create', auth, validate(schemas.query), async (req, res) => {
    try {
        const query = await Query.create({
            ...req.body,
            userId: req.user._id
        });
        res.status(201).json({
            success: true,
            data: query
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error creating query',
            error: err.message
        });
    }
});

// Get all queries (with filters and pagination)
router.get('/getall', auth, async (req, res) => {
    try {
        const { status, priority, search, page = 1, limit = 10 } = req.query;
        const query = {};

        // Add filters based on user role
        if (req.user.role === 'user') {
            query.userId = req.user._id;
        } else if (req.user.role === 'expert') {
            query.$or = [
                { assignedTo: req.user._id },
                { assignedTo: null }
            ];
        }

        if (status) {
            query.status = status;
        }
        if (priority) {
            query.priority = priority;
        }
        if (search) {
            query.$text = { $search: search };
        }

        const queries = await Query.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('userId', 'name email')
            .populate('assignedTo', 'firstName lastName expertise')
            .populate('responses.responder', 'firstName lastName expertise');

        const total = await Query.countDocuments(query);

        res.json({
            success: true,
            data: queries,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching queries',
            error: err.message
        });
    }
});

// Get single query by ID
router.get('/getbyid/:id', auth, async (req, res) => {
    try {
        const query = await Query.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('assignedTo', 'firstName lastName expertise')
            .populate('responses.responder', 'firstName lastName expertise');

        if (!query) {
            return res.status(404).json({
                success: false,
                message: 'Query not found'
            });
        }

        // Check if user has permission to view this query
        if (req.user.role === 'user' && query.userId._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this query'
            });
        }

        res.json({
            success: true,
            data: query
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching query',
            error: err.message
        });
    }
});

// Add response to query (Expert only)
router.post('/respond/:id', expertAuth, async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Response message is required'
            });
        }

        const query = await Query.findById(req.params.id);
        if (!query) {
            return res.status(404).json({
                success: false,
                message: 'Query not found'
            });
        }

        // Add response
        query.responses.push({
            responder: req.user._id,
            message
        });

        // Update status if this is the first response
        if (query.status === 'pending') {
            query.status = 'in_progress';
            query.assignedTo = req.user._id;
        }

        await query.save();

        res.json({
            success: true,
            data: query
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error adding response',
            error: err.message
        });
    }
});

// Update query status (Expert only)
router.patch('/updatestatus/:id', expertAuth, async (req, res) => {
    try {
        const { status } = req.body;
        if (!status || !['pending', 'in_progress', 'resolved', 'closed'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const query = await Query.findById(req.params.id);
        if (!query) {
            return res.status(404).json({
                success: false,
                message: 'Query not found'
            });
        }

        query.status = status;
        if (status === 'resolved') {
            query.isResolved = true;
            query.resolvedAt = new Date();
        }

        await query.save();

        res.json({
            success: true,
            data: query
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error updating query status',
            error: err.message
        });
    }
});

// Update query priority (Expert only)
router.patch('/updatepriority/:id', expertAuth, async (req, res) => {
    try {
        const { priority } = req.body;
        if (!priority || !['low', 'medium', 'high', 'urgent'].includes(priority)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid priority'
            });
        }

        const query = await Query.findByIdAndUpdate(
            req.params.id,
            { priority },
            { new: true }
        );

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
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error updating query priority',
            error: err.message
        });
    }
});

// Add attachments to query
router.post('/addattachment/:id', auth, async (req, res) => {
    try {
        const { url, filename, mimetype, size } = req.body;
        if (!url || !filename || !mimetype || !size) {
            return res.status(400).json({
                success: false,
                message: 'All attachment details are required'
            });
        }

        const query = await Query.findById(req.params.id);
        if (!query) {
            return res.status(404).json({
                success: false,
                message: 'Query not found'
            });
        }

        // Check if user has permission to add attachments
        if (req.user.role === 'user' && query.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to add attachments to this query'
            });
        }

        query.attachments.push({ url, filename, mimetype, size });
        await query.save();

        res.json({
            success: true,
            data: query
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error adding attachment',
            error: err.message
        });
    }
});

// Delete query (User or Admin only)
router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const query = await Query.findById(req.params.id);
        if (!query) {
            return res.status(404).json({
                success: false,
                message: 'Query not found'
            });
        }

        // Check if user has permission to delete
        if (req.user.role === 'user' && query.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this query'
            });
        }

        await query.remove();

        res.json({
            success: true,
            message: 'Query deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error deleting query',
            error: err.message
        });
    }
});

module.exports = router;
