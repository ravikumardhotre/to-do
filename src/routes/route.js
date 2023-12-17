const express = require('express');
const router = express.Router();

const bookController= require('../controllers/bookController')
const reviewController= require('../controllers/reviewController')
const userController= require('../controllers/userController')
const middleware = require('../middleware/loginmiddle')
const departmentController = require('../controllers/departmentController')
const categoryController = require('../controllers/categoryController')
const studentController = require('../controllers/studentController')
const toDoListController = require('../controllers/toDoListController')


//user api 
 router.post("/register", userController.createUser)
 router.post("/login", userController.loginUser)
 router.get("/getusers",userController.getuser)
 router.put("/updateuser", userController.updateuser)
 router.post("/deleteUsers",userController.deleteUsers)
 router.post("/updateuserPassword",userController.updateuserPassword)


// //book api
//  router.post("/createbooks" ,bookController.createBook)
//  router.get("/getBooks", bookController.getBooks)
//  router.get("/books/:bookId",middleware ,bookController.bookDetails)
//  router.put("/updateBook",bookController.updateBook)
//  router.delete("/deleteBook",middleware ,bookController.deleteBook)

router.post("/createbook",bookController.createBook)
router.get("/getBooks", bookController.getBooks)
router.put("/updateBook",bookController.updateBook)
router.delete("/deleteBook",bookController.deleteBook)

//student api
router.post("/createStudent",studentController.createStudent)
router.get("/getStudent", studentController.getStudent)
router.put("/updateStudent",studentController.updateStudent)
router.post("/deleteStudent",studentController.deleteStudent)


//Task api
router.post("/createTask",toDoListController.createTask)
router.post("/getTask", toDoListController.getTasks)
router.put("/updateTask",toDoListController.updateTask)
router.post("/deleteTask",toDoListController.deleteTask)




// //review api
 router.post("/books/:bookId/review" , reviewController.createReview)
 router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)
 router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReview)


 //Department api
 router.post("/createDepartment", departmentController.createDepartment)
 router.get("/getDepartment", departmentController.getDepartment)
 router.post("/updateDepartment", departmentController.updateDepartment)
 router.delete("/deleteDepartment", departmentController.deleteDepartment)

 
// //category api
router.post("/createCategory" , categoryController.createCategory)
router.get("/getCategory" , categoryController.getCategory)
router.put("/updateCategory",categoryController.updateCategory)
router.delete("/deleteCategory",categoryController.deleteCategory)

module.exports = router;