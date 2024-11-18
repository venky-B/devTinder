const mongoose = require('mongoose');
const validator =  require('validator');

const userSchema = new mongoose.Schema(
    {
        firstName:{ 
            type : String,
            maxLength : 50,
            
         },
        lastName:{ type : String },
        emailId: { 
            type : String,
            lowercase : true,
            required : true,
            unique : true,
            trim : true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email address: " + value);
                }
            },
         },
        password: { 
            type : String,
            required : true,
         },
        age: { 
            type : Number,
            min : 18
        },
        gender: { 
            type : String,
            validate(value){
               if(!["male","female","others"].includes(value))
                throw new error("Gender Data is not valid");
               }
            }
        },
        {
            timestamps : true,
        }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;