const jwt = require('jsonwebtoken');

const ADMIN_JWT_SECRET= "IAMTHEADMIN"

function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const decodedMessage = jwt.verify(token,ADMIN_JWT_SECRET);

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
    adminMiddleware,
    ADMIN_JWT_SECRET
}

