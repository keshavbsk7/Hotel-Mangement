const express = require('express');
//const colors = require('colors');
//const morgan = require('morgan');
//const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Import CORS module

//dotenv
//dotenv.config();

//mongodb
connectDB();

//REST
const app = express();

//MiddleWare
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

//Routes
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/admins', require('./routes/adminRoutes')); 
//listen
const port = 7080;
app.listen(port, ()=>{
    console.log('Server Running');
});