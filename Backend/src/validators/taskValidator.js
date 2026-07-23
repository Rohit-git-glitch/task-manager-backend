const  { body } = require("express-validator");

const createTaskValidator = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .bail() //because if it is not , our express validator will run all validators field
        .isLength({min:3})
        .withMessage("Title must be at least 3 characters"),

    body("description")
        .notEmpty()
        .withMessage("Desciption is required")
        .bail()
        .isLength({min:5})
        .withMessage("Description must be at least 5 characters"),
];

module.exports = {
    createTaskValidator,
};