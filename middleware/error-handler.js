const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const {custom} = require("joi");
const errorHandlerMiddleware = (err, req, res, next) => {
  let CustomError = {
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'Something went wrong try again later'
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  //create special functions for model validation
  // Error (when we miss adding a value when creating an instance of the model
  if (err.name==='ValidationError'){
    // console.log(Object.values(err.errors))
    CustomError.msg=Object.values(err.errors)
        .map((item)=>item.message).join(', ')
    CustomError.statusCode=400
  }
  //duplicate Email error
  if (err.code && err.code===11000){
    CustomError.msg=`Duplicate value entered for email failed please choose another value`
    CustomError.statusCode= 400
  }
  //cast Error (when we add more number in the id)
  if (err.name==='CastError'){
    CustomError.msg=`No item found with the id : ${err.value}`
    CustomError.statusCode= 404
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(CustomError.statusCode).json({ msg: CustomError.msg })
}

module.exports = errorHandlerMiddleware
