const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        firstName:{ type : String },
        lastNamse:{ type : String },
        emailId: { type : String },
        password: { type : String },
        age: { type : Number},
        gender: { type : String},
    }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;