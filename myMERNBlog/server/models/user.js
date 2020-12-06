const mongoose = require('mongoose');//Step-22: Importing mongoose to create the model
const bcrypt = require('bcrypt');//Step-60:- Importing the bcrypt package so that the passwords cn be encrypted before the document is saved.
const saltRounds = 10; //Step-61:- Creating the saltRounds with 10 as the character length
const jwt = require('jsonwebtoken');//Step-73:- Import the jsonwebtoken package

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
userSchema.pre('save', function(next){//Step-64:- Create a function that generates a hash for the user password
    var user = this;
    if(user.isModified('password')){//Step-65:- This is to be triggered only if the password field is modified and not in any other case
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err)
                return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err)
                    return next(err);
                user.password=hash;
                next();
            });
        });

    }
    else
        next();
});

userSchema.methods.comparePasswords = function(plainTextPassword,callbackFunction){//Step-69:- Create a function in the schema that will use bcrypt to compare the passwords
    bcrypt.compare(plainTextPassword,this.password,(err,isMatch)=>{
        if(err)
            return callbackFunction(err);
        return callbackFunction(null, isMatch);
    });
}

userSchema.methods.generateToken = function(cb){//Step-71:- Create a function generateToken in the scehma that will generate a token for the user.
    var user = this;
    var token = jwt.sign(user._id.toHexString(),'secret');//Step-74:- To create the token using jsonwebtoken
    user.token = token;
    user.save((err,user)=>{
        if(err)
            return cb(err);
        return cb(null,user);
    });

}

userSchema.statics.findByToken=function(token,cb){//Step-82:- Create a function findByToken in the schema to find the user by the token
    var user = this;//Step-83:- this will reference the userSchema
    jwt.verify(token,'secret',function(err, decodedToken){//Step-84:- use the verify method of the jwt object to check if the tokens are the same as in the DB
        User.findOne({"_id":decodedToken, //This will search the DB for the record that satisfies both these search conditions.
                    "token":token},function(err,user){
                        if(err)
                            return cb(err);
                        return cb(null,user);
                    });

    })
}

const User = mongoose.model('User',userSchema); //Step-24:- Create the User model

module.exports = {User}; //Step-25:- Export the User model