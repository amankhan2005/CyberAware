const { Schema, model } = require('../connection');

const expertSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: '' },
  jobTitle: { type: String, required: true },
  company: { type: String, default: '' },
  yearsExperience: { type: String, required: true },
  expertise: [{ type: String }], // Array of expertise areas
  certifications: { type: String, default: '' },
  bio: { type: String, default: '' },
  linkedIn: { type: String, default: '' },
  articles: [{ type: Schema.Types.ObjectId, ref: 'articles' }], // Reference to articles created by this expert
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = model('experts', expertSchema);
