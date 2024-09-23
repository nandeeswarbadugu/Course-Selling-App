const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String
})

const CourseSchema = new Schema({
    title:String,
    description:String,
    price:String,
    imageUrl:String,
    creatorId:ObjectId
})

const AdminSchema = new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String
})

const PurchaseSchema = new Schema({
    courseId:ObjectId,
    userId:ObjectId
})


const UserModel = mongoose.model("users",UserSchema);
const CourseModel = mongoose.model("courses",CourseSchema);
const AdminModel = mongoose.model("admins",AdminSchema);
const PurchaseModel = mongoose.model("purchases",PurchaseSchema);


module.exports = {
    UserModel,
    CourseModel,
    AdminModel,
    PurchaseModel
}

