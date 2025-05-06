const express = require('express');
const router = express.Router();
const Article = require('../models/articleModel'); // adjust path as needed
const Expert = require('../models/expertModel');

// Create Article
router.post('/add', async (req, res) => {
  try {
    console.log('Received article data:', req.body);
    
    // Validate required fields
    const { title, description, image, category, content, expertId } = req.body;
    
    if (!title || !description || !image || !category || !content || !expertId) {
      console.error('Missing required fields:', {
        title: !!title,
        description: !!description, 
        image: !!image,
        category: !!category,
        content: !!content,
        expertId: !!expertId
      });
      return res.status(400).json({ 
        message: 'Missing required fields',
        errors: {
          title: !title ? 'Title is required' : undefined,
          description: !description ? 'Description is required' : undefined,
          image: !image ? 'Image is required' : undefined,
          category: !category ? 'Category is required' : undefined,
          content: !content ? 'Content is required' : undefined,
          expertId: !expertId ? 'Expert ID is required' : undefined
        }
      });
    }
    
    // Check if expert exists
    const expertExists = await Expert.findById(expertId);
    if (!expertExists) {
      console.error('Expert not found with ID:', expertId);
      return res.status(404).json({ message: 'Expert not found' });
    }
    
    const newArticle = await new Article(req.body).save();
    console.log('Article saved successfully:', newArticle._id);
    
    // Update the expert's articles array
    await Expert.findByIdAndUpdate(
      req.body.expertId,
      { $push: { articles: newArticle._id } }
    );
    
    res.status(200).json(newArticle);
  } catch (err) {
    console.error('Error in /articles/add:', err);
    
    // Handle validation errors from Mongoose
    if (err.name === 'ValidationError') {
      const errors = {};
      for (let field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return res.status(400).json({ 
        message: 'Validation error', 
        errors 
      });
    }
    
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
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
    // Increment view count
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('expertId');
    
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Articles by Category
router.get('/category/:category', async (req, res) => {
  try {
    const articles = await Article.find({ 
      category: req.params.category 
    }).populate('expertId');
    
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Articles by Expert
router.get('/expert/:expertId', async (req, res) => {
  try {
    const articles = await Article.find({ 
      expertId: req.params.expertId 
    }).populate('expertId');
    
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Article
router.put('/update/:id', async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedAt = new Date();
    
    const updated = await Article.findByIdAndUpdate(
      req.params.id, 
      updates, 
      { new: true }
    );
    
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Article
router.delete('/delete/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Remove article from expert's articles array
    await Expert.findByIdAndUpdate(
      article.expertId,
      { $pull: { articles: req.params.id } }
    );
    
    const deleted = await Article.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like an article
router.post('/like/:id', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Check if user already liked the article
    if (article.likes.includes(userId)) {
      // Unlike
      article.likes.pull(userId);
    } else {
      // Like
      article.likes.push(userId);
    }
    
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add comment to an article
router.post('/comment/:id', async (req, res) => {
  try {
    const { text, userId, expertId } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }
    
    if (!userId && !expertId) {
      return res.status(400).json({ message: 'Either user ID or expert ID is required' });
    }
    
    const comment = {
      text,
      userId,
      expertId,
      createdAt: new Date()
    };
    
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment } },
      { new: true }
    );
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
