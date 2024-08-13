const mongoose = require('mongoose')
//const colors = require('colors')

const connectDB = async() => {
    try{
        await mongoose.connect("mongodb://0.0.0.0:27017/Hotel")
        console.log('Mongodb connected');
    } catch(error){
        console.log(error)
    }
}

module.exports = connectDB;