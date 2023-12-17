const toDoListModel = require('../models/toDoListModel')


const createTask = async  (req, res) => {
    try {
        const { taskName,status } = req.body;
       
       
        const istaskNameUsed = await toDoListModel.findOne({ taskName: taskName});
        if (istaskNameUsed) {
            res.status(400).send({ status: false, message: `${taskName} task already Added` })
            return
        }
        
        // Validation ends
        const TaskData = await toDoListModel.create(req.body);
        res.status(201).send({ status: true, message: ' Task creates Successfully', data: TaskData })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const getTasks = async (req,res)=>{
    try {
      let data = await toDoListModel.find()
      res.send({Message:"All Tasks Get Successfully",data:data})
    } catch (error) {
      res.send({Message:error.message})
    }
  }
  
  const updateTask = async (req, res)=> {
    try {
     
        const {taskName,status,id} = req.body

       
  
        // if (!req.body) {
        //     res.status(400).send({ status: false, message: 'Please provide paramateres to update Task' })
        //     return
        // }
  
      
  
  console.log(req.body)
  
        const updatedUserData = {
            taskName,
            status,
            id
        }
        const updateTask = await toDoListModel.findOneAndUpdate({ _id: id }, updatedUserData, { new: true })
  
        res.status(200).send({ status: true, message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
  }
  
  const deleteTask = async function (req, res) {
    try {
      const {id} = req.body
  
      const deleteTask = await toDoListModel.findOneAndDelete({ _id: id })
  
  if(!deleteTask) {
      res.status(404).send({ status: false, Message: "Task not found" })
      return
  }
        res.status(200).send({ status: true, Message: "Task has been deleted successfully" })
        
  
    } catch (error) {
        res.status(500).send({ status: false, Message: error.message })
    }
  };


module.exports = { createTask, getTasks, updateTask, deleteTask }



