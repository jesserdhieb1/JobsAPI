const mongoose =require ('mongoose')
const crypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const UserSchema =  mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide a name'],
        maxLength : 50,
        minLength : 3},
    email:{
        type:String,
        required:[true,'please provide an email'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ,'please verify your email structure'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'please provide a password'],
        minLength: 6
    }
})

UserSchema.pre('save',async function(){
    const salt =await crypt.genSalt(10)
    this.password=await crypt.hash(this.password,salt)
})

UserSchema.methods.createJWT = function (){
    const token = jwt.sign({userId: this._id, username: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
    return token;
}

UserSchema.methods.comparePassword =async function (pass){
    const isMatch =await crypt.compare(pass,this.password)
    return isMatch
}
module.exports=mongoose.model('User',UserSchema)