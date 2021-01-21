

import express from 'express'
const router = express.Router
import { body } from 'express-validator'
import { createBook, BookList, singleBook } from '../controllers/book'

router.post('/book', [
    body('name', 'Please add a Book Name').isLength({ min: 2, max: 100 }).withMessage('Book Name can not be Less than 2 characters and more than 100 characters'),
    body('author', 'Please add author ID'),
    body('publisher', 'Please add publisher Name'),

], createBook)

router.get('/books', BookList)
router.get('/book/:bookId', singleBook)
export default router