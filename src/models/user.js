const mongoose = require('mongoose');
const validator =  require('validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        firstName:{ 
            type : String,
            maxLength : 50,
            index :true
            
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
            enum : {
                values : ["amle","female","others"],
                message : `{VALUE} is incorrect value`
            }
            }
            // validate(value){
            //    if(!["male","female","others"].includes(value))
            //     throw new error("Gender Data is not valid");
            //    }
        },
        {
            timestamps : true,
        }
);

userSchema.methods.getJWT  = async function () {

    const user = this;

    const token = await jwt.sign({_id : this._id}, "Venkymon@29");

    return token;

}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password

    const isValidatePassword  = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isValidatePassword;

}



const User = new mongoose.model("User", userSchema);

module.exports = User;