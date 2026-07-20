const Task = require("../models/Task");

const createTask = async (req,res) =>{
    try{
        const {title,description} = req.body;

        const task = await Task.create({
            title,
            description,
            user: req.user._id,
        });

        res.status(201).json({   //!201 Created → Used when you've created a new resource.
            message : "Task Created Successfully",
            task,
        });


    }catch(error){
       console.log(error);

       res.status(500).json({
            message : "Server Error"
       });
    }
}

module.exports = {
    createTask,
}