const Task = require("../models/Task");

const createTask = async (req,res,next) =>{
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
      next(error);
    }
};

const getTasks = async(req,res,next) =>{
    try{

        
        const tasks = await Task.find({
            user : req.user._id,
        })

        res.status(200).json(tasks);
    }
    catch(error){
        next(error);
    } 
};

const updateTask = async(req,res,next) => {
    try{
        const{id} = req.params;

        const task = await Task.findById(id);

        if(!task){
            return res.status(404).json({
                message : "Task Not Found",
            });
        }

        if(task.user.toString() != req.user._id.toString()){
            return res.status(403).json({
                message : "Access Denied",
            });
        }

        const {title, description , completed} = req.body;

        if(title !== undefined){
            task.title = title;
        }

         if (description !== undefined) {
            task.description = description;
        }

        if (completed !== undefined) {
            task.completed = completed;
        }
        await task.save();

        res.status(200).json({
            message : "Task updated successfully",
            task,
        })
    }catch(error){
       next(error);
    }
};

const deleteTask = async(req,res,next) => {
    try{
        const{id} = req.params;

        const task = await Task.findById(id);

        if(!task){
            return res.status(404).json({
                message : "Task Not Found",
            });
        }

        if(task.user.toString() != req.user._id.toString()){
            return res.status(403).json({
                message : "Access Denied",
            });
        }
        await task.deleteOne();

        res.status(200).json({
            message : "Task Deleted Successfully",
        });


    }catch(error){
        next(error);
    }
};
module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
}