const {Router,json} = require('express');
const adminRouter = Router();
const {AdminModel} = require("../db")
const {adminMiddleware,ADMIN_JWT_SECRET}  = require("../adminAuth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

adminRouter.use(json());

adminRouter.post("/signup", async function(req,res){
    const {email, 
        password,
        firstName,
        lastName} = req.body;

    const hashPassword = await bcrypt.hash(password,5);

    await AdminModel.create({
        email:email,
        password:hashPassword,
        firstName:firstName,
        lastName:lastName
    });

    res.json({
        message:"Admin logged in"
    })
});

adminRouter.post("/signin", async function(req,res){
    const {email,password} = req.body;

    const admin = AdminModel.findOne({
        email:email
    })

    if (!admin)
    {
        res.json({message:"Admin does not exist"});
    }

    const verifyAdmin = bcrypt.compare(password,admin.password);

    if(verifyAdmin)
    {
        const token = jwt.sign({
            id:admin._id
        },ADMIN_JWT_SECRET);

        res.json({token:token});
    }
    else 
    {
        res.json({message:"Incorrect Password"});

    }

});

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

