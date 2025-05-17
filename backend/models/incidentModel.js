const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    incidentType: {
        type: String,
        required: true,
        enum: ['phishing', 'malware', 'data_breach', 'ransomware', 'other']
    },
    description: {
        type: String,
        required: true,
        minlength: 50,
        maxlength: 1000
    },
    severity: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high', 'critical']
    },
    dateOccurred: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    contactPhone: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    additionalInfo: {
        type: String,
        maxlength: 500
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'resolved', 'closed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
incidentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident; 