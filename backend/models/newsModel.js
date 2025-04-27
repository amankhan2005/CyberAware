const { Schema, model } = require('../connection');

const newsSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, // store image URL or path
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('news', newsSchema);
