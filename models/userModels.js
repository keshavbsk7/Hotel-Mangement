const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    branch:{
        type:String,
        required:[true,'City is required']
    },
    checkin:{
        type:String
    },
    checkout:{
        type:String
    },
    gender:{
        type:String,
        required:[true,'Gender is required']
    },
    Roomexpense:{
        type:Number,
        required:[true,' is required']
    },
    Foodexpense:{
        type:Number,
        required:[true,' is required']
    },
    room:{
        type:Number,
        required:[true,'Weight is required']
    },
    roomtype:{
        type:String,
        required:[true,'Room type Group is required']
    }

})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel;