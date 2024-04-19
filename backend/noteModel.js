import mongoose from "mongoose"

const noteschema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    user: {
        type:String,
        required:true
        
    }
})

const Note = mongoose.model("Note",noteschema)

export {Note}