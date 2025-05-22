const express = require('express');
const Model = require('../models/userModel'); //importing user model
const jwt = require('jsonwebtoken'); //importing jsonwebtoken
const { auth, adminAuth } = require('../middleware/auth'); // Import auth middleware
require('dotenv').config(); //importing dotenv

const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.status(400).json({ message: 'User Email Already Exists' });
            }
            else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
})

router.get('/getall', adminAuth, (req, res) => {
    Model.find()
        .then((result) => {
            // Filter sensitive data before sending
            const users = result.map(user => {
                const userData = user.toObject ? user.toObject() : user;
                if (userData.password) delete userData.password;
                return userData;
            });
            
            res.status(200).json({
                success: true,
                users: users
            });
        }).catch((err) => {
            res.status(500).json({ 
                success: false,
                message: 'Internal Server Error' 
            });
            console.log(err);
        });
})

router.get('/getbyid/:id', auth, (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            if (!result) {
                return res.status(404).json({ 
                    success: false,
                    message: 'User not found' 
                });
            }
            
            // Remove sensitive fields
            const userData = result.toObject ? result.toObject() : result;
            if (userData.password) delete userData.password;
            
            res.status(200).json({ 
                success: true,
                user: userData 
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ 
                success: false,
                message: 'Internal Server Error',
                error: err.message
            });
        });
})

router.delete('/delete/:id', adminAuth, (req, res) => {
    // Prevent admins from deleting themselves
    if (req.params.id === req.user._id) {
        return res.status(400).json({
            success: false,
            message: 'You cannot delete your own admin account'
        });
    }
    
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });
        }).catch((err) => {
            res.status(500).json({ 
                success: false, 
                message: 'Internal Server Error' 
            });
            console.log(err);
        });
})

router.put('/update/:id', auth, (req, res) => {
    // Check if user is updating their own profile or is an admin
    if (req.user._id !== req.params.id && req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'You can only update your own profile unless you are an admin'
        });
    }
    
    // Don't allow role changes unless admin
    if (req.body.role && req.user.role !== 'admin') {
        delete req.body.role;
    }
    
    // Never send passwords in clear text
    if (req.body.password) {
        // In a real app, you would hash the password here
        // For example: req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            
            // Remove sensitive data
            const userData = result.toObject ? result.toObject() : result;
            if (userData.password) delete userData.password;
            
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                user: userData
            });
        }).catch((err) => {
            res.status(500).json({ 
                success: false,
                message: 'Internal Server Error' 
            });
            console.log(err);
        });
})

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {
            if (result) {
                // email and password match
                // generate token

                const { _id, name, email, role } = result;
                const payload = { _id, name, email, role };

                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json(err);
                    } else {
                        // Update last login time
                        Model.findByIdAndUpdate(result._id, { lastLogin: Date.now() })
                            .then(() => {
                                res.status(200).json({
                                    token,
                                    user: {
                                        _id: result._id,
                                        name: result.name,
                                        email: result.email,
                                        role: result.role
                                    }
                                });
                            })
                            .catch(updateErr => {
                                console.log(updateErr);
                                // Still return token even if update fails
                                res.status(200).json({
                                    token,
                                    user: {
                                        _id: result._id,
                                        name: result.name,
                                        email: result.email,
                                        role: result.role
                                    }
                                });
                            });
                    }
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});



module.exports = router;