import mongoose from 'mongoose'

const Book = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a Book Name'],
        trim: true,
        min: [2, 'Book Name can not be less then 2 characters'],
        maxlength: [100, 'Book Name can not be more then 100 characters']
    },
    authors: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add author ID'],
        ref: 'User',

    },
    publisher: {
        type: String

    }
}, { timeStamp: true })

const book = mongoose.model('Books', Book)
export default book