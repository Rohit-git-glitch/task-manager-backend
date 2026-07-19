const express = require("express");

const router = express.Router();


const { registerUser,
        loginUser ,
        getProfile
      } = require("../controllers/userController");


const authMiddleware = require("../middleware/authMiddleware");




router.post("/register",registerUser);
router.post("/login",loginUser);

//this below is temporary
router.get("/", (req, res) => {
    res.send("User Route Working");
});


router.get("/profile",authMiddleware,getProfile);



module.exports = router;

