const mongoose = require("mongoose");

const connectToDB = async () =>{
    letDB = await mongoose.connect("mongodb://127.0.0.1:27017/");
    console.log("connected");
};

connectToDB();