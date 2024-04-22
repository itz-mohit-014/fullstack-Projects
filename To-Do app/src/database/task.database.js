import  mongoose  from "mongoose";
import { ApiError } from "../utils/apiErrors.utils.js";

const connectToDatabase = async (req, res)=>{
    try {
        
        const database = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`Database Connect at the host ${database.connection.host}`)
        return database;
    } catch (error) {
        throw new ApiError(500, error, "Can't connected to database.")
    }
}

export default connectToDatabase;

