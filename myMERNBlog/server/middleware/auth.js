const {User} = require('../models/user');//Step-78:- Import the user module.

const auth = (req,res,next)=>{//Step-79:- Create a function auth
    let token = req.cookies.x_auth;//Step-80:- Access the token that has been saved as the cookie using the name given

    User.findByToken(token,(err,user)=>{//Step-81:- Access the function findByToken in the schema.
        if(err)//Step-85:- To handle the errors
            throw err;
        if(!user)//Step-85:- To handle the errors
            return res.json({
                isAuth:false,
                error: true
            });
        req.token = token;//Step-86:- To add the token and the user details to the request
        req.user = user;
        next();

    });
}


module.exports={auth};