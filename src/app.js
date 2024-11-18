const express = require('express');
// const { adminAuth } = require('./middlewares/auth');
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);

try {
    await user.save();
    res.send("user added successfully")
    
}
catch(err) {
    res.status(400).send("Error saving the user: " + err.message)
}
});

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


connectDB()
.then(()=>{
    console.log("DB connection established successfully");
    app.listen(7777,()=>{console.log("Hello listening to port 7777")});
})
.catch((err)=>{console.log("DB connection failed")});













/*

//middleware adminAuth to authonticate which handles for all methods GET, POST, PUT etc
app.use("/admin", adminAuth)

app.use("/admin/alluserdata", (req,res,next)=>{
   res.send("This is from alluserdata");
    next();
})

app.use("/admin/userDelete", (req,res,next)=>{
    res.send("This is from userDelete");
     next();
 })

//use work in any method
app.use("/rajubhai", (req,res)=>{res.send("Hi raju Bhai !! you are the super user ")})
app.post("/user",(req,res)=>{res.send({firstName: "Venkatesh", lastName: 'B'})})
// app.get("/user", (req, res) => {
//     console.log(req.query);
//     res.send({firstName: "Venkatesh", lastName: 'B'})
// });
app.get("/user/:userid", (req, res) => {
    console.log(req.params);
    res.send({firstName: "Raju", lastName: 'B'})
});

//get works only in get method trying in others shows error.
app.get("/user",[
    (req,res,next)=>{
        next();
    },
    (req,res,next)=>{
        next();
        res.send("This is using GET method 2")
    },
    (req,res)=>{
        res.send("This is using GET method 3")
    }
])

app.use("/",(req,res,next)=>{
    try{
        throw new Error("abcdefg");        
        res.send("Hello from the server root")
}
catch(err){
    next(err)
}
})
app.use("/",(err,req,res,next)=>{
    res.status(500).send("Error occured contact support");

})




*/
    
