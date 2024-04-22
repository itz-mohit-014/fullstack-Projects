import express from "express" 
import { 
    getAllTask,
    getSpecificTask ,
    addNewTask,
    removeTask,
    updateTask } from "../controllers/tasks.controllers.js";
const router = express.Router()


router.route('/')
.get(getAllTask)
.post(addNewTask)

router.route('/:_id')
.get(getSpecificTask)
.delete(removeTask)
.patch(updateTask)

export {router}