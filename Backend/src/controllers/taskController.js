const { successResponse } = require("../utils/response");
const { errorResponse } = require("../utils/response");
const Task = require("../models/Task");
const createTask = async (req,res,next) =>{
    try{
        const {title,description} = req.body;

        const task = await Task.create({
            title,
            description,
            user: req.user._id,
        });

        // res.status(201).json({   //!201 Created → Used when you've created a new resource.
        //     message : "Task Created Successfully",
        //     task,
        // });
        return successResponse(
          res,
          201,
          "Task Created Successfully",
          task  
        );


    }catch(error){
      next(error);
    }
};

const getTasks = async(req,res,next) =>{
    try{

        
        const tasks = await Task.find({
            user : req.user._id,
        })

        // res.status(200).json(tasks);
        return successResponse(
            res,
            200,
            tasks
        );
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
            // return res.status(404).json({
            //     message : "Task Not Found",
            // });
            return errorResponse(
                res,
                404,
                "Task Not Found",
                "TASK_NOT_FOUND"
            );
        }

        if(task.user.toString() != req.user._id.toString()){
            // return res.status(403).json({
            //     message : "Access Denied",
            // });
            return errorResponse(
                res,
                403,
                "Access Denied",
                "ACCESS_DENIED"
            );
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

        // res.status(200).json({
        //     message : "Task updated successfully",
        //     task,
        // })
        return successResponse(
            res,
            200,
            "Task updated successfully",
            task
        );
    }catch(error){
       next(error);
    }
};

const deleteTask = async(req,res,next) => {
    try{
        const{id} = req.params;

        const task = await Task.findById(id);

        if(!task){
            // return res.status(404).json({
            //     message : "Task Not Found",
            // });
            return errorResponse(
                res,
                404,
                "Task Not Found",
                "TASK_NOT_FOUND"
            );
        }

        if(task.user.toString() != req.user._id.toString()){
            // return res.status(403).json({
            //     message : "Access Denied",
            // });
            return errorResponse(
                res,
                403,
                "Access Denied",
                "ACCESS_DENIED"
            );
        }
        await task.deleteOne();

        // res.status(200).json({
        //     message : "Task Deleted Successfully",
        // });
        return successResponse(
            res,
            200,
            "Task Deleted Successfully",
        );


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