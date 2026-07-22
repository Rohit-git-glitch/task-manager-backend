const  { body } = require("express-validator");

const createTaskValidator = [
    body("title")
        .notEmpty()
        .withMessage("Title is required"),

    body("description")
        .notEmpty()
        .withMessage("Desciption is required"),
];

module.exports = {
    createTaskValidator,
};