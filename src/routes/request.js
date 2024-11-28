const express = require('express');
const { userAuth } = require('../middlewares/auth');
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async(req,res)=>{
    try{
    res.send("Sent Connection Request ");
    }
    catch(err){
        res.status(400).send("Error : "+ err.message);
    }
})


module.exports = requestRouter;
