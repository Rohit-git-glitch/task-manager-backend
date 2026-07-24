const {
    successResponse,
    errorResponse
} = require("../utils/response");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async(req, res,next) => {   //! This is actually good it prints the data coming from post postman
    try{
        
    const {name , email , password } = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        // return res.status(400).json({
        //     message : "User already exists",
        // });
        return errorResponse(
            res,
            400,
            "User already exists",
            "USER_ALREADY_EXISTS"
        );

    }
    
    const hashedPassword = await bcrypt.hash(password,10);  //todo here 10 is the salting factor good balance secure and slower


    const user = await User.create({
            name,
            email,
            password : hashedPassword
        });

        // res.status(201).json({
        //     message: "User registered Successfully",
        //     user: {
        //         id: user._id,
        //         name: user.name,
        //         email: user.email
        //     }
        // });
        return successResponse(
            res,
            201,
            "User registered Successfully",
            {
                id: user._id,
                name: user.name,
                email: user.email
            }
        );
    } catch(error){
        next(error);
    }
};
/*
    here 201 Resiurce created and 500 internal server error
    are http status codes.
*/


const loginUser = async(req , res , next) => {
    try{
        const {email , password } = req.body;

        const user = await User.findOne({email});

        if(!user){
            // return res.status(400).json({
            //     message : "Invalid Credentials"
            // });
            return errorResponse(
                res,
                400,
                "Invalid Credentials",
                "INVALID_CREDENTIALS"
            );
        }

        const isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch){
            // return res.status(400).json({
            //     message : "Invalid Credentials"
            // });
            return errorResponse(
                res,
                400,
                "Invalid Credentials",
                "INVALID_CREDENTIALS"
            );
        }

        const token = jwt.sign(                      //todo jwt.sign() creates a signed JWT token by taking a payload (like the user's id), signing it with a secret key, and optionally adding an expiration time.
             {id : user._id},
             process.env.JWT_SECRET,

             {
                expiresIn : "1d"
             }
            );

        // res.status(200).json({
        //     message : "Login Successful",
        //     token : token
        // })
        return successResponse(
            res,
            200,
            "Login Successful",
            {
                token 
            }
        );

    }catch(error){
      next(error);
    }
};


const getProfile = (req , res, next) => {
    try{
        //  res.status(200).json(req.user);
        return successResponse(
            res,
            200,
            "Profile fetched successfully",
            {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email
             }

        );
    }catch(error){
        next(error);
    }
};


module.exports = {
    registerUser,
    loginUser ,
    getProfile
};
