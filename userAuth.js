const jwt = require("jsonwebtoken");
require('dotenv').config();

function userMiddleware(req,res,next){
    const token = req.body.token;
    const decodedMessage = jwt.verify(token,process.env.USER_JWT_SECRET);

    if (decodedMessage){
        req.userId = decodedMessage.userId;
        next();

    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }

}

module.exports = {
    userMiddleware
}

