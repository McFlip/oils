/* eslint-disable mocha/no-exports */
/* eslint-disable no-console */
/* eslint-env mocha, node */
import chai from 'chai'
// import checkProd from '../utility/checkProd.js'
import checkProdDeep from '../utility/checkProdDeep.js'
// import prod1 from '../data/prod1.js'
// import prod2 from '../data/prod2.js'
import prods from '../data/prods.js'

export default function update () {
  it('should remove 1st prod from wishlist', function (done) {
    const { apiURL, token, prod1ID } = this.test.ctx
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
    const { apiURL, token, prod1ID } = this.test.ctx
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
    const { apiURL, token, prod1ID } = this.test.ctx
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
  it('should add the 1st use to the 2nd product', function (done) {
    const { apiURL, token, prod2ID, use1ID } = this.test.ctx
    chai.request(apiURL)
      .post(`/uses/${use1ID}/product/${prod2ID}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.text.should.eql(use1ID)
        done()
      })
  })
  it('should confirm use was added to prod', function (done) {
    const { apiURL, token, prod2ID, use1ID } = this.test.ctx
    chai.request(apiURL)
      .get(`/products/${prod2ID}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) console.log(err)
        const { title, _id } = res.body.uses[0]
        title.should.eql('1st test product use')
        _id.should.eql(use1ID)
        done()
      })
  })
}
