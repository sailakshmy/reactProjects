const express = require('express'); //Step-6:- Require the express package
const mongoose = require('mongoose'); //Step-16:- Import the mongoose package

const app = express(); //Step-7:- Create an express server

mongoose.connect( //Step-17:- Connect the application to the MongoDb cluster
    'mongodb+srv://Groot:IAmGroot@myblog.ujmww.mongodb.net/<dbname>?retryWrites=true&w=majority',
{useNewUrlParser:true} //This will resolve the depracation warning that Mongoose might throw
).then(()=>console.log('DB connected successfully')) //Step-18:- To cehck if the DB has connected successfully
.catch(err =>console.log(`DB connection failed due to ${err}`)); //Step-18:- To catch the error if the DB connection failed.
app.get('/',(req,res)=>{ //Step-9:- Create a simple route method to handle GET requests.
    res.send('Hello World');
})


app.listen(5000); //Step-8:- Make the application listen to this port. This is what starts the server.
