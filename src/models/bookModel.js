const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema({


    booktitle: { type: String,},
    // excerpt: { type: String, required: true ,trim:true },
    // userId: { type: ObjectId, required: true,trim:true, ref: "user" },
    authour: { type: String, },
    bookcategory: { type: String, },
    // subcategory: { type: Array, required: true },
    reviews: { type: Number },
    bookprice: { type: String,  },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    // releasedAt: { type: Date, required: true, format: "YYYY-MM-DD" },
}, { timestamps: true })


    module.exports = mongoose.model('books', bookSchema)

