const mongoose = require("mongoose")

//Connection with MongoDB Database
// mongoose.connect("mongodb://localhost:27017/paytm-again");

const MONGO_URI = 'mongodb+srv://admin:P7eFa52WEyXJYI70@cluster0.2jxd9ic.mongodb.net/paytm-again'

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
console.log("connection made with DB");


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


const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,  // Reference to User Model
        ref : 'User',
        required : true
    },
    balance :  {
        type : Number,
        required : true
    }
});


//Create model for the schema
const User = mongoose.model("User",userScehma)
const Account = mongoose.model("Account", accountSchema);

module.exports= {
    User,
    Account
}
