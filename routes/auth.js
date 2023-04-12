const express= require('express');
const router=express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt= require('jsonwebtoken');
var fetchuser= require('../middleware/fetchuser');
const { findOne } = require('../models/User');

// Route : 1 Creating User using POST "/api/auth/createuser" 
router.post("/createuser", [
        body('name','Enter a valid name').isLength({ min: 3 }),
        body('email','Enter a valid email').isEmail(),
        body('password','Enter a valid password').isLength({ min: 5 })
    ] ,
    async (req,res)=>{
        let success=false;
        const JWT_SECRET='AbhiIsGoodB$oy'; 
        // If there are any errors , return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }
        try {
            // check whether the user with same email exists already
            let user= await User.findOne({email:req.body.email});
            if(user){
                return res.status(400).json({success,error:"Sorry this email already exists"})
            }
            // Encrypting password
            const salt= await bcrypt.genSalt(10)
            const secPass= await bcrypt.hash(req.body.password,salt);
            // Create new User
            user= await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            })
            // Response
            const data={
                user:{
                    id:user.id
                }
            }
            success=true;
            const authToken= jwt.sign(data,JWT_SECRET);
            res.send({success,authToken});
        } 
        catch (error) {
            console.error(error);
            res.status(500).send("Some error has occured");
        }
    }
)


// Route : 2 Login and Authenticate a User using POST "/api/auth/login" 
router.post("/login", [
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').exists(),
] , 
async (req,res)=>{
    const JWT_SECRET='AbhiIsGoodB$oy';
    let success=false;
    // If there are any errors , return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {
        // check whether the user with same email exists already
        let user= await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({success,error:"Please login with correct credentials"})
        }

        // Finding the Authenticated User
        const {email,password} =req.body;
        const pswdCompare= await bcrypt.compare(password,user.password);
        if(!pswdCompare){
            return res.status(400).json({success,error:"Please login with correct credentials"})
        }
        // Response
        const data={
            user:{
                id:user.id
            }
        }
        const authToken= jwt.sign(data,JWT_SECRET);
        success=true;
        res.send({success,authToken});
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error has occured");
    }
}
)


// Route : 3 Login and Authenticate a User using POST "/api/auth/getuser" 
router.post("/getuser", fetchuser , async (req,res)=>{

    try {
        const userId=req.user.id;
        const user= await User.findById(userId).select('-password');
        res.send(user);
    }
    
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error has occured");
    }

})

module.exports = router