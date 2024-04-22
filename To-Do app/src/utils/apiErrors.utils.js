import { application } from "express"

class ApiError extends Error{
    constructor(
        status, 
        message,
        data = [],
    ){
        super(message)
        this.status = status,
        this.data = data
    }
}

export {ApiError}


