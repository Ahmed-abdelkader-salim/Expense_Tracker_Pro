const jwt = require('jsonwebtoken');
const jwtManagers =  (user) => {
    const accessToken =  jwt.sign({
        _id: user._id,
        name: user.name,
    },
    process.env.jwt_salt
    );
    return accessToken;
}   

module.exports = jwtManagers;