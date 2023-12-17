const moment = require('moment')
const bookModel = require("../models/bookModel")
// const reviewModel = require("../models/reviewModel.js");
// const userModel = require("../models/userModel")
const validate = require("../validation/validator")


// const createBook = async function (req, res) {
//     try {
//         const requestBody = req.body;

//         const { authour, bookPrice ,bookcategory,booktitle,reviews, } = requestBody;
       
//         const isTitleAlreadyUsed = await bookModel.findOne({ booktitle: booktitle});
//         if (isTitleAlreadyUsed) {
//             res.status(400).send({ status: false, message: `${booktitle} title is already registered` })
//             return
//         }
        
//         // Validation ends
//         const bookData = await bookModel.create(req.body);
//         res.status(201).send({ status: true, message: ' Book creates Successfully', data: bookData })

//     } catch (error) {
//         res.status(500).send({ status: false, msg: error.message })
//     }

// };
// //---------------------------------------- get books ----------------------------------------------------------//
// const getBooks = async function (req, res) {
//     try {

//         const filterQuery = { isDeleted: false }
//         const queryParams = req.query
//         const {  booktitle,  bookcategory,  reviews, bookprice,
//             // userId
//          } = queryParams

//         // if (validate.isValid(userId) && validate.isValidObjectId(userId)) {
//         //     filterQuery['userId'] = userId
//         // }

//         if (validate.isValid(bookcategory)) {
//             filterQuery['bookcategory'] = bookcategory.trim()
//         }

//         if (validate.isValid(reviews)) {
//             filterQuery['reviews'] =  reviews.trim()
//         }
//         const books = await bookModel.find(filterQuery).sort({ booktitle: 1 }).select("_id booktitle bookcategory reviews")
//         if (Array.isArray(books) && books.length === 0) {
//             res.status(404).send({ status: false, message: 'No books found' })
//             return
//         }

//         res.status(200).send({ status: true, message: 'book list', data: books })

//     } catch (error) {
//         res.status(500).send({ status: false, message: error.message });
//     }
// };
// //----------------------------------------------book details by bookId------------------------------------------------//

// const bookDetails = async function (req, res) {
//     try {
//         let reqBookId = req.params.bookId
       

//         if (!validate.isValidObjectId(reqBookId)) {
//             res.status(404).send({ status: false, msg: 'plz provide valid Book id' })
//         }

//         // let bookData = await bookModel.findOne({ _id: reqBookId, isDeleted: false }).select({ ISBN: 0, __v: 0 })
//         // if (!bookData) {
//         //     res.status(404).send({ status: false, msg: 'book not found for the requested BookId' })
//         // }

//         let fetchReviews = await reviewModel.find({ bookId: reqBookId, isDeleted: false }).select("bookId reviewedBy reviewedAt rating review ")

//         const responseData = bookData.toObject()
//         responseData['reviewsData'] = fetchReviews

//         res.status(200).send({ status: true, message: 'Success', data: responseData })

//     } catch (error) {
//         res.status(500).send({ status: false, msg: error.message })
//     }

// };
// //------------------------------------------------------update book--------------------------------------------------//

// const updateBook = async function (req, res) {
//     try {
//         const requestBody = req.body
//         const bookId = req.params.id
//         const userIdFromToken = req.userId

//         // Validation stats
//         if (!validate.isValidObjectId(bookId)) {
//             res.status(400).send({ status: false, message: `${bookId} is not a valid bookId id` })
//             return
//         }
//         const book = await bookModel.findOne({ _id: bookId, isDeleted: false, deletedAt: null })
//         if (!book) {
//             res.status(404).send({ status: false, message: `book not found` })
//             return
//         }
//         if (book.userId.toString() != userIdFromToken) {
//             res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });
//             return
//         }
//         if (!validate.isValidRequestBody(requestBody)) {
//             res.status(400).send({ status: false, message: 'Please provide paramateres to update perticular Book' })
//             return
//         }

//         // Extract body
//         const {  booktitle,  bookcategory,  reviews, bookprice,
//             // userId
//          } = requestBody;

//         const updatedBookData = {}

//         if (validate.isValid(title)) {
//             const isTitleAlreadyUsed = await bookModel.findOne({ booktitle: booktitle.trim() });

