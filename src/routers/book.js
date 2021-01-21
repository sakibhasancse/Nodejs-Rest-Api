

import express from 'express'
const router = express.Router()
import { body } from 'express-validator'
import { createBook, BookList, singleBook, updateBook, deleteBook } from '../controllers/book'

router.post('/book', [
    body('name', 'Please add a Book Name')
        .isLength({ min: 2, max: 100 })
        .withMessage('Book Name can not be Less than 2 characters and more than 100 characters').trim(),
    body('authors', 'Please add author ID').isLength({ min: 1 }).trim(),
    body('publisher', 'Please add publisher Name').isLength({ min: 1 }).trim(),

], createBook)

router.get('/books', BookList)
router.get('/book/:bookId', singleBook)
router.patch('/book/:bookId', updateBook)
router.delete('/book/:bookId', deleteBook)

export default router