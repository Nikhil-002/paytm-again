const {JWT_SECRET} = require("./config")
const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    console.log("auth Header: ",authHeader);
    

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message : "User not Authorised"
        })
    }
    const token = authHeader.split(' ')[1];
    console.log("crossed token part");
    
    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }else{
            return req.status(403).json({
               message:  "User not Authorised."
            }) 
        }

        // next();
    }
    catch(err) {
        return req.status(403).json({
            message: "User not Authorised."
        })
    }
}

module.exports = {
    authMiddleware
}
