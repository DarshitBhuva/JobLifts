const express = require('express');
const LocalStorage = require('node-localStorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
const User = require("../models/User");

var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// const fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Darshitisagoodboy';

const router = express.Router();

const token = "";

// Create a new user
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('confirm_password', 'Both Passowrd Must be same').isLength({min: 5})

], async (req, res) => {

    // If there are errors return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // check whether the user with this email already exist

        if(req.body.password != req.body.confirm_password)
        {
            return res.status(400).json({error: "Both Password Must be same"});
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exist" })
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            dob: req.body.dob,
            about: req.body.about
        
        })

        const data = {
            user:{
                id: user.id,
            }
        }

        console.log(data);
        const autotaken = jwt.sign(data, JWT_SECRET);
        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        // res.json({error: "Please enter a unique email id", message:err.message})});
        res.json(user);
        // res.json({autotaken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
    
    
})

// User Login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a password it can not be blank').exists(),
], async(req, res) => {
    
    const error = validationResult(req);

    if(!error.isEmpty())
    {
        return res.status(400).json({error: error.array()});
    }

    // Using Destructuring method of javascript
    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});

        if(!user){
            return res.status(400).json({error: "Please Enter Correct login Credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(400).json({error: "Please Enter Correct login Credentials"});
        }

        const data = {
            user:{
                id:user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        //res.json({authToken});
        localStorage.setItem('token', authToken);
        req.body.authtoken = authToken;
        res.json({'success' : req.body.authtoken});
    }
    catch(error){
        console.error(error.message);
        res.status(400).send("Internal server error");
    }
})

module.exports = router
// module.exports = token