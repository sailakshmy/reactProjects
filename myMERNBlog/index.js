const express = require('express'); //Step-6:- Require the express package
const mongoose = require('mongoose'); //Step-16:- Import the mongoose package
const bodyParser = require('body-parser'); //Step-37:- Import the body-parser
const cookieParser = require('cookie-parser');//Step-38:- Import the cookie-parser
const {User} = require('./models/user');//Step-43:- Import the user model
const config = require('./config/keys');//Step-56:- Import the keys module.
const {auth} = require('./middleware/auth');//Step-87:- To import the auth module.

const app = express(); //Step-7:- Create an express server


mongoose.connect( //Step-17:- Connect the application to the MongoDb cluster
    //'mongodb+srv://Groot:IAmGroot@myblog.ujmww.mongodb.net/<dbname>?retryWrites=true&w=majority', //Commented as a part of Step-54
    config.mongoURI, //Step-57:- This will allow us to access the mongoURI that will be exported from the required module based on the environment.
{useNewUrlParser:true} //This will resolve the depracation warning that Mongoose might throw
).then(()=>console.log('DB connected successfully')) //Step-18:- To cehck if the DB has connected successfully
.catch(err =>console.log(`DB connection failed due to ${err}`)); //Step-18:- To catch the error if the DB connection failed.

//This router is to handle the GET requests where the homepage will be displayed.
app.get('/',(req,res)=>{ //Step-9:- Create a simple route method to handle GET requests.
    res.send('Hello World. This is to try the nodemon server.');
})
app.use(bodyParser.urlencoded({extended:true})); //Step-40:- Enables to use bodyParser as a middleware
app.use(bodyParser.json());//Step-40:- Enables to use bodyParser as a middleware and to be able to read the json
app.use(cookieParser());//Step-40:- Enables to use cookieParser as a middleware


//This router is to handle the register function where new users sign up.
app.post('/api/users/register',(req,res)=>{//Step-42:- To handle the register request coming from the client and to update the details of the new user in the MongoDB
    const user = new User(req.body);//Step-44:- Create a new instance of user model so that the same can be saved.
    //We are able to access the body of the req via req.body due to the bodyParser Middleware that we have used in Step-40
    //Here, before we save the data, the userSchema's pre function will be triggered, where we encrypt the user's password.
    user.save((err,userData)=>{//Step-44:- Save the details. In case of err, return the response jSon with success as false.
        if(err)
            return res.json({success:false, err});
        return res.status(200).json({success:true,userData});
    });
   
});

//This router is to handle the sign in function when the users are trying to signin.
app.post('/api/users/login',(req,res)=>{//Step-66:- To handle the Signin requests coming from the client
   
    //Find the email keyed in by the user
    User.findOne({email:req.body.email},(err,user)=>{//Step-67:- Find the email using the findOne method
        if(!user)
            return res.json({loginSuccess:false,
            message:"No user has been found with this email."
        });
        //Compare the passwords
        user.comparePasswords(req.body.password,(err,isMatch)=>{//Step-68:- Call the comparePasswords function from the user document
            if(!isMatch)
                return res.json({loginSuccess:false,
                message:"Passwords do not match."
            });
            //Generate the token
            user.generateToken((err,user)=>{//Step-70:- If the passwords match, then generate the token
                if(err)
                    return res.status(400).send(err);
                return res.cookie('x_auth',user.token)//Step-75:- Put the token into a cookie
                          .status(200)
                          .json({loginSuccess:true});
            });  

        });
    });

});

//This router is to handle the authentication action based on the token
app.get('/api/users/auth',auth,(req,res)=>{//Step-76:- To authenticate the users //Step-88:- Adding the auth middleware
    res.status(200)
       .json({isAuth:true,
              _id:req._id,
              name:req.user.name,
              lastname:req.user.lastname,
              email:req.user.email,
              role:req.user.role
        });

});

//This router handles the logout action by clearing the token
app.get('/api/users/logout',auth,(req,res)=>{//Step-90:- To log out the users 
    User.findOneAndUpdate({_id:req.user._id},{token:""},(err,user)=>{//Step-91:- To find the currently logged in user and log them out by updating the token to an empty string
        if(err)
            return res.json({success:false,err});
        return res.status(200).send({success:true});

    });
});

app.listen(5000); //Step-8:- Make the application listen to this port. This is what starts the server.
