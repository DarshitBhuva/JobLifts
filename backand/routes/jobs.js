const express = require('express');

const LocalStorage = require('node-localStorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

const Job = require("../models/Job");

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Darshitisagoodboy';

const router = express.Router();




// Create a new Job

router.post('/createjob',fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('position', 'Position must be greater than 0').isInt({gt:0}),
    // body('date', 'Enter a valid date').isISO8601().toDate()


], async(req, res)=>{

    const error = validationResult(req);

    if(!error.isEmpty())
    {
        return res.status(400).json({error: error.array()});
    }

    try{
        let job = await Job.create({
            user:req.user.id,
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            jobType: req.body.jobType,
            skills: req.body.skills,
            duration: req.body.duration,
            deadline: req.body.deadline,
            applicants: req.body.applicants,
            position: req.body.position

        })

        res.json(job);
    }
    catch(error){
        console.error(error.message);
        res.status(400).send("Internal server error");
    }
    
})

// Fetch all Jobs
router.post('/fetchjobs', fetchuser, async(req, res) =>{

})

module.exports = router