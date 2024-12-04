const express = require('express');
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

app.get("/user", async(req,res)=>{

    const userEmail = req.body.emailId;

    try{
        const users = await User.findOne({emailId : userEmail})
        res.send(users);

    }
    catch(err){
        res.send("Error " + err.message);

    }

})
app.delete("/user", async(req,res)=>{
   const userId =  req.body.userId;
   try{
    const users = await User.findByIdAndDelete({_id:userId});
    //const users = await User.findByIdAndDelete(userId);
    if(users) res.send(users);
    else res.send("There is nothting to delete");
    
}
catch(err){
    res.status(400).send("Something went wrong : " + err.message);
}
    
})
app.patch("/user/:userId",async(req,res)=>{

    const userId = req.params.userId;
    const data = req.body;

 
    try{
        const ALLOWED_UPDATES = ["userId","firstName","password","age","gender"];
        const isUpdateAllowed = Object.keys(data).every(k=>ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
    
      
        const updateVal = await User.findOneAndUpdate({_id:userId},data,{returnDocument:"after"})
        console.log(updateVal);
        res.send(updateVal);
    }
    catch(err){
        res.send("Something went wrong : " + err.message)
    }
})


const startServer = async () => {
    try {
        await connectDB();
        console.log("DB connection established successfully");
        app.listen(7777,()=>{console.log("Hello listening to port 7777")});
        // console.log(connectDB());


    }
    catch(err){
        console.error("Error : " + err.message);
    }
};

startServer();


// connectDB()
// .then(()=>{
//     console.log(connectDB());
//     console.log("DB connection established successfully");
//     console.log(connectDB());
//     app.listen(7777,()=>{console.log("Hello listening to port 7777")});
// })
// .catch((err)=>{console.log("DB connection failed")});

