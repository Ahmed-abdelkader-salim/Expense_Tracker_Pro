const jwt = require('jsonwebtoken');
const auth = (req, res, next) =>{
    // console.log(req.headers);
    try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");

        const jwt_Payload = jwt.verify(accessToken, process.env.jwt_salt);

        req.user = jwt_Payload;
        
    } catch (error) {
        res.status(401).json({
            status:'failed',
            message: 'unuthorized',
        })
        return;
    }
    next();
}

module.exports = auth;