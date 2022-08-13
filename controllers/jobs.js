const {StatusCodes} = require("http-status-codes");
const Job = require('../models/Job')
const {BadRequestError,NotFoundError} = require('../errors')


const getAllJobs  = async (req,res)=>{
    res.status(StatusCodes.OK).send('get all jobs')
}

const getJob = async (req,res)=>{
    res.status(StatusCodes.OK).send('get single jobs')
}

const createJob  = async (req,res)=>{
    req.body.createdBy=req.user.userId
    // const job =await Job.create(req.body)
    const job =await Job.find({})
    // console.log(job)
     return res.status(StatusCodes.CREATED).json({job})
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