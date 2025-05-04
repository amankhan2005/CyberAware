const express = require('express');
const router = express.Router();
const Article = require('../models/articleModel'); // adjust path as needed

// Create Article
router.post('/add', async (req, res) => {
  new Article(req.body).save()
  .then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json({ message: 'Internal server error' });
  });
});

// Get All Articles
router.get('/getall', async (req, res) => {
  try {
    const articles = await Article.find().populate('expertId');
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Article by ID
router.get('/getbyid/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('expertId');
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Article
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Article
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
