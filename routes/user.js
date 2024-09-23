const { Router,json } = require("express");
const userRouter = Router();
const UserModel = require("../db");

userRouter.use(json());


userRouter.post("/signup", function(req,res){
    const {email, 
            password,
            firstName,
            lastName} = req.body;

    UserModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    });


})

userRouter.post("/login", function(req,res){

})

function userMiddleware(req,res,next){
    const token = req.headers.token;

}

userRouter.get("/purchases",userMiddleware, function(req,res){
    
})

module.exports = {
    userRouter:userRouter
}

