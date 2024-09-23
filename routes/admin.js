const {Router} = require('express');
const adminRouter = Router();
const AdminModel = require("../db")

adminRouter.post("/signup", function(req,res){

})



adminRouter.post("/login", function(req,res){

})




adminRouter.post("/course", function(req,res){
    
})

adminRouter.put("/course", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.get("/course/bulk", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})



module.exports = {
    adminRouter:adminRouter
}

