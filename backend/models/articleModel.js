const { Schema, model, Types } = require('../connection');

const articleSchema = new Schema({
  title: { type: String, required: true },
  expertId: { type: Types.ObjectId, ref: 'experts', required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('articles', articleSchema);
