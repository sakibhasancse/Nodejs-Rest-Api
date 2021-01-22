import { errorResponse, notFound, success, validationError, validationErrorWithData, successWithData } from '../helpers/apiResponse'
import Book from '../models/book'
import mongoose from 'mongoose'
import { validationResult } from 'express-validator'


/**
 * Create Book.
 *
 * @param {string}      name
 * @param {string}      authors
 * @param {string}      publisher
 *
 * @returns {Object}
 */


export const createBook = async (req, res) => {
    const body = req.body
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return validationErrorWithData(res, 'Validation error', errors.array())
        }

        const newBook = new Book(body)
        await newBook.save((err, book) => {
            if (err) {

                //throw error in json response with status 400. 
                return validationError(res, err)
            } else {

                return success(res, 'Book Created successfully')

            }

        })
    } catch (error) {
        console.log(error)

        return errorResponse(res, error);
    }


}



/**
 * Book List.
 * 
 * @returns {Object}
 */
export const BookList = async (req, res) => {
    try {
        await Book.find((err, book) => {
            if (err) {
                //throw error in json response with status 400. 

                return validationError(res, err)
            } else {
                return successWithData(res, 'All Books', book)
            }
        })


    } catch (error) {
        //throw error in json response with status 500. 
        return errorResponse(res, error)
    }
};



/**
 * single Book Details
 *
 *@param{string} id
 *
 *@returs {Object}
 */

export const singleBook = async (req, res) => {
    const id = req.params.bookId
    var isValid = mongoose.Types.ObjectId.isValid(id)

    if (!isValid) {
        return validationError(res, 'Book id is not valid')

    }
    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return validationError(res, 'validation Error', errors.array())
        }


        await Book.findById(id, (err, book) => {
            if (err) {
                //throw error in json response with status 400. 

                return validationError(res, err)
            } else {
                return successWithData(res, 'Single Book', book)
            }
        })

    } catch (error) {
        //throw error in json response with status 500. 
        return errorResponse(res, error);
    }
}



/**
 * Book update.
 * 
 * @param {string}      name 
 * @param {string}      authors
 * @param {string}      publisher
 * 
 * @returns {Object}
 */

export const updateBook = async (req, res) => {
    const id = req.params.bookId
    var isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) {
        return validationError(res, 'Book id is not valid')

    }
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return validationErrorWithData(res, 'validation Error', errors.array().message)
        } else {
            await Book.findById(id, (err, book) => {
                if (!book || book === undefined || book === null) {
                    return notFound(res, "Book not exists with this id");
                } else {
                    Book.findByIdAndUpdate(id, req.body, (err, result) => {
                        if (err) {
                            return validationError(res, err)
                        } else {
                            return success(res, 'Book update successfully')
                        }
                    })
                }
            })

        }

    } catch (error) {
        return errorResponse(res, error);

    }

}


/**
 * Book Delete.
 * 
 * @param {string}  id
 * 
 * @returns {Object}
 */


export const deleteBook = async (req, res) => {
    const id = req.params.bookId
    var isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) {
        return validationError(res, 'Book id is not valid')

    }
    try {

        await Book.findById(id, (err, book) => {
            if (!book || book === undefined || book === null) {
                return notFound(res, "Book not exists with this id");
            } else {
                Book.deleteOne({ "_id": id }, (err, result) => {
                    if (err) {
                        return validationError(res, err)

                    } else {

                        return success(res, 'Book deleted successfully')
                    }
                })
            }
        })

    } catch (error) {
        return errorResponse(res, error);
    }
}
