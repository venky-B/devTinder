let express = require('express');

const app = express();

app.use("/rajubhai", (req,res)=>(res.send("Hi raju Bhai !! you are the super user ")))
app.use("/",(req,res)=>{res.send("Hello from the server")})

app.listen(7777,()=>{console.log("Hello listening to port 7777")});