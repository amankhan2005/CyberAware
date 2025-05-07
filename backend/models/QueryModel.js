const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

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
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'resolved', 'closed'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    assignedTo: {
        type: ObjectId,
        ref: 'Expert'
    },
    responses: [{
        responder: {
            type: ObjectId,
            ref: 'Expert',
            required: true
        },
        message: {
            type: String,
            required: true,
            trim: true,
            minlength: 10
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    attachments: [{
        url: String,
        filename: String,
        mimetype: String,
        size: Number
    }],
    tags: [{
        type: String,
        trim: true
    }],
    isResolved: {
        type: Boolean,
        default: false
    },
    resolvedAt: Date,
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Add indexes
querySchema.index({ subject: 'text', message: 'text' });
querySchema.index({ status: 1 });
querySchema.index({ priority: 1 });
querySchema.index({ userId: 1 });
querySchema.index({ assignedTo: 1 });
querySchema.index({ createdAt: -1 });

// Update lastUpdated timestamp before saving
querySchema.pre('save', function(next) {
    this.lastUpdated = new Date();
    next();
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
