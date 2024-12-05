const express = require("express");
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

const USER_SAFE_DATA = ["firstName", "lastName"];

userRouter.get("/user/requests/received", userAuth, async(req,res)=>{

    try{
        const loggedInUser = req.user;
        const data = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "intrested"
        }).populate("fromUserId", USER_SAFE_DATA  ).populate("toUserId", USER_SAFE_DATA );
        if(data.length == 0){
            return res.status(404).json({message: "No request available"});
        }
    
        res.status(200).json({message : "Available request ",data});
        
    }
    catch(err){
        res.status(400).json({message: message.error});

    }
   

})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{

        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {fromUserId : loggedInUser._id, status :"accepted"},
                {toUserId : loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

       const data = connectionRequest.map(row => {
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
            return row.toUserId;
            
        }
        return row.fromUserId
    });

        res.status(200).json({data : data});
       

    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

module.exports = userRouter;