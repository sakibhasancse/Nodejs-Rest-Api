const { app, request } = require('./testConfig')


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
    "_id": "6009c90d498eb2e23180c611",
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
        .expect(200);
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

  describe("/GET/:id book", () => {
    test("it should GET the book", () => {
      request(app)
        .get("/api/book/" + testData._id)
        .expect(200)
    });
  });





  /*
    * Test the /patch/:id route
    */

  describe('/PATCH Book Update', () => {
    test('it should success update  book', async () => {
      await request(app)
        .patch('/api/book/' + testData._id)
        .send(testData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200,)
    })
  })

  /*
 * Test the /delete/:id route
 */


  describe('/DELETE Book delete', () => {
    test('it should  delete this  book', async () => {
      await request(app)
        .delete('/api/book/' + testData._id)
        .send(testData)
        .expect(200)
    })
  })

})
