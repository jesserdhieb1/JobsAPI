const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let CustomError = {
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'Something went wrong try again later'
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  //create special function for model validation
  if (err.code && err.code===11000){
    CustomError.msg=`Duplicate value entered for email failed please choose another value`
    CustomError.statusCode= 400
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(CustomError.statusCode).json({ msg: CustomError.msg })
}

module.exports = errorHandlerMiddleware
