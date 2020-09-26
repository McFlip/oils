/* eslint-disable no-console */
/* eslint-env mocha, node */
// remember to spin down the dev stack
// and spin up the test stack
// bounce the test stack to reset the DB
// periodically run docker volume prune
const chai = require('chai')
const chaiHttp = require('chai-http')
// eslint-disable-next-line no-unused-vars
const should = require('chai').should()
/*
TODO: need to transpile if I want to access DB directly w/ mongoose
const Product = require('../server/models/product')
const mongoose = require('mongoose')
*/

const apiURL = 'http://localhost:3000'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYWRraXR0ZWgifQ.rvB92j8dCshswHz5XyTeIsiVbgVx9fMkPDyBYndAPVE'
/*
need to transpile
const dbHost = 'mongodb://database-test:27017/mean-docker'
const dbOpts = { useNewUrlParser: true }
*/

chai.use(chaiHttp)

describe('CRUD tests', function () {
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
  /*
  can't do this without transpiling
  beforeEach(function (done) {
    mongoose.connect(dbHost, dbOpts)
      .then(() => {
        Product.remove({}, (err) => {
          if (err) {
            console.log('Failed to remove all products from the DB')
            console.log(err)
          }
          done()
        })
      })
      .catch((err) => {
        console.log('Failed to connect to DB')
        console.log(err)
      })
  })
  */
  describe('CREATE tests', function () {
    it('creates a product', function (done) {
      const prod = {
        sku: 1984,
        description: 'first test product',
        size: '5 ml',
        category: 'single',
        qty: 1,
        wholesale: 999,
        retail: 1999,
        pv: 500,
        wishlist: true,
        oil: true,
        aromatic: true,
        topical: true
      }
      chai.request(apiURL)
        .post('/products')
        .set({ Authorization: `Bearer ${token}` })
        .send(prod)
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(200)
          // TODO: test the returned object
          // save the returned id for later tests
          done()
        })
    })
  })
  describe('READ tests', function () {
    // it('should get search result', function (done) {
    //   chai.request(apiURL)
    //     .get('/uses/search?q=')
    //     .end((err, res) => {
    //       if (err) console.log(err)
    //       res.should.have.status(200)
    //       res.body.should.eql([])
    //       done()
    //     })
    // })
    it('should get all products', function (done) {
      const prods = [
        {
          _id: '5f6eb16a11cd0c001e3e9c28',
          category: 'single',
          inventory: [
            {
              __v: 0,
              _id: '5f6eb16a11cd0c001e3e9c2b',
              apiKey: 'badkitteh',
              prod: '5f6eb16a11cd0c001e3e9c28',
              qty: 1,
              wishlist: true
            }],
          size: '5 ml',
          sku: 1984
        }]

      chai.request(apiURL)
        .get('/products')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(200)
          res.body.should.be.an('array')
          res.body[0]._id.should.eql(res.body[0].inventory[0].prod)
          res.body[0].category.should.eql(prods[0].category)
          res.body[0].inventory[0].qty.should.eql(1)
          res.body[0].inventory[0].wishlist.should.eql(true)
          res.body[0].size.should.eql('5 ml')
          res.body[0].sku.should.eql(1984)
          done()
        })
    })
  })
})
