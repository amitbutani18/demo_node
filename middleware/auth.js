const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req,res,next) {
    var token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Anuthorized...');

    try{
        var decoder = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoder;
        next();
    }catch (err){
        console.log(err.message);
        res.status(400).send('Invalid Token...');
    }
}