const express = require("express");
const {createTask , getTasks , updateTask , deleteTask} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const {createTaskValidator} = require("../validators/taskValidator");
const validate = require("../middleware/validate");


const router = express.Router();

router.post(
    "/",
    authMiddleware,
    createTaskValidator,
    validate,
    createTask
);
router.get("/",authMiddleware,getTasks);

router.put("/:id",authMiddleware,updateTask);

router.delete("/:id",authMiddleware,deleteTask);

module.exports = router;


