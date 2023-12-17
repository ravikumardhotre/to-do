const mongoose = require('mongoose');

const toDoListSchema = new mongoose.Schema({
    taskName:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }



})

module.exports = mongoose.model('toDoList',toDoListSchema)