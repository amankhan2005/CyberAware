const express = require('express');
const router = express.Router();
const News = require('../models/newsModel');
const { auth, adminAuth } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Add News Article (Admin only)
router.post('/add', adminAuth, validate(schemas.news), async (req, res) => {
    try {
        const news = await News.create({
            ...req.body,
            author: req.user._id
        });
        res.status(201).json({
            success: true,
            data: news
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error creating news article',
            error: err.message
        });
    }
});

// Get All News Articles
router.get('/getall', async (req, res) => {
    try {
        const { category, search, page = 1, limit = 10 } = req.query;
        const query = { isPublished: true };

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$text = { $search: search };
        }

        const newsList = await News.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('author', 'name email');

        const total = await News.countDocuments(query);

        res.json({
            success: true,
            data: newsList,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching news articles',
            error: err.message
        });
    }
});

// Get Single News Article by ID
router.get('/getbyid/:id', async (req, res) => {
    try {
        const news = await News.findById(req.params.id)
            .populate('author', 'name email');

        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'News article not found'
            });
        }

        // Increment views
        news.views += 1;
        await news.save();

        res.json({
            success: true,
            data: news
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error fetching news article',
            error: err.message
        });
    }
});

// Update News Article (Admin only)
router.put('/update/:id', adminAuth, validate(schemas.news), async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'News article not found'
            });
        }

        res.json({
            success: true,
            data: news
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error updating news article',
            error: err.message
        });
    }
});

// Delete News Article (Admin only)
router.delete('/delete/:id', adminAuth, async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);

        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'News article not found'
            });
        }

        res.json({
            success: true,
            message: 'News article deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error deleting news article',
            error: err.message
        });
    }
});

module.exports = router;
