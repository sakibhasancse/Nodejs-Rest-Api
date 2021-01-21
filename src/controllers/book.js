import { errorResponse, notFound, success, validationError } from '../helpers/apiResponse'
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
    try {
        const { name, authors, publisher } = req.body
        const errors = validationError(req)
        if (!errors.isEmpty()) {
            return validationError(res, 'Validation Error', errors.array())
        }
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



/**
 * Book List.
 * 
 * @returns {Object}
 */
export const bookList = async (req, res) => {
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
