const mongoose = require('mongoose');

const connectDB = async ()=>{ 
    await mongoose.connect("mongodb+srv://rajuvenkatesh29:6tYJ1zHp6pzuggfM@venkycluster.s98ei.mongodb.net/DevTinder");
}

module.exports = connectDB;