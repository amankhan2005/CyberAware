const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const newsSchema = new Schema({
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
        maxlength: 1000
    },
    content: {
        type: String,
        required: true,
        minlength: 100
    },
    image: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true,
        trim: true
    },
    sourceUrl: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Data Breach',
            'Malware',
            'Phishing',
            'Ransomware',
            'Vulnerability',
            'Regulation',
            'Industry News',
            'Other'
        ]
    },
    author: {
        type: ObjectId,
        ref: 'User'
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Add indexes
newsSchema.index({ title: 'text', description: 'text' });
newsSchema.index({ category: 1 });
newsSchema.index({ createdAt: -1 });

const News = mongoose.model('News', newsSchema);

module.exports = News;
