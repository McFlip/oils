/* eslint-disable mocha/no-exports */
/* eslint-disable no-console */
/* eslint-env mocha, node */
import chai from 'chai'
import fs from 'fs'

export default function del () {
  let image4ID = null

  it('should delete post image', function (done) {
    const { apiURL, prod1ID, post1ID, image2ID } = this.test.ctx
    const post = {
      id: prod1ID,
      title: '1st product post',
      content: 'modified post image',
      deleteImg: true
    }
    chai.request(apiURL)
      .post(`/posts/${post1ID}`)
      .type('form')
      .field(post)
      .end((err, res) => {
        if (err) console.log(err)
        res.body.message.should.eql('Post updated successfully')
        chai.request(apiURL)
          .get(`/images/${image2ID}`)
          .end((err, res) => {
            if (err) console.log(err)
            res.should.have.status(404)
            done()
          })
      })
  })
  it('should fail to delete post with bad prod ID', async function () {
    const { apiURL, post1ID, token } = this.test.ctx
    const res = await chai.request(apiURL)
      .delete(`/products/aaaaaaaaaaaa/posts/${post1ID}`)
      .set({ Authorization: `Bearer ${token}` })
    res.should.have.status(404)
    res.text.should.eql('Product not found')
  })
  it('should fail to delete post with bad post ID', async function () {
    const { apiURL, prod1ID, token } = this.test.ctx
    const res = await chai.request(apiURL)
      .delete(`/products/${prod1ID}/posts/aaaaaaaaaaaa`)
      .set({ Authorization: `Bearer ${token}` })
    res.should.have.status(404)
    res.text.should.eql('Post not found')
  })
  it('should delete 2nd post', function (done) {
    const { apiURL, prod1ID, post2ID, token } = this.test.ctx
    chai.request(apiURL)
      .delete(`/products/${prod1ID}/posts/${post2ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(200)
        res.body.message.should.eql('Post deleted successfully')
        chai.request(apiURL)
          .get(`/products/${prod1ID}`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            if (err) console.log(err)
            // console.log(res.body)
            res.body.posts.should.have.length(1)
            res.body.posts[0].title.should.eql('1st product post')
            done()
          })
      })
  })
  it('should confirm 2nd post image was deleted', function (done) {
    const { apiURL, image3ID } = this.test.ctx
    chai.request(apiURL)
      .get(`/images/${image3ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(404)
        done()
      })
  })
  it('should delete the second product', function (done) {
    const { apiURL, token, prod2ID, use1ID } = this.test.ctx
    const post = {
      'title': '1st product post',
      'content': 'new post',
      'id': prod2ID,
      'deleteImg': false
    }
    // Set up a post and use to test cascade delete
    chai.request(apiURL)
      .post(`/uses/${use1ID}/product/${prod2ID}`)
      .set({ Authorization: `Bearer ${token}` })
      .then(() => {
        chai.request(apiURL)
          .post('/posts')
          .type('form')
          .set({ Authorization: `Bearer ${token}` })
          .attach('image', fs.readFileSync('test/data/favicon.ico'), 'deleteMe.ico')
          .field(post)
          .then(() => {
            // get the image ID of the new post
            chai.request(apiURL)
              .get(`/products/${prod2ID}`)
              .set({ Authorization: `Bearer ${token}` })
              .then((res) => {
                image4ID = res.body.posts[0].image
              })
              .then(() => {
                // finally delete the product
                chai.request(apiURL)
                  .delete(`/products/${prod2ID}`)
                  .set({ Authorization: `Bearer ${token}` })
                  .then((res) => {
                  // console.log(res.text)
                    res.text.should.eq(prod2ID)
                    done()
                  })
              })
          })
      })
      .catch((err) => {
        console.log(err)
        done()
      })
  })
  it('should confirm 1st recipe no longer contains 2nd prod as ingredient', function (done) {
    const { apiURL, recipe1ID } = this.test.ctx
    chai.request(apiURL)
      .get(`/recipes/${recipe1ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        // console.log(res.body.ingredients)
        res.body.ingredients.length.should.eq(1)
        res.body.ingredients[0].product.descr.should.eq('first test product')
        done()
      })
  })
  it('should confirm that the post image was deleted', function (done) {
    const { apiURL } = this.test.ctx
    chai.request(apiURL)
      .get(`/images/${image4ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(404)
        done()
      })
  })
  it('should delete the 2nd recipe', function (done) {
    const { apiURL, recipe2ID } = this.test.ctx
    chai.request(apiURL)
      .delete(`/recipes/${recipe2ID}`)
      .then((res) => {
        res.should.have.status(204)
        // verify delete - get should fail error 404
        chai.request(apiURL)
          .get(`/recipes/${recipe2ID}`)
          .then((res) => {
            res.should.have.status(404)
            done()
          })
      })
      .catch((err) => {
        console.log(err)
      })
  })
  it('should fail to delete recipe with bad ID', async function () {
    const { apiURL } = this.test.ctx
    const res = await chai.request(apiURL)
      .delete('/recipes/badid')
    res.should.have.status(500)
    res.text.should.have.string('CastError: Cast to ObjectId failed for value &quot;badid&quot')
  })
  it('should delete the 1st prod use', function (done) {
    const { apiURL, token, use1ID, prod1ID } = this.test.ctx
    chai.request(apiURL)
      .delete(`/uses/${use1ID}`)
      .then((res) => {
        // console.log(res.text)
        res.text.should.eq(use1ID)
        chai.request(apiURL)
          .get(`/products/${prod1ID}`)
          .set({ Authorization: `Bearer ${token}` })
          .then((res) => {
            // console.log(res.body.uses)
            res.body.uses.length.should.eq(0)
            done()
          })
          .catch((err) => {
            console.log(err)
            done()
          })
      })
      .catch((err) => {
        console.log(err)
      })
  })
  it('should delete the 1st recipe use', async function () {
    const { apiURL, token, use2ID, prod1ID, recipe1ID } = this.test.ctx
    let res = null
    res = await chai.request(apiURL)
      .delete(`/uses/${use2ID}`)
    res.text.should.eq(use2ID)
    res = await chai.request(apiURL)
      .get(`/products/${prod1ID}`)
      .set({ Authorization: `Bearer ${token}` })
    // console.log(res.body.useTitles)
    res.body.useTitles.length.should.eq(0)
    res.body.recipes[0].title.should.eq('1st test recipe')
    res = await chai.request(apiURL)
      .get(`/recipes/${recipe1ID}`)
      .set({ Authorization: `Bearer ${token}` })
    res.body.uses.length.should.eq(0)
  })
  it('should fail to delete non-existant prod', async function () {
    const { apiURL, token } = this.test.ctx
    const res = await chai.request(apiURL)
      .delete('/products/aaaaaaaaaaaa')
      .set({ Authorization: `Bearer ${token}` })
    res.should.have.status(200)
    res.body.should.eql({})
  })
  it('should fail to delete with bad id', async function () {
    const { apiURL } = this.test.ctx
    const res = await chai.request(apiURL)
      .delete('/uses/badid')
    res.should.have.status(500)
    res.text.should.have.string('Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
  })
}
