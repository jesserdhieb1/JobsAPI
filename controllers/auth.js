const {StatusCodes}=require('http-status-codes')

const register  = async (req,res)=>{
    res.status(StatusCodes.OK).send('user registered')
}

const login  = async (req,res)=>{
    res.status(StatusCodes.OK).send('user connected')
}

module.exports = {register,login}
