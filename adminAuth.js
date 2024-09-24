const jwt = require('jsonwebtoken');
require('dotenv').config();

function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const decodedMessage = jwt.verify(token,process.env.ADMIN_JWT_SECRET);

    if(decodedMessage){
        req.adminId = decodedMessage.adminId;
        next();

    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }

}

module.exports = {
    adminMiddleware
}


