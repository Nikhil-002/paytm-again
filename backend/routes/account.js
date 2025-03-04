const express = require("express")
const { Account, User } = require("../db")
const zod = require("zod");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

const router = express.Router()

router.get("/balance",authMiddleware, async function(req,res) {
    console.log("entered balance API");
    
    const account = await Account.findOne({
        userId : req.userId
    })
    console.log("account: ",account);
    

    return res.status(200).json({
        userId : req.userId,
        balance : account.balance
    }) 
}); 

const transferSchema = zod.object({
    to : zod.string(),
    amount : zod.number()
})

router.post("/transfer",authMiddleware, async function (req,res) {

    const session = await mongoose.startSession();      //  <------------------------------------

    session.startTransaction();     //  <------------------------------------

    const {amount,to} = req.body;
    const {success} = transferSchema.safeParse({amount,to});

    if(!success) {
        return res.status(411).json({
            message : "Please enter valid values"
        })
    }

    // Fetch the accounts within the transaction
    const account = await Account.findOne({
        userId : req.userId
    }).session(session);        //  <------------------------------------

    if(!account || account.balance < amount) {
        await session.abortTransaction();     //  <------------------------------------
        return res.status(400).json({
            message : "Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({
        userId : to
    }).session(session)         //  <------------------------------------

    if(!toAccount) {
        await session.abortTransaction();       //  <------------------------ ------------
        return res.status(400).json({
            message : "Invalid Account"
        })
    }


    // Perform the Transfer
    await Account.updateOne({
        userId : req.userId
    }, {
        $inc : {
            balance : -amount
        }
    }).session(session)     //  <------------------------------------

    await Account.updateOne({
        userId : to
    },{
        $inc : {
            balance : amount
        }
    }).session(session)     //  <------------------------------------

    
    //Commit the transaction
    await session.commitTransaction();      //  <------------------------------------

    res.json({
        message : "Transfer Successfull"
    })

})



module.exports = router

