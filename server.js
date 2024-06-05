const express = require('express');
const dotenv = require("dotenv");
//const logger = require('./middleware/logger')
const morgan = require('morgan')
const colors = require('colors')
//Route files
const bootcamps = require('./routes/bootcamps');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });
connectDB();
const app = express();

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// app.use(logger)
// Mount Routers
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
})