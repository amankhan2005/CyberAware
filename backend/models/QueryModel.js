const { Schema, model, Types } = require('../connection');

const querySchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'users', required: true },
  doubt: { type: String, required: true },
  solution: { type: String }, // optional initially, filled by expert later
  expertId: { type: Types.ObjectId, ref: 'experts' }, // optional until expert responds
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('queries', querySchema);
