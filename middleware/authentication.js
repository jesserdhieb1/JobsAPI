const jwt = require('jsonwebtoken')
const { UnauthenticatedError}=require('../errors')
require('dotenv').config()

const authenticate = async (req,res,next)=>{
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('please provide a token')
    }
    const token = authHeader.split(' ')[1]
    try{
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        // const user = User.findById(decoded.userId).select('-password')
        // req.user=user
        req.user={ userId: decoded.userId, name: decoded.username }
        // res.locals.user={ userId: decoded.userId, name: decoded.username }
        return next()
    }
    catch (err){
        throw new UnauthenticatedError('unauthorized :(')
    }
}

module.exports = authenticate