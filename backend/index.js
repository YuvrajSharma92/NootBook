
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { Note } from "./noteModel.js"
import {User} from './UserModel.js'

import dotenv from "dotenv"

dotenv.config({path:"./config/config.env"})



const connectToDB = async () => {
    try {
        let DB = await mongoose.connect(process.env.MONGOURI)
        console.log("Connected to DB at ", mongoose.connection.host);
    } catch (error) {
        console.log(error);
    }
}
connectToDB()
const app = express();

app.use(cors({
    'Access-Control-Allow-Origin': "*", 
    'methods': "GET,POST,PUT,DELETE",
    'credentials': true
  }))
app.use(express.json())


app.post("/post/note", async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.json({
            error: "all fields are required"
        })
    }
   let userId = req.header("userId")
   console.log(userId);
    const note = await Note.create({
        title: title,
        description: description,
        user:userId
    })

    res.json({
        success: true,
        note
    })
})

app.get("/get/notes", async (req, res) => {
    let userId = req.header("userId")

    const note = await Note.find({user:userId})

    res.json({
        success: true,
        note
    }) 
})

app.put("/update/note/:id", async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params;



    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid ID format"
        });
    }

    const result = await Note.findByIdAndUpdate(id, {
        title: title,
        description: description
    });

    res.json({
        success: true,
        massage: result
    })
})

app.delete("/delete/note/:id", async (req, res) => {



    const result = await Note.findByIdAndDelete(req.params.id);

    res.json({
        success: true,
        massage: result
    })
})


app.post("/user/signup", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({
            error: "all fields are required"
        })
    }
    const isExist = await User.find({email:email })
    if (isExist.length != 0) {
        console.log(isExist);
        return res.json({
            err:"email already exists"
        })
    }

    const user = await User.create({
        name: name,
        email: email,
        password: password
    })

    res.json({
        success: true,
        user
    })
})


app.post("/user/login", async (req, res) => {

    const {email, password } = req.body;

    if (!email || !password) {
        return res.status(403).json({
            error: "all fields are required"
        })
    }
    const user = await User.findOne({email:email })

    if (!user) {
        return res.status(403).json({
            massage:"invalid credentials"
        })
    }

    if (user.password != password) {
        return res.status(403).json({
            massage:"invalid credentials"
        })
    }

    res.json({
        success: true,
        user
    })
})




app.listen(8000, () => {
    console.log("listening on port 8000");
})
