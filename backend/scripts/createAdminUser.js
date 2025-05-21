/**
 * Script to create an admin user for CyberAware
 * Run this script with: node scripts/createAdminUser.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Import the User model
const User = require('../models/userModel');

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Create admin user
const createAdminUser = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const existingAdmin = await User.findOne({ role: 'admin' });

        if (existingAdmin) {
            console.log('Admin user already exists:');
            console.log(`ID: ${existingAdmin._id}`);
            console.log(`Name: ${existingAdmin.name}`);
            console.log(`Email: ${existingAdmin.email}`);
            process.exit(0);
        }

        // Admin details
        const adminDetails = {
            name: 'Admin User',
            email: 'admin@cyberaware.com',
            password: 'Admin@123',
            role: 'admin',
            city: 'Delhi',
            isActive: true
        };

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminDetails.password, salt);

        // Create admin
        const admin = await User.create({
            ...adminDetails,
            password: hashedPassword
        });

        console.log('Admin user created successfully:');
        console.log(`ID: ${admin._id}`);
        console.log(`Name: ${admin.name}`);
        console.log(`Email: ${admin.email}`);

        // Write admin details to file for reference
        fs.writeFileSync(
            path.join(__dirname, 'admin-credentials.txt'),
            `ADMIN CREDENTIALS\n\nName: ${admin.name}\nEmail: ${admin.email}\nPassword: ${adminDetails.password}\nID: ${admin._id}`
        );

        console.log('\nCredentials saved to admin-credentials.txt');

        mongoose.disconnect();
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

// Run the script
createAdminUser();
