const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = () => {

    const db_url = process.env.DB_URL
    mongoose.connect(db_url);

    const database = mongoose.connection

    database.on('error', (error) => {
        console.log(error)
    })

    database.once('connected', () => {
        console.log('Database Connected');
    })
}

module.exports = connectDB