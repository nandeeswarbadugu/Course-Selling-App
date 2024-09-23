const jwt = require("jsonwebtoken");
const USER_JWT_SECRET = "s3cret";

function userMiddleware(req,res,next){
    const token = req.body.token;
    const decodedMessage = jwt.verify(token,USER_JWT_SECRET);

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
    userMiddleware,
    USER_JWT_SECRET
}

