const express = require('express');
const router = express.Router();
const Article = require('../models/articleModel'); // adjust path as needed
const Expert = require('../models/expertModel');

// Create Article
router.post('/add', async (req, res) => {
  try {
    console.log('Received article data:', req.body);
    console.log('Headers:', req.headers);
    console.log('Content-Type:', req.headers['content-type']);
    
    // Validate required fields
    const { title, description, image, category, content, expertId } = req.body;
    
    if (!expertId) {
      console.error('Missing expertId');
      return res.status(401).json({ 
        message: 'Authentication required. Please login as an expert.',
        errors: {
          expertId: 'Expert ID is required. Please login again.'
        }
      });
    }
      if (!title || !description || !image || !category || !content) {
      console.error('Missing required fields:', {
        title: !!title,
        description: !!description, 
        image: !!image,
        category: !!category,
        content: !!content
      });

      // Create errors object, filtering out undefined values
      const errors = {
        title: !title ? 'Title is required' : undefined,
        description: !description ? 'Description is required' : undefined,
        image: !image ? 'Image is required' : undefined,
        category: !category ? 'Category is required' : undefined,
        content: !content ? 'Content is required' : undefined
      };

      // Filter out undefined values
      Object.keys(errors).forEach(key => errors[key] === undefined && delete errors[key]);

      return res.status(400).json({ 
        message: 'Missing required fields',
        errors
      });
    }
    
    // Check if expert exists
    console.log('Looking up expert with ID:', expertId);
    console.log('Expert ID type:', typeof expertId);
    
    try {
      const expertExists = await Expert.findById(expertId);
      
      if (!expertExists) {
        console.error('Expert not found with ID:', expertId);
        return res.status(404).json({ 
          message: 'Expert not found',
          errors: {
            expertId: 'Invalid expert ID. Please login again.'
          }
        });
      }
      
      console.log('Found expert:', expertExists.firstName, expertExists.lastName);
    } catch (err) {
      console.error('Error looking up expert:', err);
      return res.status(400).json({ 
        message: 'Invalid expert ID format',
        errors: {
          expertId: 'Expert ID format is invalid. Please login again.'
        }
      });
    }
    
    // Prepare the article data
    const articleData = {
      ...req.body,
      expertId: expertId  // Ensure we're using the validated expert ID
    };
    
    console.log('Creating new article with data:', articleData);
    
    // Create and save the new article
    const newArticle = await new Article(articleData).save();
    console.log('Article saved successfully with ID:', newArticle._id);
    
    // Update the expert's articles array
    await Expert.findByIdAndUpdate(
      expertId,
      { $push: { articles: newArticle._id } }
    );
    
    res.status(201).json({
      message: 'Article created successfully',
      article: newArticle
    });
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
    
    res.status(500).json({ 
      message: 'Internal server error', 
      error: err.message 
    });
  }
});

// Get All Articles
router.get('/getall', async (req, res) => {
  try {
    const articles = await Article.find()
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
      expertId: req.params.expertId,
      isPublished: true
    })
    .populate('expertId')
    .sort({ createdAt: -1 })
    .select('-content');
    
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



router.post('/login', (req, res) => {
  Model.findOne(req.body)
      .then((result) => {
          if(result){
              // email and password match
              // generate token

              const { _id, firstName, lastName, email } = result;
              const payload = { _id, firstName, lastName, email};

              jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                  if(err){
                      console.log(err);
                      res.status(500).json(err);
                  }else{
                      res.status(200).json({token});
                  }
              } )

          } else {
              res.status(401).json({message: 'Invalid Credentials'});
          }
      }).catch((err) => {
          console.log(err);
          res.status(500).json({message: 'Internal Server Error'});
      });
});




module.exports = router;
