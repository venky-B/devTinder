const express = require('express');
const {validateSignUpData}= require("../utils/validation");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validatePassword = require('../models/user');

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
    //validation of data
    validateSignUpData(req);
    const {firstName,lastName,emailId,password,age,gender} = req.body;

    //encrypt the password
    const hashPass = await bcrypt.hash(password,10);
    // console.log(hashPass);

    const user = new User({

            firstName,
            lastName,
            emailId,
            password : hashPass,
            age,
            gender

        });


    await user.save();
    res.send("user added successfully")
    
}
catch(err) {
    res.status(400).send("Error: " + err.message)
}
});

authRouter.post("/signin", async (req,res) => {
    try{
         const {emailId, password}= req.body;

         const user = await User.findOne({emailId :emailId });
         if(!user) throw new Error("Invalid credentials");
         
         const isValidPass =  await user.validatePassword(password);
         if(isValidPass){

            const token = await user.getJWT();
            res.cookie("token",token);

            res.send("login succesful");

         } 
         else throw new Error("Invalid credentials");
         
    }
    catch(err){
        res.status(400).send("ERROR :" + err.message);

    }
});

module.exports = authRouter;