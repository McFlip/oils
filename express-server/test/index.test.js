/* eslint-disable no-console */
/* eslint-env mocha, node */
// hello world test
const chai = require('chai')
const chaiHttp = require('chai-http')
// eslint-disable-next-line no-unused-vars
const should = require('chai').should()
const apiURL = 'http://localhost:3000'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYWRraXR0ZWgifQ.rvB92j8dCshswHz5XyTeIsiVbgVx9fMkPDyBYndAPVE'

// var mongoose = require('mongoose');

chai.use(chaiHttp)

describe('testing the test', function () {
  it('should return hello', function (done) {
    chai.request(apiURL)
      .get('/')
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.text.should.equal('Hello World!\r\n\r\n')
        done()
      })
  })
  it('should not get anything', function (done) {
    chai.request(apiURL)
      .get('/uses/search?q=')
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.eql([])
        done()
      })
  })
  it('should get all products(nothing)', function (done) {
    chai.request(apiURL)
      .get('/products')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.an('array')
        res.body.should.eql([])
        done()
      })
  })
})
