const express = require('express');
const app =express();
const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course")
const {adminRouter} = require("./routes/admin");
const mongoose = require('mongoose')

app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);


async function dbConnect(){
    await mongoose.connect("mongodb+srv://nandeeswar7421:z2PImVuyH2iL51bZ@cluster0.odvpz.mongodb.net/coursera-database");
    app.listen(3000);
}


dbConnect();
