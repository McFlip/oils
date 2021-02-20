/* eslint-disable mocha/no-exports */
/* eslint-disable no-console */
/* eslint-env mocha, node */
import chai from 'chai'
import fs from 'fs'
import binParser from 'superagent-binary-parser'
import crypto from 'crypto'
// import checkProd from '../utility/checkProd.js'
import checkProdDeep from '../utility/checkProdDeep.js'
// import prod1 from '../data/prod1.js'
// import prod2 from '../data/prod2.js'
import prods from '../data/prods.js'

export default function update () {
  let image1ID = null
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
        // console.log(res.body)
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
  it('should update 1st prod qty, wishlist, & category', function (done) {
    const { apiURL, token, prod1ID } = this.test.ctx
    const model = {
      ...prods[0],
      category: 'blend',
      size: '99 bottles',
      inventory: [
        {
          __v: 0,
          _id: '5f6eb16a11cd0c001e3e9c2b',
          apiKey: 'badkitteh',
          prod: '5f6eb16a11cd0c001e3e9c28',
          qty: 5,
          wishlist: true
        }]
    }
    chai.request(apiURL)
      .post(`/products/${prod1ID}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({
        category: 'blend',
        wishlist: true,
        qty: 5
      })
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.an('object')
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
  it('should remove the 1st use from the 2nd product', function (done) {
    const { apiURL, prod2ID, use1ID } = this.test.ctx
    chai.request(apiURL)
      .delete(`/uses/${use1ID}/product/${prod2ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.an('object')
        // console.log(res.body)
        const { id, refId, category } = res.body
        id.should.eql(use1ID)
        refId.should.eql(prod2ID)
        category.should.eql('product')
        chai.request(apiURL)
          .get(`/uses/${use1ID}`)
          .end((err, res) => {
            if (err) console.log(err)
            res.should.have.status(200)
            // console.log(res.body)
            res.body.products.should.have.length(1)
            done()
          })
      })
  })
  it('should add 2nd use to the 2nd recipe', function (done) {
    const { apiURL, recipe2ID, use2ID } = this.test.ctx
    chai.request(apiURL)
      .post(`/uses/${use2ID}/recipe/${recipe2ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.text.should.eql(use2ID)
        done()
      })
  })
  it('should confirm use was added to recipe', function (done) {
    const { apiURL, recipe2ID, use2ID } = this.test.ctx
    chai.request(apiURL)
      .get(`/recipes/${recipe2ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        const { title, _id } = res.body.uses[0]
        title.should.eql('1st test recipe use')
        _id.should.eql(use2ID)
        done()
      })
  })
  it('should remove the 2nd use from the 2nd recipe', function (done) {
    const { apiURL, recipe2ID, use2ID } = this.test.ctx
    chai.request(apiURL)
      .delete(`/uses/${use2ID}/recipe/${recipe2ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.should.be.an('object')
        // console.log(res.body)
        const { id, refId, category } = res.body
        id.should.eql(use2ID)
        refId.should.eql(recipe2ID)
        category.should.eql('recipe')
        chai.request(apiURL)
          .get(`/uses/${use2ID}`)
          .end((err, res) => {
            if (err) console.log(err)
            res.should.have.status(200)
            // console.log(res.body)
            res.body.recipes.should.have.length(1)
            res.body.recipes[0].title.should.eql('1st test recipe')
            done()
          })
      })
  })
  it('should add ingredients to both recipes', function (done) {
    const { apiURL, recipe1ID, recipe2ID, prod1ID, prod2ID } = this.test.ctx
    const payload = {
      ingredients: [
        {
          product: prod1ID,
          qty: '1 drop'
        },
        {
          product: prod2ID,
          qty: '2 drops'
        }
      ]
    }
    const recipe = {
      title: '1st test recipe',
      directions: 'brand new recipe',
      ingredients: [
        {
          product: {
            _id: prod1ID,
            descr: 'first test product'
          },
          qty: '1 drop'
        },
        {
          product: {
            _id: prod2ID,
            descr: 'second test product'
          },
          qty: '2 drops'
        }
      ]
    }
    chai.request(apiURL)
      .post(`/recipes/${recipe1ID}`)
      .send(payload)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.should.be.an('object')
        res.body.title.should.eql(recipe.title)
        res.body.directions.should.eql(recipe.directions)
        res.body.ingredients[0].should.deep.include(recipe.ingredients[0])
        res.body.ingredients[1].should.deep.include(recipe.ingredients[1])
        chai.request(apiURL)
          .post(`/recipes/${recipe2ID}`)
          .send(payload)
          .end((err, res) => {
            if (err) console.log(err)
            res.should.have.status(200)
            done()
          })
      })
  })
  it('should update post content', function (done) {
    const { apiURL, prod1ID, post1ID } = this.test.ctx
    const post = {
      id: prod1ID,
      title: '1st product post',
      content: 'modified post content',
      deleteImg: false
    }
    chai.request(apiURL)
      .post(`/posts/${post1ID}`)
      .type('form')
      .field(post)
      .end((err, res) => {
        if (err) console.log(err)
        res.body.message.should.eql('Post updated successfully')
        done()
      })
  })
  it('should validate post content', function (done) {
    const { apiURL, prod1ID, post1ID } = this.test.ctx
    chai.request(apiURL)
      .get(`/products/${prod1ID}/posts/${post1ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        res.body.content.should.eql('modified post content')
        image1ID = res.body.image
        done()
      })
  })
  it('should confirm the 1st post image did not change', function (done) {
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
  it('should update post image', function (done) {
    const { apiURL, prod1ID, post1ID } = this.test.ctx
    const post = {
      id: prod1ID,
      title: '1st product post',
      content: 'modified post image',
      deleteImg: false
    }
    chai.request(apiURL)
      .post(`/posts/${post1ID}`)
      .type('form')
      .attach('image', fs.readFileSync('test/data/memevet.jpg'), 'postImg2.jpg')
      .field(post)
      .end((err, res) => {
        if (err) console.log(err)
        res.body.message.should.eql('Post updated successfully')
        done()
      })
  })
  it('should confirm post title has not changed', function (done) {
    const { apiURL, prod1ID, post1ID } = this.test.ctx
    chai.request(apiURL)
      .get(`/products/${prod1ID}/posts/${post1ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        res.body.title.should.eql('1st product post')
        this.test.parent.parent.ctx.image2ID = res.body.image
        done()
      })
  })
  it('should validate post image changed', function (done) {
    const { apiURL, image2ID } = this.test.ctx
    const hash = crypto.createHash('sha1')
    chai.request(apiURL)
      .get(`/images/${image2ID}`)
      .parse(binParser)
      .buffer()
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        hash.update(res.body)
        // console.log(hash.digest('hex'))
        hash.digest('hex').should.eql('b84c6c5ba20ee19176282b3e6be4a9cbf9df2e9c')
        done()
      })
  })
  it('should confirm 1st post image was deleted', function (done) {
    const { apiURL } = this.test.ctx
    chai.request(apiURL)
      .get(`/images/${image1ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(404)
        done()
      })
  })
  it('should attach an image to the second post', function (done) {
    const { apiURL, prod1ID, post2ID } = this.test.ctx
    const post = {
      'title': '2nd product post',
      'content': 'I will attach an image in the UPDATE section',
      'id': prod1ID,
      'deleteImg': false
    }
    chai.request(apiURL)
      .post(`/posts/${post2ID}`)
      .type('form')
      .attach('image', fs.readFileSync('test/data/care.jpg'), 'post2Img.jpg')
      .field(post)
      .end((err, res) => {
        if (err) console.log(err)
        res.body.message.should.eql('Post updated successfully')
        done()
      })
  })
  it('should validate 2nd post', function (done) {
    const { apiURL, prod1ID, post2ID } = this.test.ctx
    const hash = crypto.createHash('sha1')
    let imageID = null
    chai.request(apiURL)
      .get(`/products/${prod1ID}/posts/${post2ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        res.body.title.should.eql('2nd product post')
        imageID = res.body.image
        this.test.parent.parent.ctx.image3ID = imageID
        chai.request(apiURL)
          .get(`/images/${imageID}`)
          .parse(binParser)
          .buffer()
          .end((err, res) => {
            if (err) console.log(err)
            res.should.have.status(200)
            hash.update(res.body)
            // console.log(hash.digest('hex'))
            hash.digest('hex').should.eql('b923a6b10e15716743d3dabb2ac5753f44b6edf6')
            done()
          })
      })
  })
  it('should get empty query from updating non-existant prod', async function () {
    const { apiURL, token } = this.test.ctx
    const res = await chai.request(apiURL)
      .post('/products/aaaaaaaaaaaa')
      .set({ Authorization: `Bearer ${token}` })
      .send({ size: '99 bottles' })
    res.should.have.status(200)
    res.body.should.eql({})
  })
  it('should fail to update non-existant inv', async function () {
    const { apiURL, token } = this.test.ctx
    const res = await chai.request(apiURL)
      .post('/inventory/aaaaaaaaaaaa')
      .set({ Authorization: `Bearer ${token}` })
      .send({ size: '99 bottles' })
    res.should.have.status(200)
    res.body.should.eql({})
  })
  it('should fail to update post using bad prod ID', function (done) {
    const { apiURL, post1ID } = this.test.ctx
    const post = {
      id: 'fubar',
      title: '1st product post',
      content: 'modified post content',
      deleteImg: false
    }
    chai.request(apiURL)
      .post(`/posts/${post1ID}`)
      .type('form')
      .field(post)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(404)
        done()
      })
  })
  it('should fail to update post using bad post ID', function (done) {
    const { apiURL, prod1ID } = this.test.ctx
    const post = {
      id: prod1ID,
      title: '1st product post',
      content: 'modified post content',
      deleteImg: false
    }
    chai.request(apiURL)
      .post('/posts/aaaaaaaaaaaa')
      .type('form')
      .field(post)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(404)
        done()
      })
  })
}
