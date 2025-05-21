/**
 * Suggested updates to newsModel.js
 * 
 * Add the following fields to support claps and related features
 */

// Add claps field
claps: {
    type: Number,
    default: 0
},

// Add users who clapped
clappedBy: [{
    type: ObjectId,
    ref: 'User'
}],

// Add related news field
relatedNews: [{
    type: ObjectId,
    ref: 'News'
}]

/**
 * You can add these fields to the newsSchema in models/newsModel.js
 * right before the timestamps option:
 * 
 * }, {
 *     timestamps: true
 * });
 */
