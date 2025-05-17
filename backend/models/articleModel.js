const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new Schema({
  userId: { type: ObjectId, ref: 'User' },
  expertId: { type: ObjectId, ref: 'User' },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 50,
    maxlength: 500
  },
  content: {
    type: String,
    required: true,
    minlength: 100
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  expertId: {
    type: ObjectId,
    ref: 'Expert',
    required: true
  },
  likes: [{
    type: ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  comments: [commentSchema],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  }
}, {
  timestamps: true
});

// Add indexes
articleSchema.index({ title: 'text', description: 'text' });
articleSchema.index({ category: 1 });
articleSchema.index({ expertId: 1 });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
