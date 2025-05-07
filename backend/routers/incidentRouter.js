const express = require('express');
const router = express.Router();
const Incident = require('../models/incidentModel');

// Report a new incident
router.post('/report', async (req, res) => {
    try {
        const {
            incidentType,
            description,
            severity,
            dateOccurred,
            location,
            contactName,
            contactEmail,
            contactPhone,
            additionalInfo
        } = req.body;

        // Create new incident
        const incident = new Incident({
            incidentType,
            description,
            severity,
            dateOccurred,
            location,
            contactName,
            contactEmail,
            contactPhone,
            additionalInfo
        });

        // Save to database
        await incident.save();

        res.status(201).json({
            success: true,
            message: 'Incident report submitted successfully',
            data: incident
        });
    } catch (error) {
        console.error('Error submitting incident report:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit incident report',
            error: error.message
        });
    }
});

// Get all incidents (for admin/expert use)
router.get('/all', async (req, res) => {
    try {
        const incidents = await Incident.find()
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: incidents
        });
    } catch (error) {
        console.error('Error fetching incidents:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch incidents',
            error: error.message
        });
    }
});

// Get incident by ID
router.get('/:id', async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);
        
        if (!incident) {
            return res.status(404).json({
                success: false,
                message: 'Incident not found'
            });
        }

        res.status(200).json({
            success: true,
            data: incident
        });
    } catch (error) {
        console.error('Error fetching incident:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch incident',
            error: error.message
        });
    }
});

// Update incident status (for admin/expert use)
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        
        const incident = await Incident.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!incident) {
            return res.status(404).json({
                success: false,
                message: 'Incident not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Incident status updated successfully',
            data: incident
        });
    } catch (error) {
        console.error('Error updating incident status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update incident status',
            error: error.message
        });
    }
});

module.exports = router; 