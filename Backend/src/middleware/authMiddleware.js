//todo Imp what does middleware do
/* 
What should authMiddleware do?

Let's think instead of coding.

Suppose the client sends:

GET /profile

Authorization: Bearer eyJhbGc...

The middleware's job is:

Receive Request
        │
        ▼
Read Authorization Header
        │
        ▼
Extract JWT
        │
        ▼
Verify JWT
        │
 ┌──────────────┴──────────────┐
 │                             │
Valid                      Invalid
 │                             │
 ▼                             ▼
next()                  401 Unauthorized

That's it.

It doesn't return the profile.

It doesn't query MongoDB yet.

Its only job is:

"Is this user authenticated?"
*/

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const authMiddleware = async (req , res , next ) => {

        const authHeader = req.headers.authorization;

        //console.log("Inside Auth Middleware");

        if(!authHeader){
                return res.status(401).json({
                        message : "Authorization header missing"        
                });
        }

        //now extracting the token
        const token = authHeader.split(" ")[1];  // hence now if postman send Authorization : Bearer abc123  now with help of split(" ")[1] it will give only abc123
        try{
                const decoded = jwt.verify(token , process.env.JWT_SECRET);  //todo jwt.verify() checks whether the JWT is valid, has not been tampered with, and has not expired. If valid, it returns the payload (decoded). getting profile is main reason
        

                const user = await User.findById(decoded.id);

                req.user = user;

                next();  //! i.e waiting... if its not here it will enter in halt state

        }catch(error){
                return res.status(401).json({
                        message : "Invalid Token"
                });
        }

};

module.exports = authMiddleware;
