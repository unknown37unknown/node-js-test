const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req, res, next) => {

    //  check header is authorize or not

    const authorize = req.headers.authorization;
    if(!authorize) return res.status(401).json({error: 'token not found'});

    const token = req.headers.authorization.split(' ')[1];
    if(!token)  return res.status(401).json({error: 'unauthorized'});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error: 'invalid token'})
    }
}

// generate token

const generateToken = (userData) =>{
    return jwt.sign(userData, process.env.JWT_SECRET);
}


module.exports = {jwtAuthMiddleware, generateToken};

