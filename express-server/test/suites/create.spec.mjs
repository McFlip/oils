/* eslint-disable mocha/no-exports */
/* eslint-disable no-console */
/* eslint-env mocha, node */
import chai from 'chai'
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
        this.test.ctx.prod2ID = res.body._id
        done()
      })
  })
  it.skip('creates a use for the first product', function (done) {
    const { apiURL, token } = this.test.ctx
    chai.request(apiURL)
      .post('/uses')
      .set({ Authorization: `Bearer ${token}` })
      
  })
}