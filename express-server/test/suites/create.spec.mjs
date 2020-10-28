/* eslint-disable mocha/no-exports */
/* eslint-disable no-console */
/* eslint-env mocha, node */
import chai from 'chai'
import fs from 'fs'
import checkProd from '../utility/checkProd.js'
// import checkProdDeep from './utility/checkProdDeep.js'
import prod1 from '../data/prod1.js'
import prod2 from '../data/prod2.js'
import prods from '../data/prods.js'

export default function create () {
  it('creates a product', function (done) {
    const { apiURL, token } = this.test.ctx
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
        this.test.parent.parent.ctx.prod1ID = res.body._id
        // console.log(res.body._id)
        done()
      })
  })
  it('creates the 2nd product', function (done) {
    const { apiURL, token } = this.test.ctx
    chai.request(apiURL)
      .post('/products')
      .set({ Authorization: `Bearer ${token}` })
      .send(prod2)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        // save the returned id for later tests
        this.test.parent.parent.ctx.prod2ID = res.body._id
        done()
      })
  })
  it('creates a use for the first product', function (done) {
    const { apiURL, token, prod1ID } = this.test.ctx
    const use = {
      title: '1st test product use',
      category: 'product',
      refId: prod1ID
    }
    chai.request(apiURL)
      .post('/uses')
      .set({ Authorization: `Bearer ${token}` })
      .send(use)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        this.test.parent.parent.ctx.use1ID = res.body
        // console.log(res.body)
        done()
      })
  })
  it('creates a recipe', function (done) {
    const { apiURL, token } = this.test.ctx
    const recipe = { title: '1st test recipe' }
    chai.request(apiURL)
      .post('/recipes/create')
      .set({ Authorization: `Bearer ${token}` })
      .send(recipe)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(201)
        this.test.parent.parent.ctx.recipe1ID = res.body._id
        done()
      })
  })
  it('creates the 2nd recipe', function (done) {
    const { apiURL, token } = this.test.ctx
    const recipe = { title: '2nd test recipe' }
    chai.request(apiURL)
      .post('/recipes/create')
      .set({ Authorization: `Bearer ${token}` })
      .send(recipe)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(201)
        this.test.parent.parent.ctx.recipe2ID = res.body._id
        done()
      })
  })
  it('creates a use for the first recipe', function (done) {
    const { apiURL, token, recipe1ID } = this.test.ctx
    const use = {
      title: '1st test recipe use',
      category: 'recipe',
      refId: recipe1ID
    }
    chai.request(apiURL)
      .post('/uses')
      .set({ Authorization: `Bearer ${token}` })
      .send(use)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        this.test.parent.parent.ctx.use2ID = res.body
        // console.log(res.body)
        done()
      })
  })
  it('creates a product post', function (done) {
    const { apiURL, token, prod1ID } = this.test.ctx
    const post = {
      'title': '1st product post',
      'content': 'new post',
      'id': prod1ID,
      'deleteImg': false
    }
    chai.request(apiURL)
      .post('/posts')
      .type('form')
      .set({ Authorization: `Bearer ${token}` })
      .attach('image', fs.readFileSync('test/data/favicon.ico'), 'postImg.ico')
      .field(post)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(201)
        // console.log(res.body.message)
        done()
      })
  })
  it('creates the 2nd post', function (done) {
    const { apiURL, prod1ID } = this.test.ctx
    const post = {
      'title': '2nd product post',
      'content': 'I will attach an image in the UPDATE section',
      'id': prod1ID,
      'deleteImg': false
    }
    chai.request(apiURL)
      .post('/posts')
      .type('form')
      // .set({ Authorization: `Bearer ${token}` })
      .field(post)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(201)
        // console.log(res.body.message)
        done()
      })
  })
}
