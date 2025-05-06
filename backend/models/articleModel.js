const { Schema, model, Types } = require('../connection');

const commentSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'users' },
  expertId: { type: Types.ObjectId, ref: 'experts' },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const articleSchema = new Schema({
  title: { type: String, required: true },
  expertId: { type: Types.ObjectId, ref: 'experts', required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: [{ type: Types.ObjectId, ref: 'users' }], // Users who liked the article
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = model('articles', articleSchema);
