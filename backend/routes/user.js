const express = require("express")
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("./../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupSchema = zod.object( {
    username : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})

// console.log("entered user.js");

// router.get("/gett", function(req,res) {
//     console.log("coming to index.js");
//     res.json("coming to get in user.js")
// })

router.post("/signup", async function(req,res) {
    // console.log("entered signup router");
    
    const body = req.body;
    const {success} = signupSchema.safeParse(body)
    if(!success) {
        return res.json( {
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username : body.username
    })

    console.log(existingUser);
    

    if(existingUser) {
        return res.status(411).json({
            message : "Email already taken"
        })
    }

    console.log("crossed existing user condition")
    const user = await User.create({
        username : body.username,
        password : body.password,
        firstName : body.firstName,
        lastName : body.lastName
    })

    console.log("crossed user create");
    console.log(user);
    
    
    const userId = user._id;
    
    console.log(userId);
    
    
    //--------------CREATE NEW ACCOUNT--------------
    
    const account = await Account.create({
        userId,
        balance : 1 + Math.random() * 10000
    })
    
    console.log("account created", account);
    
    
    //-----------------------------------------------
    
    const token = jwt.sign({userId},JWT_SECRET)

    console.log("Token generated!!");
    

    res.status(200).json({
        message : "User created Successfully",
        token : token
    })


})

const signinSchema = zod.object({
    username : zod.string().email(),
    password: zod.string()
})

router.post("/signin", async function(req,res) {
    const body = req.body;
    const {success} = signinSchema.safeParse(body);

    if(!success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const user = await User.findOne({
        username : body.username,
        password : body.password
    })

    if(user) {
        const token = jwt.sign({userId:user._id},JWT_SECRET)
        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateUserSchema = zod.object( {
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

router.put("/user",authMiddleware , async function(req,res) {
    const {success} = updateUserSchema.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message : "Error while updating information"
        })
    }
    console.log("body parser finished");
    

    await User.updateOne({
        id: req.userId
    })

    res.json({
        message: "Updated Successfully"
    })
})


router.get("/bulk", async function (req,res)  {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or : [{
            firstName: {
                "$regex" : filter
            }
        },{
            lastName : {
                "$regex" : filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router