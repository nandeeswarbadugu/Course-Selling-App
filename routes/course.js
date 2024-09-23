const { Router } = require("express");
const courseRouter = Router();
const {CourseModel} = require("../db");
const {PurchaseModel} = require("../db");
const { userMiddleware } = require("../userAuth");



courseRouter.post("/purchase",userMiddleware, async function(req,res){
    const courseId = req.body.courseId;
    const userId = req.userId;

    await PurchaseModel.create({
        courseId:courseId,
        userId:userId
    })
    
    res.json({
        message:"you bought course"
    })
    
})

courseRouter.get("/preview", async function(req,res){

    const response =await CourseModel.find();
    res.json(response);
})

module.exports = {
    courseRouter:courseRouter
}



