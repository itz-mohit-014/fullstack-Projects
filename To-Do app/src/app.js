import dotenv from "dotenv"
dotenv.config()
import express from "express";
import connectToDatabase from './database/task.database.js'
import { router } from "./routes/tasks.routes.js";

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.static('../public'))
app.use(express.json({limit:'64kb'}));
app.use(express.urlencoded({extended:false}))
// app.use(cors({
// }))

// base route..
app.use('/api/v1/tasks' , router)

connectToDatabase().then(() =>{

    app.listen(PORT || 3000, ()=>{
        console.log(`Server is starting at the PORT no:${PORT}`)
    })
})
.catch((error)=>{
    console.log(error)
    process.exit(1);
})