// During the automatic test env variable , we will set it to test

process.env.NODE_ENV = 'test';

const app = require('../app')
import request from 'supertest'


// Export this to use in multiple files

module.exports = {

    server: app,
    request

}