//             if (isTitleAlreadyUsed) {
//                 res.status(400).send({ status: false, message: `title is already registered` })
//                 return
//             }
//             updatedBookData['booktitle'] = booktitle.trim()
//         }

//         // if (validate.isValid(excerpt)) {

//         //     updatedBookData['excerpt'] = excerpt.trim()
//         // }


//         // if (validate.isValid(ISBN)) {
//         //     if (!validate.validateISBN(ISBN)) {
//         //         res.status(400).send({ status: false, message: 'plz provide valid Book ISBN' })
//         //         return
//         //     }
//         //     const isISBNalreadyUsed = await bookModel.findOne({ ISBN: ISBN.trim() })
//         //     if (isISBNalreadyUsed) {
//         //         res.status(400).send({ status: false, message: ` ISBN  is already registered` })
//         //         return
//         //     }
//         //     updatedBookData['ISBN'] = ISBN.trim()
//         // }

//         // if (validate.isValid(releasedAt)) {
//         //     updatedBookData['releasedAt'] = moment(releasedAt).toISOString()
//         // }

//         const updatedBook = await bookModel.findOneAndUpdate({ _id: bookId }, updatedBookData, { new: true })

//         res.status(200).send({ status: true, message: 'Book updated successfully', data: updatedBook });
//     } catch (error) {
//         res.status(500).send({ status: false, message: error.message });
//     }
// }

// //-----------------------------------------------------delete book------------------------------------------------//

// let deleteBook = async function (req, res) {
//     try {
//         const bookId = req.params.bookId
//         const userIdFromToken = req.userId
       

//         if (!(validate.isValid(bookId) && validate.isValidObjectId(bookId))) {
//             return res.status(400).send({ status: false, msg: "bookId is not valid" })
//         }
//         const book = await bookModel.findOne({ _id: bookId })
//         if (!book) {
//             res.status(404).send({ status: false, message: `id don't exist in book collection` })
//             return
//         }

//         if (book.userId.toString() != userIdFromToken) {
//             res.status(401).send({ status: false, message: `Unauthorized access! Owner info doesn't match` });
//             return
//         }

//         let deletedBook = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false, deletedAt: null },
//             { isDeleted: true, deletedAt: new Date() }, { new: true })

//         if (!deletedBook) {
//             res.status(404).send({ status: false, msg: "either the book is already deleted or you are not valid user to access this book" })
//             return
//         }
//         res.status(200).send({ status: true, msg: "Book has been deleted" })
//     } catch (error) {
//         res.status(500).send({ status: false, msg: error.message })
//     }
// };

const createBook = async  (req, res) => {
    try {
        const { authour, bookPrice ,bookcategory,booktitle,reviews, } = req.body;
       
        const isTitleAlreadyUsed = await bookModel.findOne({ booktitle: booktitle});
        if (isTitleAlreadyUsed) {
            res.status(400).send({ status: false, message: `${booktitle} title is already registered` })
            return
        }
        
        // Validation ends
        const bookData = await bookModel.create(req.body);
        res.status(201).send({ status: true, message: ' Book creates Successfully', data: bookData })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const getBooks = async (req,res)=>{
    try {
      let data = await bookModel.find()
      res.send({Message:"All Books Get Successfully",data:data})
    } catch (error) {
      res.send({Message:error.message})
    }
  }
  
  const updateBook = async (req, res)=> {
    try {
     
        const {booktitle,id} = req.body
       
  
        if (!validate.isValidRequestBody(req.body)) {
            res.status(400).send({ status: false, message: 'Please provide paramateres to update book' })
            return
        }
  
      
  
  console.log(req.body)
  
        const updatedUserData = {
            booktitle,
            id
        }
        const updateBook = await bookModel.findOneAndUpdate({ _id: id }, updatedUserData, { new: true })
  
        res.status(200).send({ status: true, message: 'Book updated successfully' });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
  }
  
  const deleteBook = async function (req, res) {
    try {
      const {id} = req.body
  
      const deleteBook = await bookModel.findOneAndDelete({ _id: id })
  
  if(!deleteBook) {
      res.status(404).send({ status: false, Message: "Book not found" })
      return
  }
        res.status(200).send({ status: true, Message: "Book has been deleted successfully" })
        
  
    } catch (error) {
        res.status(500).send({ status: false, Message: error.message })
    }
  };


module.exports = { createBook, getBooks, updateBook, deleteBook }



