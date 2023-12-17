const validate = require("../validation/validator")
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// emailId
// firstName
// lastName
// mobileNo
// password
// role

//---------------------------------------------------------------------------------------
const createUser = async function (req, res) {

  try {
    const requestBody = req.body;
    const {  emailId,firstName,lastName,mobileNo,password,role } = requestBody
   
    const isEmailAlreadyUsed = await userModel.findOne({ emailId: emailId }); 

    if (isEmailAlreadyUsed) {
      res.status(400).send({ status: false, message: `${emailId} email address is already registered` })
      return
    }
    const encryptedPassword = await bcrypt.hash(password, 10) //encrypting password by using bcrypt.

    let data={
      emailId,
      firstName,
      lastName,
      mobileNo,
      password:encryptedPassword,
      role
    }
    const createUserData = await userModel.create(data)
    res.status(201).send({ status: true, message: " User successfully created", data: createUserData })

  } catch (err) {
    res.status(500).send({ status: false, message: err.message })
  }
}
//---------------------------------------------------------------------------------------------------------------//

const loginUser = async function (req, res) {
  try {
    const requestBody = req.body;
    // Extract params
    const { email, password } = requestBody;

    // Validation starts
    if (!validate.isValid(email)) {
      res.status(400).send({ status: false, message: `Email is required` })
      return
    }

    if (!validate.validateEmail(email)) {
      res.status(400).send({ status: false, message: `Email should be a valid email address` })
      return
    }

    if (!validate.isValid(password)) {
      res.status(400).send({ status: false, message: `Password is required` })
      return
    }
    if (!validate.validatePassword(password)) {
      res.status(400).send({ status: false, message: 'password should be between 8 and 15 characters' })
      return
    }
    // Validation ends

    const user = await userModel.findOne({ emailId: email });

    if (!user) {
      res.status(401).send({ status: false, message: `Invalid login credentials` });
      return
    }

    console.log(user);
    let hashedPassword = user.password
    const encryptedPassword = await bcrypt.compare(password, hashedPassword) //converting normal password to hashed value to match it with DB's entry by using compare function.

    if (!encryptedPassword) return res.status(401).send({ status: false, message: `Login failed! password is incorrect.` });

    const token = await jwt.sign({
      userId: user._id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 1800
    }, 'soramoki')


    res.header('token', token);
    res.status(200).send({ status: true, message: `user login successfull`, token: token ,userDetails:user });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}

const getuser = async (req,res)=>{
  try {
    let data = await userModel.find()
    res.send({Message:"All User Get Successfully",data:data})
  } catch (error) {
    res.send({Message:error.message})
  }
}

const updateuser = async function (req, res) {
  try {
   
      const {firstName,lastName,emailId,mobileNo,role,id} = req.body
     

      if (!validate.isValidRequestBody(req.body)) {
          res.status(400).send({ status: false, message: 'Please provide paramateres to update User' })
          return
      }

    

console.log(req.body)

      const updatedUserData = {
          firstName,
          lastName,
          emailId,
          mobileNo,
          role
      }
      const updateuser = await userModel.findOneAndUpdate({ _id: id }, updatedUserData, { new: true })

      res.status(200).send({ status: true, message: 'User updated successfully' });
  } catch (error) {
      res.status(500).send({ status: false, message: error.message });
  }
}

const deleteUsers = async function (req, res) {
  try {
    const {id} = req.body

    const deleteUsers = await userModel.findOneAndDelete({ _id: id })

if(!deleteUsers) {
    res.status(404).send({ status: false, Message: "User not found" })
    return
}
      res.status(200).send({ status: true, Message: "User has been deleted successfully" })
      

  } catch (error) {
      res.status(500).send({ status: false, Message: error.message })
  }
};

const updateuserPassword = async function (req, res) {
  try {
   
      const {newPassword,confirmPassword,emailId} = req.body
     

      if (!validate.isValidRequestBody(req.body)) {
          res.status(400).send({ status: false, message: 'Please provide paramateres to update User' })
          return
      }

    

console.log(req.body)

      const updatedUserData = {
       password:newPassword
      }
      const updateuserPassword = await userModel.findOneAndUpdate({ emailId: emailId }, updatedUserData, { new: true })

      res.status(200).send({ status: true, message: 'User Password updated successfully' });
  } catch (error) {
      res.status(500).send({ status: false, message: error.message });
  }
}

module.exports = { createUser, loginUser,getuser,updateuser,deleteUsers,updateuserPassword }
