const express = require('express')

const LocalStorage = require('node-localStorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

const Cart = require("../models/Cart");
const Job = require("../models/Job");

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Darshitisagoodboy';

const router = express.Router();

router.post("/AddToCart/:id", fetchuser, async(req, res)=>{

    try{

        let job = await Job.findById(req.params.id);

        if(!job){
            return res.status(400).send("404 Job is not found");
        }

        let cart = await Cart.create({

            userid : req.user.id,
            jobid : req.params.id,
            title : job.title,
            description : job.description,
            salary: job.salary,
            jobType: job.jobType,
            skills: job.skills,
            duration: job.duration,
            deadline: job.deadline,
        })

        res.json(cart);
    }
    catch(error){
        console.log(error.message);
        res.status(400).send("Internal server error");
    }
})

router.post('/fetchAllCarts', fetchuser, async (req, res)=>{

    try{
        const carts = await Cart.find({userid : req.user.id})

        res.json(carts);
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/deleteCart/:id', fetchuser, async(req, res)=>{
    try{

        const cart = await Cart.findById(req.params.id);

        if(cart.userid.toString() != req.user.id)
        {
            return res.status(401).send("Not Allowed");
        }

        cart = await Cart.findByIdAndDelete(req.params.id);
        res.json({"Success": "Job has been Deleted Successfully", cart: cart});

    }

    catch(error){
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router