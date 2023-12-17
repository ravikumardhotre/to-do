const studentModel = require("../models/studentModel");

const createStudent = async (req, res) => {
  try {
    const { studentName, studentId, collageName, joinedAt,className,city } = req.body;
    const isIdAlreadyUsed = await studentModel.findOne({
      studentName: studentName,});
    if (isIdAlreadyUsed) {
      res
        .status(400)
        .send({ status: false, message: `${studentName} is already registered` });
      return;
    }

    const studentData = await studentModel.create(req.body);
    res
      .status(201)
      .send({
        status: true,
        message: "Student created successfully",
        data: studentData,
      });
  } catch (error) {
    res.status(500).send({ status: false, Message: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const City = require('country-state-city').City;
const cities= await City.getCitiesOfCountry("IN");
    let data = await studentModel.find();
    res.send({ Message: "All Student Get Successfully", data: data,cities: cities });
  } catch (error) {
    res.send({ Message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { studentName,collageName,studentId, id } = req.body;

    if ((!req.body)) {
      res.status(400)
        .send({ status: false, message: "Please provide studentName and Id" });
        return;
    }
const updatedStudentData = {
  studentName,
  collageName,
  studentId,
  id,
}
const updateStudent = await studentModel.findOneAndUpdate(
  { _id: id },updatedStudentData, { new: true })
  res.status(200).send({status:true,message:"Student Data updated successfully"})
}
catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}

const deleteStudent = async (req, res) => {
    try {
        const {id} = req.body
        const deleteStudent = await studentModel.findOneAndDelete({ _id: id })
    
    if(!deleteStudent) {
        res.status(404).send({ status: false, Message: "Student Data not found" })
        return
    }
          res.status(200).send({ status: true, Message: "Student  Data has been deleted successfully" })
          
    
      } catch (error) {
          res.status(500).send({ status: false, Message: error.message })
      }
    };

    module.exports={ createStudent,getStudent,updateStudent,deleteStudent}