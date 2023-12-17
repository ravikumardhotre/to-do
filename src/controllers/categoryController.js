const categoryModel = require("../models/categoryModel")
const validate = require("../validation/validator")
const createCategory = async function (req, res) {

    try {
        const requestBody = req.body;
        const {  category } = requestBody
       
        const isCategoryreadyUsed = await categoryModel.findOne({ category: category }); 
    
        if (isCategoryreadyUsed) {
          res.status(400).send({ status: false, message: `${category} Category is already registered` })
          return
        }
        
    
        let data={
            category
        }
        const createCategory = await categoryModel.create(data)
        res.status(201).send({ status: true, message: " Category successfully created", data: createCategory })
    
      } catch (err) {
        res.status(500).send({ status: false, message: err.message })
      }
    }

 const getCategory = async (req,res)=>{
        try {
          let data = await categoryModel.find()
          res.send({Message:"All Category Get Successfully",data:data})
        } catch (error) {
          res.send({Message:error.message})
        }
      }

const updateCategory = async function (req, res) {
        try {
         
            const {category,id} = req.body
           
      
            if (!validate.isValidRequestBody(req.body)) {
                res.status(400).send({ status: false, message: 'Please provide paramateres to update Category' })
                return
            }
      
      
            const updateCategoryData = {
                category  :req.body.category 
            }
            const updateCategory = await categoryModel.findOneAndUpdate({ _id: id }, updateCategoryData, { new: true })
      
            res.status(200).send({ status: true, message: 'Category updated successfully' });
            console.log(updateCategory)
        } catch (error) {
            res.status(500).send({ status: false, message: error.message });
        }
      }

const deleteCategory = async function (req, res) {
        try {
          const {Category,id} = req.body
          console.log('====================================');
          console.log(req.body.id);
          console.log('====================================');
      
          const deleteCategory = await categoryModel.findOneAndDelete({ id: req.body._id })
      
      if(!deleteCategory) {
          res.status(400).send({ status: false, Message: "Category not found" })
          return
      }
            res.status(200).send({ status: true, Message: "Category has been deleted successfully" })
            
      
        } catch (error) {
            res.status(500).send({ status: false, Message: error.message })
        }
      };
  module.exports = {
    createCategory,getCategory,updateCategory,deleteCategory
  }