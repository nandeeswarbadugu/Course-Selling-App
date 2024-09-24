const {Router,json} = require('express');
const adminRouter = Router();
const {AdminModel,CourseModel} = require("../db")
const {adminMiddleware}  = require("../adminAuth");
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

    const admin = await AdminModel.findOne({
        email:email
    })

    if (!admin)
    {
        res.json({message:"Admin does not exist"});
    }
    console.log("admin password from db ",admin.password);
    const verifyAdmin = await bcrypt.compare(password,admin.password);

    if(verifyAdmin)
    {
        const token = jwt.sign({
            adminId:admin._id
        },process.env.ADMIN_JWT_SECRET);

        res.json({token:token});
    }
    else 
    {
        res.json({message:"Incorrect Password"});

    }

});

adminRouter.post("/course",adminMiddleware, async function(req,res){

    const adminId = req.adminId;

    const {title,description,price,imageUrl} = req.body;

    const response = await CourseModel.create({
        title:title,
        description:description,
        price:price,
        imageUrl:imageUrl,
        creatorId:adminId});

    res.json({message:"Course is created", courseId:response._id});

    
    
})

adminRouter.put("/course",adminMiddleware,async function(req, res) {
    const creatorId = req.adminId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const response  = await CourseModel.updateOne({
        creatorId:creatorId,
        _id:courseId
    },{
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price

    })

    res.json({message:"Course is updated"})
    
})

adminRouter.get("/course/bulk",adminMiddleware,async function(req, res) {
    
    const creatorId = req.adminId;

    const courses = await CourseModel.find({
        creatorId:creatorId
    })

    res.jsnon({
        message:"your courses",
        courses
    });


})

module.exports = {
    adminRouter:adminRouter
}

