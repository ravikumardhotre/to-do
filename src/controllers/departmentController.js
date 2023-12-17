const departmentModel = require("../models/departmentModel")
const validate = require("../validation/validator")
const createDepartment = async function (req, res) {

    try {
        const requestBody = req.body;
        const {  department } = requestBody
       
        const isDepartmentreadyUsed = await departmentModel.findOne({ department: department }); 
    
        if (isDepartmentreadyUsed) {
          res.status(400).send({ status: false, message: `${department} Department is already registered` })
          return
        }
        
    
        let data={
            department
        }
        const createDepartment = await departmentModel.create(data)
        res.status(201).send({ status: true, message: " Department successfully created", data: createDepartment })
    
      } catch (err) {
        res.status(500).send({ status: false, message: err.message })
      }
    }

 const getDepartment = async (req,res)=>{
        try {
          let data = await departmentModel.find()
          res.send({Message:"All User Get Successfully",data:data})
        } catch (error) {
          res.send({Message:error.message})
        }
      }

const updateDepartment = async function (req, res) {
        try {
         
            const {department,id} = req.body
           
      
            if (!validate.isValidRequestBody(req.body)) {
                res.status(400).send({ status: false, message: 'Please provide paramateres to update Department' })
                return
            }
      
      
            const updateDepartmentData = {
                department  :req.body.department 
            }
            const updateDepartment = await departmentModel.findOneAndUpdate({ _id: id }, updateDepartmentData, { new: true })
      
            res.status(200).send({ status: true, message: 'Department updated successfully' });
            console.log(updateDepartment)
        } catch (error) {
            res.status(500).send({ status: false, message: error.message });
        }
      }

const deleteDepartment = async function (req, res) {
        try {
          const {department,id} = req.body
          console.log('====================================');
          console.log(req.body.id);
          console.log('====================================');
      
          const deleteDepartment = await departmentModel.findOneAndDelete({ id: req.body._id })
      
      if(!deleteDepartment) {
          res.status(400).send({ status: false, Message: "Department not found" })
          return
      }
            res.status(200).send({ status: true, Message: "Department has been deleted successfully" })
            
      
        } catch (error) {
            res.status(500).send({ status: false, Message: error.message })
        }
      };
  module.exports = {
    createDepartment,getDepartment,updateDepartment,deleteDepartment
  }