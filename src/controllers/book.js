import { errorResponse, success, validationError } from '../helpers/apiResponse'
import Book from '../models/book'


/**
 * Book List.
 * 
 * @returns {Object}
 */
exports.bookList = async (req, res) => {
    try {
        await Book.find((err, book) => {
            if (err) {
                //throw error in json response with status 400. 

                return validationError(res, err)
            } else {
                return success(res, 'All Books', book)
            }
        })


    } catch (error) {
        //throw error in json response with status 500. 
        return errorResponse(res, error)
    }
};


/**
 * Book Details
 *
 *@param{string} id
 *
 *@returs {Object}
 */

exports.singleBook = async (req, res) => {
    try {
        const id = req.param.bookId
        await Book.findById(id, (err, book) => {
            if (err) {
                //throw error in json response with status 400. 

                return validationError(res, err)
            } else {
                return success(res, 'Single Book', book)
            }
        })

    } catch (error) {
        //throw error in json response with status 500. 
        return errorResponse(res, error);
    }
}



/**
 * Create Book.
 *
 * @param {string}      name
 * @param {string}      authors
 * @param {string}      publisher
 *
 * @returns {Object}
 */



exports.createBook = async (req, res) => {
    try {
        const { name, authors, publisher } = req.body
        const newBook = new Book(name, authors, publisher)
        await newBook.save((err, book) => {
            if (err) {
                //throw error in json response with status 400. 

                return validationError(res, err)
            } else {
                return success(res, 'Book Created successfully', book)
            }

        })
    } catch (error) {
        return errorResponse(res, error);
    }


}