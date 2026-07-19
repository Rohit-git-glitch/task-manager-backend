
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async(req, res) => {   //! This is actually good it prints the data coming from post postman
    try{
        
    const {name , email , password } = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({
            message : "User already exists",
        });
    }
    
    const hashedPassword = await bcrypt.hash(password,10);  //todo here 10 is the salting factor good balance secure and slower


    const user = await User.create({
            name,
            email,
            password : hashedPassword
        });

        res.status(201).json({
            message: "User registered Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error){
        res.status(500).json({
            message: "Server Error"
        });
    }
};
/*
    here 201 Resiurce created and 500 internal server error
    are http status codes.
*/


const loginUser = async(req , res) => {
    try{
        const {email , password } = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message : "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch){
            return res.status(400).json({
                message : "Invalid Credentials"
            });
        }

        const token = jwt.sign(                      //todo jwt.sign() creates a signed JWT token by taking a payload (like the user's id), signing it with a secret key, and optionally adding an expiration time.
             {id : user._id},
             process.env.JWT_SECRET,

             {
                expiresIn : "1d"
             }
            );

        res.status(200).json({
            message : "Login Successful",
            token : token
        })

    }catch(error){
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};


const getProfile = (req , res) => {

    console.log(req.user);

    res.status(200).json(
        req.user
    );

};






module.exports = {
    registerUser,
    loginUser ,
    getProfile
};
