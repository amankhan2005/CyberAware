const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const expertSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profileImage: {
    type: String,
    default: ''
  },
  jobTitle: { type: String, required: true },
  company: { type: String, default: '' },
  yearsExperience: { type: String, required: true },
  expertise: [{
    type: String,
    required: true
  }],
  certifications: { type: String, default: '' },
  bio: {
    type: String,
    trim: true,
    maxlength: 500
  },
  linkedIn: { type: String, default: '' },
  articles: [{
    type: ObjectId,
    ref: 'Article'
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Add indexes
expertSchema.index({ email: 1 });
expertSchema.index({ expertise: 1 });

const Expert = mongoose.model('Expert', expertSchema);

module.exports = Expert;
