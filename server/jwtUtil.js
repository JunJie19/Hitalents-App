const jwt = require('jsonwebtoken');

const signingKey = 'hydeinternationalukportalsystem'

const generateTokenByRole = (role) => {
    return jwt.sign({ role: role }, signingKey);
}

const verifyRoleFromToken = (token) => {
    return new Promise ((resolve, reject) => {
        if (token){
            jwt.verify(token, signingKey, function (err, decoded) {
                if (err){
                    reject(err)
                } else {
                    resolve(decoded.role)
                }
            });
        } else {
            reject('token expires, please relogin')
        }
        
    } )
    
}

module.exports = {
    generateTokenByRole,
    verifyRoleFromToken
}