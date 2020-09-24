// eslint-env mocha, node
// hello world test
const chai = require('chai')
const chaiHttp = require('chai-http')
// eslint-disable-next-line no-unused-vars
const should = require('chai').should()
const apiURL = 'http://localhost:3000'

// var mongoose = require('mongoose');

chai.use(chaiHttp)
 
describe('testing the test', function() {
  it('should return hello', function() {
    chai.request(apiURL)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.eq('Hello World!\r\n\r\n')
      })
  })
})