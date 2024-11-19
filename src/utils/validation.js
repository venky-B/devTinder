// import validator from "validator";
const validator = require("validator")

const validateSignUpData = (req) => {
    const {firstName,lastName,emailId,password } = req.body;

    if(!firstName || !lastName) throw new Error("Invalid user name")

    else if (!validator.isEmail(emailId)) throw new Error("Invalid email");

    else if(!validator.isStrongPassword(password)) throw new Error("Enter the strong password");

};

module.exports = {validateSignUpData};