const {StatusCodes} = require("http-status-codes");


const getAllJobs  = async (req,res)=>{
    res.status(StatusCodes.OK).send('get all jobs')
}

const getJob = async (req,res)=>{
    res.status(StatusCodes.OK).send('get single jobs')
}

const createJob  = async (req,res)=>{
     res.status(StatusCodes.OK).json(req.user)
}

const updateJob  = async (req,res)=>{
    res.status(StatusCodes.OK).send('job updated')
}

const deleteJob  = async (req,res)=>{
    res.status(StatusCodes.OK).send('job deleted')
}

module.exports={
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}