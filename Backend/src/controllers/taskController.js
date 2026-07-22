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

const getTasks = async(req,res) =>{
    try{

        
        const tasks = await Task.find({
            user : req.user._id,
        })

        res.status(200).json(tasks);
    }
    catch(error){
        console.log(error);

        res.status(500).json({
            message : "Server Error",
        });
    } 
};

const updateTask = async(req,res) => {
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
        console.log(error);

        res.status(500).json({
            message : "Server Error",
        });
    }
}

const deleteTask = async(req,res) => {
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
        res.status(500).json({
             message : "Server Error",
        })
    }
}




module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
}