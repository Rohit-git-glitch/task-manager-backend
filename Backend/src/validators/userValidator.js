const {body} = require("express-validator");

const registerUserValidator = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email format"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isLength({min:8})
        .withMessage("Password must be at least 8 characters"),

    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .bail()
        .isLength({min:2})
        .withMessage("Name must be at least 2 characters")
];

module.exports = {
    registerUserValidator,
}
