const mongoose = require("mongoose")

//Connection with MongoDB Database
mongoose.connect("mongodb://localhost:27017/paytm-again");

//Schema for Users
const userScehma = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength:30
    },
    password: {
        type: String,
        required: true,
        minLength:6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength:50
    },
    lastName: {
        type: String,
        required: true,
        trim : true,
        maxLength : 30
    }
})


//Create model for the schema
const User = mongoose.model("User",userScehma)

module.exports= {
    User
}
