let express = require('express');
const { adminAuth } = require('./middlewares/auth');

const app = express();

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

app.use("/",(req,res)=>{res.send("Hello from the server root")})

app.listen(7777,()=>{console.log("Hello listening to port 7777")});
