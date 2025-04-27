const { Schema, model } = require('../connection');

const expertSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  occupation: { type: String, required: true },
  experience: { type: Number, required: true }, // assuming experience is in years
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('experts', expertSchema);
