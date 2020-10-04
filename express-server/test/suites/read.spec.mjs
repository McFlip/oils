/* eslint-disable mocha/no-exports */
/* eslint-disable no-console */
/* eslint-env mocha, node */
import chai from 'chai'
import checkProd from '../utility/checkProd.js'
import checkProdDeep from '../utility/checkProdDeep.js'
import prod1 from '../data/prod1.js'
// import prod2 from '../data/prod2.js'
import prods from '../data/prods.js'

export default function () {
  let prod1ID = null
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
}
