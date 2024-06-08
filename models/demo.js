const mongoose = require('mongoose');
const demoSchema=mongoose.Schema({
    name:String,
    age:Number,
    email:String,
});

module.exports = mongoose.model("demo",demoSchema);