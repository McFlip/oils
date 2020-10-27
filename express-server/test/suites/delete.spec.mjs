/* eslint-disable mocha/no-exports */
/* eslint-disable no-console */
/* eslint-env mocha, node */
import chai from 'chai'

export default function del () {
  it('should delete post image', function (done) {
    const { apiURL, prod1ID, post1ID } = this.test.ctx
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
        done()
      })
  })
  it('should confirm 2nd post image was deleted', function (done) {
    const { apiURL, image2ID } = this.test.ctx
    chai.request(apiURL)
      .get(`/images/${image2ID}`)
      .end((err, res) => {
        if (err) console.log(err)
        res.should.have.status(404)
        done()
      })
  })
}
