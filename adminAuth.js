const jwt = require('jsonwebtoken');

const ADMIN_JWT_SECRET= ""

function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const adminId = jwt.verify(token,ADMIN_JWT_SECRET);

    if(adminId){
        req.adminId = adminId;
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

