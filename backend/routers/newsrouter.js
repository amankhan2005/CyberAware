const express = require('express');
const router = express.Router();
const News = require('../models/newsModel'); // Adjust path if needed

// Add News Article
router.post('/add', async (req, res) => {
  try {
    const data = req.body;
    const news = await News.create(data);
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All News Articles
router.get('/getall', async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single News Article by ID
router.get('/getbyid/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update News Article
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete News Article
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
