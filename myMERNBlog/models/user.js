const mongoose = require('mongoose');//Step-22: Importing mongoose to create the model

const userSchema = mongoose.Schema({// Step-23: Create the userSchema
    name:{
        type: String,
        maxlength:50
    },
    email:{
        type: String,
        unique:1,
        trim:true
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String
    },
    tokenExpiration:{
        type:Number
    }
});

const User = mongoose.model('User',userSchema); //Step-24:- Create the User model

module.exports = {User}; //Step-25:- Export the User model