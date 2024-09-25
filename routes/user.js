require('dotenv').config();
const { Router,json } = require("express");
const userRouter = Router();
const {UserModel} = require("../db");
const jwt = require("jsonwebtoken")
const {userMiddleware} = require("../userAuth")
const bcrypt = require("bcrypt");
const { hasSubscribers } = require("diagnostics_channel");

userRouter.use(json());


userRouter.post("/signup", async function(req,res){
    const {email, 
            password,
            firstName,
            lastName} = req.body;
    
    const hashPassword = await bcrypt.hash(password,5);

    await UserModel.create({
        email:email,
        password:hashPassword,
        firstName:firstName,
        lastName:lastName
    });
    
    res.json({
        message:"User logged in"
    })

})

userRouter.post("/signin", async function(req,res){
    const {email,password} = req.body;

    const user = await UserModel.findOne({
        email:email
    })

    if (!user)
    {
        res.json({message:"User does not exist"});
    }
    const verifyUser =await bcrypt.compare(password,user.password);
    if(verifyUser)
    {
        const token = jwt.sign({
            userid:user._id
        },process.env.USER_JWT_SECRET);

        res.json({token:token});
    }
    else 
    {
        res.json({message:"Incorrect Password"});

    }
});

userRouter.get("/purchases",userMiddleware, function(req,res){

    const userId = req.userId;

    const response = PurchaseModel.findOne({
        userId:userId
    })
    // render all purchased courses of user
    res.json({
        response
    })

    
})

module.exports = {
    userRouter:userRouter
}

