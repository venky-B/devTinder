const express = require('express');
const { userAuth } = require('../middlewares/auth');
const requestRouter = express.Router();

const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status =  req.params.status;

        const allowedStatus = ["intrested","ignored"];

        const toUser = await User.findById(toUserId);

        if(!toUser){
            return res.status(400).send({message: "User not found"});
        }

        if(fromUserId == toUserId){
            return res.status(400).send({message: "Connection request to same user is not possible"});

        }

        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status type: " + status });
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId,toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ],
        });

        if(existingConnectionRequest){
            return res.status(400).send({message : "Connection request already exist"});
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();

        res.json({message : req.user.firstName + " is " + req.params.status + " " +  toUser.firstName,data,});
    
    }
    catch(err){
        res.status(400).send("Error : "+ err.message);
    }

})

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user; 
        const {status, requestId} = req.params;
        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message : "wrong status"});
        }
        
        const connectionRequest = await ConnectionRequest.findOne({
            fromUserId: requestId,
            toUserId: loggedInUser._id,
            status: "intrested",
        });

        if(!connectionRequest){
            return res.status(404).json({ message: "Connection request not found" });
        }

        connectionRequest.status = status;

        const data  = await connectionRequest.save();

        res.json({message: `Connection request has been ${status} successfully.`,data,});

    }
    catch(err){
        res.status(500).json({ message: `An error occurred: ${err.message}` });
    }
})

module.exports = requestRouter;
