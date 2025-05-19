const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: error.details.map(detail => detail.message)
        });
    }
    next();
};

// Validation schemas
const schemas = {
    // User schemas
    register: Joi.object({
        name: Joi.string().required().min(2).max(50),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        role: Joi.string().valid('user', 'expert', 'admin').default('user')
    }),

    login: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }),

    // Article schemas
    article: Joi.object({
        title: Joi.string().required().min(5).max(200),
        description: Joi.string().required().min(50).max(500),
        content: Joi.string().required().min(100),
        category: Joi.string().required(),
        image: Joi.string().required(),
        expertId: Joi.string().required()
    }),

    // News schemas
    news: Joi.object({
        title: Joi.string().required().min(5).max(200),
        description: Joi.string().required().min(50).max(1000),
        content: Joi.string().required().min(100),
        image: Joi.string().required(),
        source: Joi.string().required(),
        sourceUrl: Joi.string().uri(),
        category: Joi.string().required().valid(
            'Data Breach',
            'Malware',
            'Phishing',
            'Ransomware',
            'Vulnerability',
            'Regulation',
            'Industry News',
            'Other'
        ),
        isPublished: Joi.boolean()
    }),

    // Query schemas
    query: Joi.object({
        subject: Joi.string().required().min(5).max(100),
        message: Joi.string().required().min(20).max(1000),
        priority: Joi.string().valid('low', 'medium', 'high', 'urgent').default('medium'),
        tags: Joi.array().items(Joi.string().trim()).max(5),
        user: Joi.string().required()
    }),

    queryResponse: Joi.object({
        message: Joi.string().required().min(10).max(1000)
    }),

    queryStatus: Joi.object({
        status: Joi.string().required().valid('pending', 'in_progress', 'resolved', 'closed')
    }),

    queryPriority: Joi.object({
        priority: Joi.string().required().valid('low', 'medium', 'high', 'urgent')
    }),

    queryAttachment: Joi.object({
        url: Joi.string().required().uri(),
        filename: Joi.string().required(),
        mimetype: Joi.string().required(),
        size: Joi.number().required().min(0)
    }),

    // Incident schemas
    incident: Joi.object({
        incidentType: Joi.string().required().valid('phishing', 'malware', 'data_breach', 'ransomware', 'other'),
        description: Joi.string().required().min(50).max(1000),
        severity: Joi.string().required().valid('low', 'medium', 'high', 'critical'),
        dateOccurred: Joi.date().required().max('now'),
        location: Joi.string().required(),
        contactName: Joi.string().required(),
        contactEmail: Joi.string().required().email(),
        contactPhone: Joi.string().required().pattern(/^[0-9]{10}$/),
        additionalInfo: Joi.string().max(500)
    })
};

module.exports = {
    validate,
    schemas
}; 