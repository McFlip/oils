/* eslint-disable no-console */
/* eslint-env mocha, node */
const chai = require('chai')
const chaiHttp = require('chai-http')
// eslint-disable-next-line no-unused-vars
const should = require('chai').should()
const mongoose = require('mongoose')
const MockMongoose = require('mock-mongoose').MockMongoose
const mockMongoose = new MockMongoose(mongoose)
/*
TODO: need to transpile if I want to access DB directly w/ mongoose
const Product = require('../server/models/product')
*/

// const apiURL = 'http://localhost:3000'
const apiURL = require('../.build/app')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYWRraXR0ZWgifQ.rvB92j8dCshswHz5XyTeIsiVbgVx9fMkPDyBYndAPVE'
const dbHost = 'mongodb://localhost/mean-docker'
const dbOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
const prod1 = {
  sku: 1984,
  descr: 'first test product',
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
    sku: 1984,
    oil: {
      aromatic: true,
      topical: true
    }
  }
]
const checkProd = (res, i) => {
  if (res.inventory[0].prod) res._id.should.eql(res.inventory[0].prod)
  res.category.should.eql(prods[i].category)
  res.inventory[0].qty.should.eql(prods[i].inventory[0].qty)
  res.inventory[0].wishlist.should.eql(prods[i].inventory[0].wishlist)
  res.size.should.eql(prods[i].size)
  res.sku.should.eql(prods[i].sku)
}
const checkProdDeep = (res, i) => {
  checkProd(res, i)
  const { photosensitive, topical, dilute, aromatic, dietary } = prods[i].oil
  if (photosensitive) res.oil.photosensitive.should.eql(photosensitive)
  if (topical) res.oil.topical.should.eql(topical)
  if (dilute) res.oil.dilute.should.eql(dilute)
  if (aromatic) res.oil.aromatic.should.eql(aromatic)
  if (dietary) res.oil.dietary.should.eql(dietary)
}
let prod1ID = null

chai.use(chaiHttp)

describe('CRUD tests', function () {
  before(function (done) {
    mockMongoose.prepareStorage()
      .then(function () {
        mongoose.connect(dbHost, dbOpts, function (err) { done(err) })
      })
  })
  after(function (done) {
    mockMongoose.killMongo()
      .then(done())
  })
  /*
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
  */
  describe('CREATE tests', function () {
    it('creates a product', function (done) {
      chai.request(apiURL)
        .post('/products')
        .set({ Authorization: `Bearer ${token}` })
        .send(prod1)
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(200)
          // test the returned object
          checkProd(res.body, 0)
          // save the returned id for later tests
          prod1ID = res.body._id
          done()
        })
    })
  })
  describe('READ tests', function () {
    it('should get all products', function (done) {
      chai.request(apiURL)
        .get('/products')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(200)
          res.body.should.be.an('array')
          // console.log(res.body)
          checkProd(res.body[0], 0)
          done()
        })
    })
    it('should get all wishlist items', function (done) {
      chai.request(apiURL)
        .get('/wishlist')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(200)
          res.body.should.be.an('array')
          // console.log(res.body)
          // console.log(res.body[0].inventory)
          checkProd(res.body[0], 0)
          done()
        })
    })
    it('should get 1st prod by ID', function (done) {
      chai.request(apiURL)
        .get(`/products/${prod1ID}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(200)
          res.body.should.be.an('object')
          // console.log(res.body)
          checkProdDeep(res.body, 0)
          done()
        })
    })
    it('should find the 1st prod by sku', function (done) {
      chai.request(apiURL)
        .get(`/products/search/sku?q=${prod1.sku}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(200)
          res.body.should.be.an('array')
          // console.log(res.body)
          checkProd(res.body[0], 0)
          done()
        })
    })
    it('should find the 1st prod by descr', function (done) {
      chai.request(apiURL)
        .get(`/products/search/descr?q=first`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(200)
          res.body.should.be.an('array')
          // console.log(res.body)
          checkProd(res.body[0], 0)
          done()
        })
    })

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
  })
})
