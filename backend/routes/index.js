const express = require("express")
const userRouter = require("./user")
const accountRouter = require("./account")

const router = express.Router();
console.log("entered routes/index.js");

router.use("/user",userRouter)
router.use("/account",accountRouter)


router.get("/", function(req,res) {
    console.log("coming to index.js");
    
})

module.exports = router;

