const express = require('express');
const { userAuth } = require('../middlewares/auth');
const { validateEditData, validateEditPassword } = require('../utils/validation');
const bcrypt = require('bcrypt');

const profileRouter = express.Router();


profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);

    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try{
        if(!validateEditData(req)){
            throw new Error ("invalid Edit Request ");
        };  

        const loggedInUser = req.user;
        console.log(loggedInUser);

        Object.keys(req.body).forEach((key)=>{loggedInUser[key] = req.body[key]})

        await loggedInUser.save();

        res.status(200).send("user details editted succeddfully");
        
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }
})

profileRouter.patch("/profile/password", userAuth, async(req,res)=>{
    try{
        if(validateEditPassword(req)){

            const {password} = req.body;

            const hashPass = await bcrypt.hash(password,10);
            const loggedInUser = req.user;
            loggedInUser.password = hashPass;
    
            await loggedInUser.save();
            res.status(200).send("password changed successfully");
        }
        else {
            throw new Error("Enter the strong passoword");
        }

    }
    catch(err){
        res.status(400).send("Error : "+err.message);

    }
})

module.exports = profileRouter;