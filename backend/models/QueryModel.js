const { Schema, model } = require('mongoose');

const querySchema = new Schema({
    subject: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minlength: 20,
        maxlength: 1000
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'resolved'],
        default: 'pending'
    },
    responses: [{
        message: {
            type: String,
            // required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Add basic indexes
querySchema.index({ subject: 'text', message: 'text' });
querySchema.index({ status: 1 });

module.exports = model('Query', querySchema);
