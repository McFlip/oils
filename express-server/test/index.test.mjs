/* eslint-disable no-console */
/* eslint-env mocha, node */
import chaiHttp from 'chai-http'
import chai from 'chai'
import prod1 from './data/prod1.js'
import prod2 from './data/prod2.js'
import prods from './data/prods.js'
import apiURL from '../.build/app.js'
import checkProd from './utility/checkProd.js'
import checkProdDeep from './utility/checkProdDeep.js'
// const mongoose = require('mongoose')
/*
TODO: need to transpile if I want to access DB directly w/ mongoose
const Product = require('../server/models/product')
*/

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYWRraXR0ZWgifQ.rvB92j8dCshswHz5XyTeIsiVbgVx9fMkPDyBYndAPVE'
let prod1ID = null
let prod2ID = null

chai.use(chaiHttp)
chai.should()

describe('CRUD tests', function () {
  before(function (done) {
    // apiURL = require('../.build/app')
    done()
  })
  after(function (done) {
    chai.request(apiURL)
      .delete('/mockmongoose')
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        done()
      })
  })
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
          checkProd(res.body, prods[0])
          // save the returned id for later tests
          prod1ID = res.body._id
          done()
        })
    })
    it('creates the 2nd product', function (done) {
      chai.request(apiURL)
        .post('/products')
        .set({ Authorization: `Bearer ${token}` })
        .send(prod2)
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(200)
          // save the returned id for later tests
          prod2ID = res.body._id
          done()
        })
    })
    it.skip('creates a use for the first product', function (done) {
      chai.request(apiURL)
        .post('/uses')
        .set({ Authorization: `Bearer ${token}` })
        
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
          res.body.should.have.length(2)
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
          checkProd(res.body[0], prods[0])
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
          checkProdDeep(res.body, prods[0])
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
          checkProd(res.body[0], prods[0])
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
          checkProd(res.body[0], prods[0])
          done()
        })
    })
  })
  describe('UPDATE tests', function () {
    it('should remove 1st prod from wishlist', function (done) {
      const model = {
        ...prods[0],
        inventory: [
          {
            __v: 0,
            _id: '5f6eb16a11cd0c001e3e9c2b',
            apiKey: 'badkitteh',
            prod: '5f6eb16a11cd0c001e3e9c28',
            qty: 1,
            wishlist: false
          }]
      }
      chai.request(apiURL)
        .post(`/inventory/${prod1ID}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({ wishlist: false })
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(200)
          res.body.should.be.an('object')
          checkProdDeep(res.body, model)
          done()
        })
    })
    it('should update 1st prod qty', function (done) {
      const model = {
        ...prods[0],
        inventory: [
          {
            __v: 0,
            _id: '5f6eb16a11cd0c001e3e9c2b',
            apiKey: 'badkitteh',
            prod: '5f6eb16a11cd0c001e3e9c28',
            qty: 9,
            wishlist: false
          }]
      }
      chai.request(apiURL)
        .post(`/inventory/${prod1ID}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({ qty: 9 })
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(200)
          res.body.should.be.an('object')
          checkProdDeep(res.body, model)
          done()
        })
    })
    it('should update 1st prod size', function (done) {
      const model = {
        ...prods[0],
        size: '99 bottles',
        inventory: [
          {
            __v: 0,
            _id: '5f6eb16a11cd0c001e3e9c2b',
            apiKey: 'badkitteh',
            prod: '5f6eb16a11cd0c001e3e9c28',
            qty: 9,
            wishlist: false
          }]
      }
      chai.request(apiURL)
        .post(`/products/${prod1ID}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({ size: '99 bottles' })
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(200)
          res.body.should.be.an('object')
          // console.log(res.body)
          checkProdDeep(res.body, model)
          done()
        })
    })
  })
})
