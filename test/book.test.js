const { server, request } = require('./testConfig')

import app from '../app'
import Book from '../src/models/book'

/**
  *Test cases to test all the book API
  * api route
  * get books
  * get single book
  * update book
  * delete book
  * create book
*/


describe('Book Test', () => {
  // Before each test we empty the database

  beforeAll(async () => {
    await Book.deleteMany({}, (err) => {
      // 
    })
  });

  // Prepare data for testings
  const testData = {
    "name": "Test Book Name",
    "authors": "5fc8dcd114d0523b984c08d5",
    "publisher": "Test Publisher"
  }


  /*
    * Test the /POST Router
    */

  describe('/POST Book Store with Empty body', () => {
    test('it should send validation error for save book', async () => {
      await request(app).post('/api/book')
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
    })
  })

  /*
  * Test the /POST Router
  */

  describe('/POST Book Store', () => {
    test('it should success save book', async () => {
      await request(app)
        .post('/api/book')
        .send(testData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
    })
  })

  /*
 * Test the /GET route
 */
  describe('/GET ALL BOOKS', () => {

    test('it should GET all the books', async () => {
      await request(app).get('/api/books')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    })
  })

  /*
    * Test the / GET /: id route
  */







})
