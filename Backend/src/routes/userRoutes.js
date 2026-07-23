const express = require("express");

const router = express.Router();

const {registerUserValidator,
       loginUserValidator
} = require("../validators/userValidator");
const validate = require("../middleware/validate");


const { registerUser,
        loginUser ,
        getProfile
      } = require("../controllers/userController");


const authMiddleware = require("../middleware/authMiddleware");


router.post(
    "/register",
    registerUserValidator,
    validate,
    registerUser
);
router.post(
    "/login",
    loginUserValidator,
    validate,
    loginUser);

//this below is temporary
router.get("/", (req, res) => {
    res.send("User Route Working");
});


router.get("/profile",authMiddleware,getProfile);



module.exports = router;

