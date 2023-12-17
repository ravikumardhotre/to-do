const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  collageName: {
    type: String,
    required: true,
  },
  className: {
    type: String
  },
  city:{
    type: String
  },

  joinedAt: { type: Date, required: true },




});


module.exports = mongoose.model("student", studentSchema);