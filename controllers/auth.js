const {StatusCodes}=require('http-status-codes')
const User = require('../models/User')
const {BadRequestError,UnauthenticatedError}=require('../errors')
const jwt = require('jsonwebtoken')
const {createJob} = require("./jobs");

const register  = async (req,res)=>{
    // const{name,email,password}=req.body
    // if(!name || !email || !password){
    //     throw new BadRequestError('please provide all your credentials')
    // }
    const user = await User.create({...req.body})
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user: {name:user.name},token})
}

const login  = async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw BadRequestError('please provide both your email and password')
    }
    const user =await User.findOne({email:email})
    //compare password
    if (!user){
        throw UnauthenticatedError('please verify your credentials')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({name: user.name,token})
}

module.exports = {register,login}
