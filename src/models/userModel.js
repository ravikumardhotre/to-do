const mongoose = require("mongoose")
const validate = require("../validation/validator")


const userSchema = new mongoose.Schema({


    firstName: { type: String, required: true, trim:true},
    lastName: { type: String, required: true,trim:true},

    emailId: {
        type: String, required: true, unique: true,trim:true
    },
    password: { type: String, required: true,trim:true },
    role: { type: String, required: true,trim:true },
    mobileNo: { type: String, required: true,trim:true },

    // address: {
    //     street: { type: String,trim:true },
    //     city: { type: String,trim:true },
    //     pincode: { type: String,trim:true }
    // },
    // emailId
// firstName
// lastName
// mobileNo
// password
// role
},{ timestamps: true })


module.exports = mongoose.model('user', userSchema)