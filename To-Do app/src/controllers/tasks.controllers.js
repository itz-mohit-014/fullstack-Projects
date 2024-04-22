import  { Task }  from "../models/tasks.models.js";
import { ApiError } from "../utils/apiErrors.utils.js";
import { asyncHanddler } from "../utils/asyncHanddler.utils.js";

const getAllTask = asyncHanddler(  async (req ,  res) =>{
    try { 
        const tasks =  await Task.find({});
        return res
        .status(200)
        .json({
            success:200,
            data:{tasks},
            message:'Fetch all Tasks From the Database.'
        })
    
    } catch (error) {
        return res
        .json(
            new ApiError(500, error, "Unable to fetch tasks from database")
        )
    }
})

const addNewTask = async (req ,  res) =>{
    try {
        const { name } = req.body
        const newTask =  await Task.create({name})

        if(!newTask) {
            throw new ApiError(404 , "Task isn't saved to database.")
        }

        return res
        .status(200)
        .json({
            success:200,
            tasks:newTask,
            message:'Fetch single Task From the Database.'
        })
    
    } catch (error) {
        console.log(error);
        return res
        .json(
            new ApiError(500, error, "Unable to save tasks from database")
        )
    }
}


const getSpecificTask = async (req ,  res) =>{
    try {
        const { _id } = req.params
        const task =  await Task.findById({_id});
        if(!task) throw new ApiError(404 , "Can't found this task.")
        return res
        .status(200)
        .json({
            success:200,
            data:task,
            message:'Fetch single Task From the Database.'
        })
    
    } catch (error) {
        return res
        .json(
            new ApiError(500, error, "Unable to fetch tasks from database")
        )
    }
}

const removeTask = asyncHanddler( async (req, res) =>{
   try {
     const { _id } = req.params;
     const deletedTask = await Task.deleteOne({_id})
     if(deletedTask){
         return res
         .status(200)
         .json({
             success:200,
             message:'Task has been deleted.'
         })

     }
     
     throw new ApiError(500, "Task couldn't deleted")
    } catch (error) {
        console.log(error)
        throw new ApiError(500, "Task couldn't deleted")

   }

})


const updateTask = asyncHanddler( async (req, res) =>{
    const { _id } = req.params;
    const {name, completed} = req.body;

    const task = await Task.findByIdAndUpdate({_id} ,{
         name,
         completed
    }, {new:true})
    if(!task) throw new ApiError(404 , "cann't found task");
    return res
        .status(200)
        .json({
            success:200,
            data:task,
            message:'Fetch single Task From the Database.'
        })

})


export {
    getAllTask,
    getSpecificTask,
    addNewTask,
    removeTask,
    updateTask
}