const express = require('express'); //Step-6:- Require the express package
const mongoose = require('mongoose'); //Step-16:- Import the mongoose package
const bodyParser = require('body-parser'); //Step-37:- Import the body-parser
const cookieParser = require('cookie-parser');//Step-38:- Import the cookie-parser
const {User} = require('./models/user');//Step-43:- Import the user model
const app = express(); //Step-7:- Create an express server


mongoose.connect( //Step-17:- Connect the application to the MongoDb cluster
    'mongodb+srv://Groot:IAmGroot@myblog.ujmww.mongodb.net/<dbname>?retryWrites=true&w=majority',
{useNewUrlParser:true} //This will resolve the depracation warning that Mongoose might throw
).then(()=>console.log('DB connected successfully')) //Step-18:- To cehck if the DB has connected successfully
.catch(err =>console.log(`DB connection failed due to ${err}`)); //Step-18:- To catch the error if the DB connection failed.
app.get('/',(req,res)=>{ //Step-9:- Create a simple route method to handle GET requests.
    res.send('Hello World. This is to try the nodemon server.');
})
app.use(bodyParser.urlencoded({extended:true})); //Step-40:- Enables to use bodyParser as a middleware
app.use(bodyParser.json());//Step-40:- Enables to use bodyParser as a middleware and to be able to read the json
app.use(cookieParser());//Step-40:- Enables to use cookieParser as a middleware

app.post('/api/users/register',(req,res)=>{//Step-42:- To handle the register request coming from the client and to update the details of the new user in the MongoDB
    const user = new User(req.body);//Step-44:- Create a new instance of user model so that the same can be saved.
    //We are able to access the body of the req via req.body due to the bodyParser Middleware that we have used in Step-40
    user.save((err,userData)=>{//Step-44:- Save the details. In case of err, return the response jSon with success as false.
        if(err)
            return res.json({success:false, err});
        return res.status(200).json({success:true});
    });
   
})

app.listen(5000); //Step-8:- Make the application listen to this port. This is what starts the server.
