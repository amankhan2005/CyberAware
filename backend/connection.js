const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.DB_URL

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(url)
        // console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB')
})

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected')
})

// Handle application termination
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close()
        console.log('Mongoose connection closed through app termination')
        process.exit(0)
    } catch (err) {
        console.error('Error during mongoose connection closure:', err)
        process.exit(1)
    }
})

// Export both the connection function and mongoose
module.exports = {
    connectDB,
    mongoose
}
