const {StatusCodes}=require('http-status-codes')
const User = require('../models/User')

const register  = async (req,res)=>{
    const user = await User.create({...req.body})
    res.status(StatusCodes.CREATED).json(user)
}

const login  = async (req,res)=>{
    res.status(StatusCodes.OK).send('user connected')
}

module.exports = {register,login}
