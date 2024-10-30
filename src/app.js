let express = require('express');

const app = express();

//use work in any method
app.use("/rajubhai", (req,res)=>{res.send("Hi raju Bhai !! you are the super user ")})

//get works only in get method trying in others shows error.
app.get("/user",(req,res)=>{res.send("This is using GET method")})

app.post("/user",(req,res)=>{res.send({firstName: "Venkatesh", lastName: 'B'})})

app.use("/",(req,res)=>{res.send("Hello from the server")})

app.listen(7777,()=>{console.log("Hello listening to port 7777")});