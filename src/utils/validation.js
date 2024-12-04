// import validator from "validator";
const validator = require("validator")

const validateSignUpData = (req) => {
    const {firstName,lastName,emailId,password } = req.body;

    if(!firstName || !lastName) throw new Error("Invalid user name")

    else if (!validator.isEmail(emailId)) throw new Error("Invalid email");

    else if(!validator.isStrongPassword(password)) throw new Error("Enter the strong password");

};

const validateEditData = (req) =>{
    const allowedEditFields = ['firstName','lastName','gender','age'];

    console.log(req.body);

   const isEditAllowed =  Object.keys(req.body).every((field)=>{return allowedEditFields.includes(field)});

   console.log(isEditAllowed);

   return isEditAllowed;
   
}

const validateEditPassword = (req) => {
    const password = req.body.password;
        return validator.isStrongPassword(password)?1:0;
    
}

module.exports = {validateSignUpData, validateEditData,validateEditPassword};