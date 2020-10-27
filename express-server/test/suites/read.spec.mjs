/* eslint-disable mocha/no-exports */
/* eslint-disable no-console */
/* eslint-env mocha, node */
import chai from 'chai'
import binParser from 'superagent-binary-parser'
import crypto from 'crypto'
import checkProd from '../utility/checkProd.js'
import checkProdDeep from '../utility/checkProdDeep.js'
import prod1 from '../data/prod1.js'
// import prod2 from '../data/prod2.js'
import prods from '../data/prods.js'

export default function read () {
  let prod1ID = null
  let image1ID = null
  it('should get all products', function (done) {
    const { apiURL, token } = this.test.ctx
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
    const { apiURL, token } = this.test.ctx
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
  it('should find the 1st prod by sku', function (done) {
    const { apiURL, token } = this.test.ctx
    chai.request(apiURL)
      .get(`/products/search/sku?q=${prod1.sku}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.an('array')
        // console.log(res.body)
        checkProd(res.body[0], prods[0])
        prod1ID = res.body[0]._id
        done()
      })
  })
  it('should get 1st prod by ID', function (done) {
    const { apiURL, token } = this.test.ctx
    chai.request(apiURL)
      .get(`/products/${prod1ID}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.an('object')
        // console.log(res.body)
        checkProdDeep(res.body, prods[0])
        this.test.parent.parent.ctx.post1ID = res.body.posts[0]._id
        this.test.parent.parent.ctx.post2ID = res.body.posts[1]._id
        done()
      })
  })
  it('should find the 1st prod by descr', function (done) {
    const { apiURL, token } = this.test.ctx
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
  it('should get 1st recipe by ID', function (done) {
    const { apiURL, token, recipe1ID, use2ID } = this.test.ctx
    const recipe = {
      title: '1st test recipe',
      directions: 'brand new recipe',
      ingredients: [],
      uses: [{
        _id: use2ID,
        title: '1st test recipe use'
      }]
    }
    chai.request(apiURL)
      .get(`/recipes/${recipe1ID}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.an('object')
        // console.log(res.body)
        res.body.should.deep.include(recipe)
        done()
      })
  })
  it('should find the 1st recipe', function (done) {
    const { apiURL, token } = this.test.ctx
    chai.request(apiURL)
      .get('/recipes/search?q=1st')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.an('array')
        res.body.should.have.length(1)
        res.body[0].title.should.eql('1st test recipe')
        done()
      })
  })
  it('should get the 1st post', function (done) {
    const { apiURL, token, post1ID } = this.test.ctx
    const post = {
      title: '1st product post',
      content: 'new post'
    }
    chai.request(apiURL)
      .get(`/products/${prod1ID}/posts/${post1ID}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.an('object')
        res.body.should.deep.include(post)
        res.body.image.should.be.a('string')
        res.body.image.should.have.length(32)
        image1ID = res.body.image
        done()
      })
  })
  it('should get the 1st post image', function (done) {
    const { apiURL } = this.test.ctx
    const hash = crypto.createHash('sha1')
    chai.request(apiURL)
      .get(`/images/${image1ID}`)
      .parse(binParser)
      .buffer()
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        hash.update(res.body)
        // console.log(hash.digest('hex'))
        hash.digest('hex').should.eql('2edf6f7bba09e59b9ca1f3df41bcd121c2da00d4')
        done()
      })
  })
  it('should get 1st products uses', function (done) {
    const { apiURL } = this.test.ctx
    chai.request(apiURL)
      .get(`/uses/${prod1ID}/product`)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.an('array')
        // console.log(res.body)
        res.body[0].title.should.eql('1st test product use')
        done()
      })
  })
  it('should get 1st recipes uses', function (done) {
    const { apiURL, recipe1ID } = this.test.ctx
    chai.request(apiURL)
      .get(`/uses/${recipe1ID}/recipe`)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.an('array')
        // console.log(res.body)
        res.body[0].title.should.eql('1st test recipe use')
        done()
      })
  })
  it('should get the product use by ID', function (done) {
    const { apiURL, use1ID } = this.test.ctx
    chai.request(apiURL)
      .get(`/uses/${use1ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.an('object')
        // console.log(res.body)
        res.body.title.should.eql('1st test product use')
        res.body.products[0].descr.should.eql('first test product')
        done()
      })
  })
  it('should get the recipe use by ID', function (done) {
    const { apiURL, use2ID } = this.test.ctx
    chai.request(apiURL)
      .get(`/uses/${use2ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.an('object')
        // console.log(res.body)
        res.body.title.should.eql('1st test recipe use')
        res.body.recipes[0].title.should.eql('1st test recipe')
        done()
      })
  })
  it('should find the product use', function (done) {
    const { apiURL } = this.test.ctx
    chai.request(apiURL)
      .get('/uses/search?q=product')
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.an('array')
        res.body.should.have.length(1)
        res.body[0].title.should.eql('1st test product use')
        done()
      })
  })
}
