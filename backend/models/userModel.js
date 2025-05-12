const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const userSchema = new Schema({
    name: { 
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
    role: {
        type: String,
        enum: ['user', 'expert', 'admin'],
        default: 'user'
    },
    city: {
        type: String, 
        default: 'No City',
        trim: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    lastLogin: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Add indexes for better query performance
// userSchema.index({ email: 1 }); // Removed duplicate index
userSchema.index({ role: 1 });

// Add a method to check if an ID is valid
userSchema.statics.isValidId = function(id) {
    return Types.ObjectId.isValid(id);
};

const User = mongoose.model('User', userSchema);

module.exports = User;