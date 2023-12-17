const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('department', departmentSchema)