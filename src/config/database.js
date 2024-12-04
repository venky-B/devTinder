const mongoose = require('mongoose');

const connectDB = async ()=>{ 
    try {
    await mongoose.connect("mongodb+srv://rajuvenkatesh29:6tYJ1zHp6pzuggfM@venkycluster.s98ei.mongodb.net/DevTinder");
    }
    catch(err){
        console.error("Error : " + err.message);
    }
}

module.exports = connectDB;