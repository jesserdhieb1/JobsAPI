const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authentication')

const {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}= require('../controllers/jobs')

router.route('/').post(authenticate,createJob).get(getAllJobs)
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports=router